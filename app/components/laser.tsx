"use client";

import { useEffect, useRef, useState } from "react";

export interface LaserOptions {
  /** Animation speed of the beam wave, flicker. 1 is normal. */
  speed?: number;
  /** Laser glow color as RGB in the 0 to 1 range. Default #011DE3 */
  color?: [number, number, number];
  /** Thickness of the white-hot beam core in CSS pixels. */
  thickness?: number;
  /** Intensity of the white beam core (0 to 2). 0 removes it. */
  core?: number;
  /** Reach of the colored glow around the beam in CSS pixels. */
  radius?: number;
  /** Brightness of the colored glow (0 to 3). 0 removes it. */
  glow?: number;
  /** Amplitude of the slow beam waviness in CSS pixels. */
  wave?: number;
  /** Beam length as a fraction of the content width (0 to 1). */
  width?: number;
  /** Random intensity flicker of the beam (0 to 1). */
  flicker?: number;
}

const VERT_SHADER = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main () {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform vec2 uResolution;
uniform float uTime;
uniform float uBeamY;
uniform float uWaveAmp;
uniform float uBeamCX;
uniform float uBeamHalfW;
uniform float uHalfCore;
uniform float uCore;
uniform float uRadius;
uniform float uGlow;
uniform vec3 uColor;
uniform float uBright;

float hash (vec2 v) {
  return fract(sin(dot(v, vec2(89.44, 19.36))) * 22189.22);
}

float iHash (vec2 v, vec2 r) {
  float h00 = hash(floor(v * r + vec2(0.0, 0.0)) / r);
  float h10 = hash(floor(v * r + vec2(1.0, 0.0)) / r);
  float h01 = hash(floor(v * r + vec2(0.0, 1.0)) / r);
  float h11 = hash(floor(v * r + vec2(1.0, 1.0)) / r);
  vec2 ip = smoothstep(vec2(0.0), vec2(1.0), mod(v * r, 1.0));
  return (h00 * (1.0 - ip.x) + h10 * ip.x) * (1.0 - ip.y)
    + (h01 * (1.0 - ip.x) + h11 * ip.x) * ip.y;
}

float noise (vec2 v) {
  float sum = 0.0;
  float s = 2.0;
  for (int i = 1; i < 7; i++) {
    sum += iHash(v + vec2(float(i)), vec2(2.0 * s)) / s;
    s *= 2.0;
  }
  return sum;
}

void main () {
  vec2 uv = vUv;
  float t = uTime;

  float nx = (uv.x - uBeamCX) / max(uBeamHalfW, 1e-4);
  float env = pow(max(1.0 - nx * nx, 0.0), 1.5);

  float bend = 0.0;
  if (uWaveAmp > 0.0) {
    bend = (noise(vec2(uv.x * 2.5 + t * 0.6, t * 0.4)) - 0.5) * 2.0 * uWaveAmp;
  }
  float yb = uBeamY + bend;
  float dy = uv.y - yb;
  float pxd = abs(dy) * uResolution.y;

  vec3 beam = vec3(0.0);
  if (env > 0.0) {
    float pd = pxd / max(env, 0.18);
    if (uCore > 0.0) {
      beam += 10.0 * uCore * smoothstep(uHalfCore, uHalfCore * 0.3, pd) * vec3(1.0);
    }
    if (uGlow > 0.0) {
      float g = pow(uRadius / max(pd, 0.75), 0.9) * exp(-0.55 * pd / uRadius);
      beam += uGlow * g * uColor;
    }
    beam *= uBright;
  }

  vec3 beamToned = (1.0 - exp(-beam)) * env;
  float ba = max(max(beamToned.r, beamToned.g), beamToned.b);
  outColor = vec4(beamToned, clamp(ba, 0.0, 1.0));
}`;

// #FF5B20 in 0..1 RGB: [255/255, 91/255, 32/255]
const LASER_COLOR_RGB: [number, number, number] = [1, 91 / 255, 32 / 255];

const DEFAULTS: Required<LaserOptions> = {
  speed: 0.4,
  color: LASER_COLOR_RGB,
  thickness: 1.8,
  core: 0.95,
  radius: 18,
  glow: 1.6,
  wave: 3.5,
  width: 0.92,
  flicker: 0.12,
};

export interface LaserDividerProps extends LaserOptions {
  className?: string;
}

export function LaserDivider({
  className = "",
  speed,
  color,
  thickness,
  core,
  radius,
  glow,
  wave,
  width,
  flicker,
}: LaserDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: true,
    });

    if (!gl || gl.isContextLost()) {
      setWebglSupported(false);
      return;
    }

    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERT_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAG_SHADER);
    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setWebglSupported(false);
      return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebglSupported(false);
      return;
    }

    const uniforms: Record<string, WebGLUniformLocation> = {};
    const activeUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < activeUniforms; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) {
        const loc = gl.getUniformLocation(program, info.name);
        if (loc) uniforms[info.name] = loc;
      }
    }

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const config = {
      speed: speed ?? DEFAULTS.speed,
      color: color ?? DEFAULTS.color,
      thickness: thickness ?? DEFAULTS.thickness,
      core: core ?? DEFAULTS.core,
      radius: radius ?? DEFAULTS.radius,
      glow: glow ?? DEFAULTS.glow,
      wave: wave ?? DEFAULTS.wave,
      width: width ?? DEFAULTS.width,
      flicker: flicker ?? DEFAULTS.flicker,
    };

    let isVisible = true;
    let isRunning = false;
    let destroyed = false;
    let rafId = 0;
    let lastTime = performance.now();
    let time = 0;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;

    const syncSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const render = () => {
      if (destroyed || !gl) return;
      gl.useProgram(program);

      const dpr = canvas.width / Math.max(canvas.clientWidth, 1);
      const clientH = Math.max(canvas.clientHeight, 1);

      if (uniforms.uResolution) {
        gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
      }
      if (uniforms.uTime) {
        gl.uniform1f(uniforms.uTime, time);
      }
      if (uniforms.uBeamY) {
        // Centered vertically in canvas
        gl.uniform1f(uniforms.uBeamY, 0.5);
      }
      if (uniforms.uWaveAmp) {
        gl.uniform1f(uniforms.uWaveAmp, Math.max(config.wave, 0) / clientH);
      }
      if (uniforms.uBeamCX) {
        gl.uniform1f(uniforms.uBeamCX, 0.5);
      }
      if (uniforms.uBeamHalfW) {
        gl.uniform1f(
          uniforms.uBeamHalfW,
          Math.min(Math.max(config.width, 0.05), 1) * 0.5,
        );
      }
      if (uniforms.uHalfCore) {
        gl.uniform1f(
          uniforms.uHalfCore,
          Math.max(config.thickness, 0.5) * dpr * 0.5,
        );
      }
      if (uniforms.uCore) {
        gl.uniform1f(uniforms.uCore, Math.max(config.core, 0));
      }
      if (uniforms.uRadius) {
        gl.uniform1f(uniforms.uRadius, Math.max(config.radius, 0.5) * dpr);
      }
      if (uniforms.uGlow) {
        gl.uniform1f(uniforms.uGlow, Math.max(config.glow, 0));
      }
      if (uniforms.uColor) {
        gl.uniform3f(
          uniforms.uColor,
          config.color[0],
          config.color[1],
          config.color[2],
        );
      }
      if (uniforms.uBright) {
        const flick =
          1 -
          Math.min(Math.max(config.flicker, 0), 1) *
            (Math.sin(time * 12.0) * 0.5 + 0.5) *
            0.6;
        gl.uniform1f(uniforms.uBright, flick);
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      if (destroyed) return;
      if (!isVisible) {
        isRunning = false;
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 1 / 30);
      lastTime = now;

      if (!reducedMotion) {
        time += delta * config.speed;
      }

      render();

      if (reducedMotion) {
        isRunning = false;
        return;
      }

      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (destroyed || isRunning || !isVisible) return;
      isRunning = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(loop);
    };

    syncSize();
    render();
    start();

    const resizeObserver = new ResizeObserver(() => {
      syncSize();
      render();
      start();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0]?.isIntersecting ?? true;
      if (isVisible) {
        start();
      }
    });
    intersectionObserver.observe(canvas);

    const handleMotionChange = () => {
      reducedMotion = motionQuery.matches;
      render();
      if (!reducedMotion) {
        start();
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
      gl.deleteBuffer(quad);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [speed, thickness, core, radius, glow, wave, width, flicker, color]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative w-full overflow-hidden select-none ${className}`}
    >
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255, 91, 32, 0.4), transparent 70%)",
          }}
        >
          <div
            className="w-[85%] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #FF5B20 25%, #ffffff 50%, #FF5B20 75%, transparent 100%)",
              boxShadow: "0 0 12px 2px #FF5B20",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default LaserDivider;

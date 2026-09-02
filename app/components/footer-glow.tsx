"use client";

import { useEffect, useRef } from "react";

const VERT_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG_SHADER = `
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseActive;

// Simplex Noise
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Low-frequency Fractional Brownian Motion for silky atmospheric fog
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.50;
  mat2 rot = mat2(cos(0.52), sin(0.52), -sin(0.52), cos(0.52));
  for (int i = 0; i < 4; ++i) {
    v += a * snoise(p);
    p = rot * p * 2.02 + vec2(100.0);
    a *= 0.48;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float t = uTime * 0.13;

  // Coordinate domain for fluid nebula flow
  vec2 st = vec2(uv.x * min(aspect * 0.35, 2.4), uv.y * 1.2);

  // Interactive cursor disturbance: aerodynamic deflection and gentle vortex
  vec2 toMouse = uv - uMouse;
  float mouseDist = length(toMouse * vec2(1.0, 1.25));
  float mouseInfluence = exp(-pow(mouseDist / 0.32, 2.0)) * uMouseActive;
  vec2 pushDir = normalize(toMouse + vec2(0.0001));
  vec2 swirlDir = vec2(-pushDir.y, pushDir.x);
  vec2 mouseDisturbance = (pushDir * 0.038 + swirlDir * 0.024) * mouseInfluence;

  st -= mouseDisturbance * 1.5;

  // Multi-scale volumetric curl-warped fog layers (silky billowing plumes)
  vec2 flow1 = vec2(
    fbm(st * 0.80 + vec2(t * 0.16, -t * 0.07)),
    fbm(st * 0.80 + vec2(-t * 0.12, t * 0.14) + vec2(4.3, 2.7))
  );

  vec2 flow2 = vec2(
    fbm(st * 1.10 + 1.2 * flow1 + vec2(1.7 - t * 0.10, 9.2 + t * 0.08)),
    fbm(st * 1.10 + 1.2 * flow1 + vec2(8.3 + t * 0.07, 2.8 - t * 0.11))
  );

  // Volumetric density composition: large puffy billows + soft filament depth
  float billow1 = fbm(st * 1.0 + 1.1 * flow2 + vec2(t * 0.05, -t * 0.03));
  float billow2 = fbm(st * 1.7 + 0.7 * flow1 - vec2(t * 0.06, t * 0.04) + vec2(3.1, 7.4));
  float fogDensity = clamp(billow1 * 0.65 + billow2 * 0.35 + 0.50, 0.0, 1.0);

  // Mobile adaptation factor (0.0 on wide desktop, 1.0 on narrow mobile screens)
  float isMobile = clamp((2.2 - aspect) / 1.0, 0.0, 1.0);

  // Sculpted Organic Shape & Composition:
  // 1. Left Side Nebula Plume (rises organically along left wing to top on mobile)
  float leftTendril = snoise(vec2(uv.y * 3.2 - t * 0.18, uv.x * 2.2)) * 0.08;
  float leftX = uv.x * mix(2.5, 3.8, isMobile) - 0.04 + leftTendril;
  float leftY = uv.y * mix(1.20, 0.32, isMobile) - 0.04;
  float leftDist = length(vec2(max(0.0, leftX), max(0.0, leftY)));
  float leftPlume = exp(-leftDist * leftDist * mix(1.75, 1.35, isMobile)) * mix(1.30, 1.20, isMobile);
  leftPlume *= smoothstep(mix(0.88, 1.20, isMobile), 0.08, uv.x * mix(1.5, 2.8, isMobile) + uv.y * mix(0.60, 0.12, isMobile));

  // 2. Right Side Nebula Plume (rises organically along right wing to top on mobile)
  float rightTendril = snoise(vec2(uv.y * 3.0 - t * 0.16, (1.0 - uv.x) * 2.2 + 5.0)) * 0.08;
  float rightX = (1.0 - uv.x) * mix(2.4, 3.8, isMobile) - 0.04 + rightTendril;
  float rightY = uv.y * mix(1.25, 0.32, isMobile) - 0.04;
  float rightDist = length(vec2(max(0.0, rightX), max(0.0, rightY)));
  float rightPlume = exp(-rightDist * rightDist * mix(1.80, 1.35, isMobile)) * mix(1.25, 1.15, isMobile);
  rightPlume *= smoothstep(mix(0.88, 1.20, isMobile), 0.08, (1.0 - uv.x) * mix(1.5, 2.8, isMobile) + uv.y * mix(0.60, 0.12, isMobile));

  // 3. Central Void: Clean pitch-black protected column for all footer text
  float centerDist = abs(uv.x - 0.5);
  float centerVoid = smoothstep(mix(0.14, 0.16, isMobile), mix(0.40, 0.38, isMobile), centerDist);

  // 4. Silky Floor Mist: Seamless, continuous horizontal mist along baseline with smooth center voiding
  vec2 floorSt = vec2(st.x * 1.25 + t * 0.05, st.y * 1.45 - t * 0.02);
  float floorSmoke = fbm(floorSt);
  float floorMist = exp(-pow(uv.y / (0.068 - isMobile * 0.016), 1.7)) * (floorSmoke * 0.5 + 0.5) * (0.28 - isMobile * 0.08) * smoothstep(0.08, 0.35, centerDist);

  // Top ceiling fade: smooth natural disappearance into space
  float topFade = smoothstep(mix(0.92, 0.98, isMobile), 0.08, uv.y);

  // Combined atmospheric shape envelope
  float shapeEnvelope = ((leftPlume + rightPlume) * centerVoid + floorMist) * topFade;

  // Final volumetric illumination density
  float totalIllumination = fogDensity * shapeEnvelope * mix(1.0, 0.78, isMobile);
  totalIllumination = clamp(totalIllumination, 0.0, 1.0);

  // Radiant Laser Orange Color Mapping ([1.0, 0.3529, 0.1216] / #FF5B20):
  vec3 laserColor = vec3(1.0, 0.3529, 0.1216);
  vec3 colEmber = laserColor * 0.06 + vec3(0.015, 0.005, 0.002);
  vec3 colDarkAmber = laserColor * 0.26 + vec3(0.035, 0.008, 0.0);
  vec3 colWarmOrange = laserColor * 0.68;
  vec3 colBrightLaser = laserColor * 1.02;
  vec3 colLaserCore = vec3(1.0, 0.86, 0.68);

  vec3 color = vec3(0.0);
  color += colEmber * smoothstep(0.01, 0.20, totalIllumination);
  color += colDarkAmber * smoothstep(0.08, 0.44, totalIllumination) * 0.85;
  color += colWarmOrange * smoothstep(0.22, 0.68, totalIllumination) * 0.80;
  color += colBrightLaser * smoothstep(0.42, 0.88, totalIllumination) * 0.75;

  // Radiant core highlight in the denser, lower portions of the plumes
  float coreHighlight = smoothstep(0.58, 0.98, totalIllumination) * smoothstep(0.42, 0.02, uv.y);
  color += colLaserCore * coreHighlight * 0.68;

  // Subtle interactive brightness boost on hover, tuned for mobile
  color *= (1.0 + mouseInfluence * 0.20) * mix(1.0, 0.85, isMobile);

  // Seamless alpha blend into black footer background
  float alpha = smoothstep(0.004, 0.20, totalIllumination) * topFade;

  gl_FragColor = vec4(color, alpha);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
) {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function FooterGlow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isInitialized = false;
    let isVisible = false;
    let animationFrameId: number | null = null;
    let startAnimation: (() => void) | null = null;
    let stopAnimation: (() => void) | null = null;
    let cleanupGl: (() => void) | null = null;

    const initWebGL = () => {
      if (isInitialized) return;
      isInitialized = true;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const gl =
        canvas.getContext("webgl", {
          alpha: true,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: "low-power",
        }) ||
        (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

      if (!gl) return;

      const vertShader = createShader(gl, gl.VERTEX_SHADER, VERT_SHADER);
      const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAG_SHADER);
      if (!vertShader || !fragShader) return;

      const program = createProgram(gl, vertShader, fragShader);
      if (!program) return;

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );

      const positionLocation = gl.getAttribLocation(program, "position");
      const resolutionLocation = gl.getUniformLocation(program, "uResolution");
      const timeLocation = gl.getUniformLocation(program, "uTime");
      const mouseLocation = gl.getUniformLocation(program, "uMouse");
      const mouseActiveLocation = gl.getUniformLocation(program, "uMouseActive");

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const startTime = performance.now();

      const mouse = {
        currentX: 0.5,
        currentY: 0.0,
        targetX: 0.5,
        targetY: 0.0,
        currentActive: 0.0,
        targetActive: 0.0,
      };

      let cachedRect: DOMRect | null = null;
      let rectDirty = true;

      const getCanvasRect = () => {
        if (!cachedRect || rectDirty) {
          if (canvas) {
            cachedRect = canvas.getBoundingClientRect();
            rectDirty = false;
          }
        }
        return cachedRect;
      };

      const invalidateRect = () => {
        rectDirty = true;
      };

      const handlePointerMove = (e: MouseEvent | TouchEvent) => {
        if (!canvas || !isVisible) return;
        const rect = getCanvasRect();
        if (!rect) return;
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        const x = (clientX - rect.left) / Math.max(rect.width, 1);
        const y = (rect.bottom - clientY) / Math.max(rect.height, 1);

        mouse.targetX = Math.max(0.0, Math.min(1.0, x));
        mouse.targetY = Math.max(0.0, Math.min(1.0, y));

        if (
          clientY >= rect.top - 50 &&
          clientY <= rect.bottom + 50 &&
          clientX >= rect.left - 50 &&
          clientX <= rect.right + 50
        ) {
          mouse.targetActive = 1.0;
        } else {
          mouse.targetActive = 0.0;
        }
      };

      const handlePointerLeave = () => {
        mouse.targetActive = 0.0;
      };

      window.addEventListener("scroll", invalidateRect, { passive: true });
      window.addEventListener("resize", invalidateRect, { passive: true });
      window.addEventListener("mousemove", handlePointerMove, { passive: true });
      window.addEventListener("touchmove", handlePointerMove, { passive: true });
      window.addEventListener("mouseleave", handlePointerLeave, {
        passive: true,
      });
      window.addEventListener("touchend", handlePointerLeave, { passive: true });

      const getDpr = () => {
        const isMobile =
          /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
          window.innerWidth < 768;
        return isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.25);
      };

      const resize = () => {
        if (!canvas) return;
        rectDirty = true;
        const rect = getCanvasRect();
        if (!rect) return;
        const dpr = getDpr();
        const displayWidth = Math.round(rect.width * dpr);
        const displayHeight = Math.round(rect.height * dpr);

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          canvas.width = displayWidth;
          canvas.height = displayHeight;
          gl.viewport(0, 0, displayWidth, displayHeight);
        }
      };

      const resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(canvas);
      resize();

      const render = (now: number) => {
        if (!isVisible) {
          animationFrameId = null;
          return;
        }

        const elapsed = (now - startTime) * 0.001;
        const time = prefersReducedMotion ? 0.0 : elapsed;

        // Smooth inertia easing with responsive tracking
        mouse.currentX += (mouse.targetX - mouse.currentX) * 0.08;
        mouse.currentY += (mouse.targetY - mouse.currentY) * 0.08;
        mouse.currentActive += (mouse.targetActive - mouse.currentActive) * 0.08;

        gl.useProgram(program);

        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(timeLocation, time);
        gl.uniform2f(mouseLocation, mouse.currentX, mouse.currentY);
        gl.uniform1f(mouseActiveLocation, mouse.currentActive);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        animationFrameId = requestAnimationFrame(render);
      };

      startAnimation = () => {
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      };

      stopAnimation = () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      };

      if (isVisible) {
        startAnimation();
      }

      cleanupGl = () => {
        window.removeEventListener("scroll", invalidateRect);
        window.removeEventListener("resize", invalidateRect);
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("mouseleave", handlePointerLeave);
        window.removeEventListener("touchend", handlePointerLeave);
        resizeObserver.disconnect();
        stopAnimation?.();
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(positionBuffer);
      };
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            if (!isInitialized) {
              initWebGL();
            } else {
              startAnimation?.();
            }
          } else {
            stopAnimation?.();
          }
        });
      },
      { threshold: 0.01, rootMargin: "100px" },
    );
    intersectionObserver.observe(canvas);

    return () => {
      intersectionObserver.disconnect();
      cleanupGl?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

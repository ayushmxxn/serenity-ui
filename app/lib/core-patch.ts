import type { SoundPatch } from "@web-kits/audio";

export const corePatch: SoundPatch = {
  name: "Core",
  author: "Raphael Salaja",
  version: "3.1.0",
  description:
    "A foundational UI sound pack with essential clicks, toggles, pops, notifications, and transitions, designed to feel clear and familiar across everyday product interactions without overwhelming the interface.",
  sounds: {
    click: {
      source: {
        type: "sine",
        frequency: { start: 200, end: 700 },
        fm: { ratio: 0.5, depth: 80 },
      },
      envelope: { attack: 0, decay: 0.06, sustain: 0, release: 0.02 },
      gain: 0.25,
    },
    tap: {
      source: {
        type: "sine",
        frequency: 1300,
        fm: { ratio: 0.5, depth: 100 },
      },
      envelope: { attack: 0, decay: 0.015, sustain: 0, release: 0.005 },
      gain: 0.2,
    },
    "key-press": {
      source: {
        type: "sine",
        frequency: 1300,
        fm: { ratio: 0.5, depth: 80 },
      },
      envelope: { attack: 0, decay: 0.012, sustain: 0, release: 0.004 },
      gain: 0.18,
    },
    checkbox: {
      source: {
        type: "sine",
        frequency: { start: 250, end: 800 },
        fm: { ratio: 0.5, depth: 60 },
      },
      envelope: { attack: 0, decay: 0.05, sustain: 0, release: 0.015 },
      gain: 0.22,
    },
    radio: {
      source: {
        type: "sine",
        frequency: { start: 300, end: 900 },
        fm: { ratio: 0.5, depth: 50 },
      },
      envelope: { attack: 0, decay: 0.04, sustain: 0, release: 0.012 },
      gain: 0.2,
    },
    tick: {
      source: {
        type: "sine",
        frequency: 1500,
        fm: { ratio: 0.5, depth: 60 },
      },
      envelope: { attack: 0, decay: 0.01, sustain: 0, release: 0.004 },
      gain: 0.15,
    },
    "scroll-snap": {
      source: {
        type: "sine",
        frequency: 1400,
        fm: { ratio: 0.5, depth: 50 },
      },
      envelope: { attack: 0, decay: 0.008, sustain: 0, release: 0.003 },
      gain: 0.08,
    },
    focus: {
      source: {
        type: "sine",
        frequency: 1300,
        fm: { ratio: 0.5, depth: 40 },
      },
      envelope: { attack: 0, decay: 0.02, sustain: 0, release: 0.008 },
      gain: 0.06,
    },
    blur: {
      source: {
        type: "sine",
        frequency: 1100,
        fm: { ratio: 0.5, depth: 30 },
      },
      envelope: { attack: 0, decay: 0.018, sustain: 0, release: 0.008 },
      gain: 0.04,
    },
    select: {
      source: {
        type: "sine",
        frequency: 1400,
        fm: { ratio: 0.5, depth: 60 },
      },
      envelope: { attack: 0, decay: 0.05, sustain: 0, release: 0.015 },
      gain: 0.2,
    },
    deselect: {
      source: {
        type: "sine",
        frequency: 1100,
        fm: { ratio: 0.5, depth: 40 },
      },
      envelope: { attack: 0, decay: 0.04, sustain: 0, release: 0.012 },
      gain: 0.16,
    },
    "toggle-on": {
      layers: [
        {
          source: { type: "sine", frequency: 523 },
          envelope: { attack: 0, decay: 0.02, sustain: 0, release: 0.006 },
          gain: 0.18,
        },
        {
          source: { type: "sine", frequency: 784 },
          envelope: { attack: 0, decay: 0.025, sustain: 0, release: 0.008 },
          gain: 0.16,
          delay: 0.03,
        },
      ],
    },
    "toggle-off": {
      layers: [
        {
          source: { type: "sine", frequency: 784 },
          envelope: { attack: 0, decay: 0.02, sustain: 0, release: 0.006 },
          gain: 0.16,
        },
        {
          source: { type: "sine", frequency: 523 },
          envelope: { attack: 0, decay: 0.025, sustain: 0, release: 0.008 },
          gain: 0.18,
          delay: 0.03,
        },
      ],
    },
    collapse: {
      source: {
        type: "sine",
        frequency: { start: 700, end: 450 },
      },
      envelope: { attack: 0.003, decay: 0.08, sustain: 0.02, release: 0.03 },
      gain: 0.12,
    },
    expand: {
      source: {
        type: "sine",
        frequency: { start: 500, end: 700 },
      },
      envelope: { attack: 0.003, decay: 0.1, sustain: 0.02, release: 0.04 },
      gain: 0.12,
    },
    "slide-up": {
      filter: {
        type: "lowpass",
        frequency: 2400,
      },
      source: {
        type: "sine",
        frequency: { start: 300, end: 600 },
      },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.02, release: 0.03 },
      gain: 0.12,
    },
    "slide-down": {
      filter: {
        type: "lowpass",
        frequency: 2400,
      },
      source: {
        type: "sine",
        frequency: { start: 600, end: 300 },
      },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.02, release: 0.03 },
      gain: 0.12,
    },
    slide: {
      filter: {
        type: "bandpass",
        frequency: 500,
        resonance: 1,
        envelope: { peak: 3000, decay: 0.12, attack: 0.02 },
      },
      source: { type: "noise", color: "white" },
      envelope: { attack: 0.01, decay: 0.15, sustain: 0, release: 0.05 },
      gain: 0.07,
    },
    copy: {
      layers: [
        {
          source: { type: "sine", frequency: 1200 },
          envelope: { attack: 0, decay: 0.015, sustain: 0, release: 0.006 },
          gain: 0.16,
        },
        {
          source: { type: "sine", frequency: 1400 },
          envelope: { attack: 0, decay: 0.015, sustain: 0, release: 0.006 },
          gain: 0.14,
          delay: 0.04,
        },
      ],
    },
    save: {
      layers: [
        {
          source: {
            type: "sine",
            frequency: { start: 880, end: 1046 },
          },
          envelope: { attack: 0, decay: 0.1, sustain: 0.03, release: 0.04 },
          gain: 0.14,
        },
        {
          source: {
            type: "sine",
            frequency: { start: 1046, end: 1175 },
          },
          envelope: { attack: 0, decay: 0.1, sustain: 0.02, release: 0.04 },
          gain: 0.1,
          delay: 0.08,
        },
      ],
    },
    delete: {
      layers: [
        {
          filter: { type: "lowpass", frequency: 800 },
          source: {
            type: "sawtooth",
            frequency: { start: 300, end: 100 },
          },
          envelope: { attack: 0, decay: 0.3, sustain: 0, release: 0.08 },
          gain: 0.18,
        },
        {
          filter: { type: "lowpass", frequency: 600 },
          source: {
            type: "square",
            frequency: { start: 200, end: 60 },
          },
          envelope: { attack: 0, decay: 0.25, sustain: 0, release: 0.06 },
          gain: 0.1,
          delay: 0.02,
        },
      ],
    },
    undo: {
      source: {
        type: "sine",
        frequency: { start: 900, end: 600 },
      },
      envelope: { attack: 0, decay: 0.12, sustain: 0.02, release: 0.04 },
      gain: 0.14,
    },
    pop: {
      source: {
        type: "sine",
        frequency: { start: 400, end: 150 },
      },
      envelope: { attack: 0, decay: 0.08, sustain: 0, release: 0.025 },
      gain: 0.25,
    },
    boop: {
      source: {
        type: "sine",
        frequency: { start: 600, end: 250 },
        fm: { ratio: 0.5, depth: 40 },
      },
      envelope: { attack: 0, decay: 0.1, sustain: 0, release: 0.03 },
      gain: 0.2,
    },
    success: {
      layers: [
        {
          source: { type: "sine", frequency: 523 },
          envelope: { attack: 0.003, decay: 0.3, sustain: 0.06, release: 0.1 },
          gain: 0.16,
        },
        {
          source: { type: "sine", frequency: 659 },
          envelope: { attack: 0.003, decay: 0.35, sustain: 0.06, release: 0.12 },
          gain: 0.14,
          delay: 0.07,
        },
        {
          source: { type: "sine", frequency: 784 },
          envelope: { attack: 0.003, decay: 0.4, sustain: 0.06, release: 0.15 },
          gain: 0.14,
          delay: 0.14,
        },
      ],
    },
    error: {
      layers: [
        {
          filter: { type: "lowpass", frequency: 1200 },
          source: {
            type: "sawtooth",
            frequency: { start: 320, end: 140 },
          },
          envelope: { attack: 0, decay: 0.25, sustain: 0, release: 0.08 },
          gain: 0.22,
        },
        {
          filter: { type: "lowpass", frequency: 800 },
          source: {
            type: "square",
            frequency: { start: 180, end: 80 },
          },
          envelope: { attack: 0, decay: 0.2, sustain: 0, release: 0.06 },
          gain: 0.12,
          delay: 0.03,
        },
      ],
    },
    warning: {
      layers: [
        {
          source: {
            type: "sine",
            frequency: 440,
            fm: { ratio: 1.5, depth: 80 },
          },
          envelope: { attack: 0.005, decay: 0.15, sustain: 0.04, release: 0.05 },
          gain: 0.16,
        },
        {
          source: {
            type: "sine",
            frequency: 440,
            fm: { ratio: 1.5, depth: 80 },
          },
          envelope: { attack: 0.005, decay: 0.15, sustain: 0.04, release: 0.05 },
          gain: 0.14,
          delay: 0.1,
        },
      ],
    },
    info: {
      source: {
        type: "sine",
        frequency: 880,
        fm: { ratio: 2, depth: 120 },
      },
      envelope: { attack: 0.003, decay: 0.3, sustain: 0.04, release: 0.12 },
      gain: 0.14,
    },
    notification: {
      layers: [
        {
          source: { type: "sine", frequency: 587 },
          envelope: { attack: 0.003, decay: 0.15, sustain: 0.02, release: 0.05 },
          gain: 0.15,
        },
        {
          source: { type: "sine", frequency: 880 },
          envelope: { attack: 0.003, decay: 0.25, sustain: 0.04, release: 0.1 },
          gain: 0.16,
          delay: 0.06,
        },
      ],
    },
    badge: {
      effects: [{ type: "reverb", mix: 0.1, decay: 0.5, damping: 0.6 }],
      source: {
        type: "sine",
        frequency: 1100,
        fm: { ratio: 2.76, depth: 350 },
      },
      envelope: { attack: 0, decay: 0.35, sustain: 0.04, release: 0.15 },
      gain: 0.16,
    },
    star: {
      effects: [{ type: "reverb", mix: 0.12, decay: 0.6, damping: 0.5 }],
      source: {
        type: "sine",
        frequency: 880,
        fm: { ratio: 2.76, depth: 250 },
      },
      envelope: { attack: 0, decay: 0.4, sustain: 0.04, release: 0.18 },
      gain: 0.14,
    },
    heart: {
      layers: [
        {
          source: {
            type: "sine",
            frequency: { start: 500, end: 300 },
          },
          envelope: { attack: 0, decay: 0.1, sustain: 0, release: 0.04 },
          gain: 0.16,
        },
        {
          source: {
            type: "sine",
            frequency: 523,
            fm: { ratio: 2.5, depth: 100 },
          },
          envelope: { attack: 0.008, decay: 0.25, sustain: 0.04, release: 0.1 },
          gain: 0.1,
        },
      ],
    },
    send: {
      source: {
        type: "sine",
        frequency: { start: 500, end: 1200 },
      },
      envelope: { attack: 0, decay: 0.15, sustain: 0, release: 0.04 },
      gain: 0.16,
    },
    receive: {
      source: {
        type: "sine",
        frequency: { start: 1200, end: 700 },
      },
      envelope: { attack: 0, decay: 0.12, sustain: 0.02, release: 0.04 },
      gain: 0.12,
    },
    "tab-switch": {
      source: {
        type: "sine",
        frequency: 1100,
        fm: { ratio: 0.5, depth: 40 },
      },
      envelope: { attack: 0, decay: 0.015, sustain: 0, release: 0.005 },
      gain: 0.15,
    },
    "page-enter": {
      filter: {
        type: "lowpass",
        frequency: 2000,
      },
      source: {
        type: "sine",
        frequency: { start: 350, end: 550 },
      },
      envelope: { attack: 0.01, decay: 0.15, sustain: 0.02, release: 0.05 },
      gain: 0.12,
    },
    "page-exit": {
      filter: {
        type: "lowpass",
        frequency: 2000,
      },
      source: {
        type: "sine",
        frequency: { start: 550, end: 350 },
      },
      envelope: { attack: 0.005, decay: 0.12, sustain: 0.01, release: 0.04 },
      gain: 0.1,
    },
    escape: {
      layers: [
        {
          source: {
            type: "sine",
            frequency: { start: 900, end: 600 },
          },
          envelope: { attack: 0, decay: 0.05, sustain: 0, release: 0.015 },
          gain: 0.16,
        },
        {
          source: {
            type: "sine",
            frequency: { start: 700, end: 500 },
          },
          envelope: { attack: 0, decay: 0.04, sustain: 0, release: 0.012 },
          gain: 0.1,
          delay: 0.03,
        },
      ],
    },
    command: {
      layers: [
        {
          source: {
            type: "sine",
            frequency: { start: 600, end: 900 },
          },
          envelope: { attack: 0, decay: 0.05, sustain: 0, release: 0.015 },
          gain: 0.18,
        },
        {
          source: {
            type: "sine",
            frequency: { start: 900, end: 1100 },
          },
          envelope: { attack: 0, decay: 0.04, sustain: 0, release: 0.012 },
          gain: 0.12,
          delay: 0.04,
        },
      ],
    },
    mention: {
      effects: [{ type: "reverb", mix: 0.1, decay: 0.6, damping: 0.5 }],
      source: {
        type: "sine",
        frequency: 660,
        fm: { ratio: 2.5, depth: 150 },
      },
      envelope: { attack: 0.003, decay: 0.5, sustain: 0.05, release: 0.2 },
      gain: 0.14,
    },
    sparkle: {
      layers: [
        {
          effects: [{ type: "reverb", mix: 0.15, decay: 0.8, damping: 0.5 }],
          source: {
            type: "sine",
            frequency: 1047,
            detune: 7,
            fm: { ratio: 3.5, depth: 200 },
          },
          envelope: { attack: 0, decay: 0.4, sustain: 0.04, release: 0.18 },
          gain: 0.12,
        },
        {
          source: {
            type: "sine",
            frequency: 1050,
            fm: { ratio: 3.5, depth: 180 },
          },
          envelope: { attack: 0, decay: 0.38, sustain: 0.03, release: 0.18 },
          gain: 0.08,
        },
      ],
    },
    streak: {
      layers: [
        {
          source: {
            type: "sine",
            frequency: { start: 523, end: 784 },
          },
          envelope: { attack: 0, decay: 0.12, sustain: 0.02, release: 0.05 },
          gain: 0.16,
        },
        {
          source: {
            type: "sine",
            frequency: { start: 526, end: 787 },
            fm: { ratio: 2.5, depth: 100 },
          },
          envelope: { attack: 0, decay: 0.11, sustain: 0.01, release: 0.05 },
          gain: 0.08,
        },
      ],
    },
    sync: {
      layers: [
        {
          source: { type: "sine", frequency: 523 },
          envelope: { attack: 0, decay: 0.015, sustain: 0, release: 0.005 },
          gain: 0.14,
        },
        {
          source: { type: "sine", frequency: 784 },
          envelope: { attack: 0, decay: 0.015, sustain: 0, release: 0.005 },
          gain: 0.12,
          delay: 0.04,
        },
      ],
    },
    "loading-start": {
      source: {
        type: "sine",
        frequency: { start: 400, end: 600 },
      },
      envelope: { attack: 0.005, decay: 0.08, sustain: 0.02, release: 0.03 },
      gain: 0.12,
    },
    "loading-end": {
      source: {
        type: "sine",
        frequency: { start: 600, end: 800 },
      },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.02, release: 0.04 },
      gain: 0.14,
    },
    bounce: {
      source: {
        type: "sine",
        frequency: { start: 350, end: 180 },
      },
      envelope: { attack: 0, decay: 0.12, sustain: 0, release: 0.04 },
      gain: 0.22,
    },
    spring: {
      source: {
        type: "sine",
        frequency: { start: 400, end: 900 },
        fm: { ratio: 0.5, depth: 50 },
      },
      envelope: { attack: 0, decay: 0.15, sustain: 0.03, release: 0.05 },
      gain: 0.18,
    },
    swoosh: {
      filter: {
        type: "bandpass",
        frequency: 300,
        resonance: 1.8,
        envelope: { peak: 4000, decay: 0.08, attack: 0.01 },
      },
      source: { type: "noise", color: "white" },
      envelope: { attack: 0.01, decay: 0.12, sustain: 0, release: 0.04 },
      gain: 0.12,
    },
    whoosh: {
      filter: {
        type: "bandpass",
        frequency: 300,
        resonance: 1.5,
        envelope: { peak: 4000, decay: 0.16, attack: 0.04 },
      },
      source: { type: "noise", color: "white" },
      envelope: { attack: 0.02, decay: 0.25, sustain: 0, release: 0.08 },
      gain: 0.15,
    },
    archive: {
      source: {
        type: "sine",
        frequency: { start: 800, end: 550 },
      },
      envelope: { attack: 0.003, decay: 0.15, sustain: 0.02, release: 0.05 },
      gain: 0.12,
    },
  },
};

export type CoreSoundName = keyof typeof corePatch.sounds;

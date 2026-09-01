"use client";

import { usePatch } from "@web-kits/audio/react";
import { useCallback } from "react";
import { corePatch, type CoreSoundName } from "./core-patch";

export function useCoreAudio() {
  const patch = usePatch(corePatch);

  const play = useCallback(
    (name: CoreSoundName, options?: Parameters<NonNullable<typeof patch>["play"]>[1]) => {
      try {
        if (patch && typeof patch.play === "function") {
          patch.play(name, options);
        }
      } catch {
        // Audio errors must never throw or block UI interactions
      }
    },
    [patch],
  );

  return { play, patch };
}

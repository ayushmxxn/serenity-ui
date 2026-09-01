import type React from "react";

export interface RegistryVariant {
  id: string;
  label: string;
  code: string;
  fileName?: string;
  cliCommand?: string;
  cliSlug?: string;
  dependencies?: string[];
}

export interface RegistryEntry {
  name: string;
  slug: string;
  type?: "component" | "block";
  category?: string;
  component: React.ComponentType<any>;
  code?: string;
  dependencies?: string[];
  cliCommand?: string;
  videoPreview?: string;
  variants?: RegistryVariant[];
  defaultVariant?: string;
}



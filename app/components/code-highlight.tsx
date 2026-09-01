"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeHighlightProps {
  code: string;
  lang?: string;
  isDark?: boolean;
}

export function CodeHighlight({
  code,
  lang = "tsx",
  isDark = true,
}: CodeHighlightProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function highlight() {
      try {
        const result = await codeToHtml(code, {
          lang,
          theme: isDark ? "github-dark" : "github-light",
          transformers: [
            {
              pre(node) {
                node.properties.style =
                  "background-color: transparent; margin: 0; padding: 0;";
              },
            },
          ],
        });

        if (!isCancelled) {
          setHtml(result);
        }
      } catch (err) {
        console.error("Shiki highlight error:", err);
      }
    }

    highlight();

    return () => {
      isCancelled = true;
    };
  }, [code, lang, isDark]);

  if (!html) {
    const lines = code.split("\n");
    return (
      <pre className="text-xs sm:text-sm font-mono leading-relaxed text-[var(--text-primary)] whitespace-pre overflow-x-auto select-text font-normal">
        <code>
          {lines.map((line, idx) => (
            <div key={idx} className="flex min-w-full">
              <span className="w-6 sm:w-8 mr-3 sm:mr-3.5 text-right select-none tabular-nums text-neutral-400 dark:text-neutral-600 shrink-0 opacity-50 font-mono text-xs">
                {idx + 1}
              </span>
              <span>{line || " "}</span>
            </div>
          ))}
        </code>
      </pre>
    );
  }

  return (
    <div
      className="text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto select-text [&_pre]:bg-transparent! [&_code]:bg-transparent! [&_pre]:p-0! [&_pre]:m-0! [&_code]:grid [&_code]:[counter-reset:step] [&_code_.line]:[counter-increment:step] [&_code_.line]:before:content-[counter(step)] [&_code_.line]:before:inline-block [&_code_.line]:before:w-6 [&_code_.line]:before:sm:w-8 [&_code_.line]:before:mr-3 [&_code_.line]:before:sm:mr-3.5 [&_code_.line]:before:text-right [&_code_.line]:before:text-neutral-400 dark:[&_code_.line]:before:text-neutral-600 [&_code_.line]:before:select-none [&_code_.line]:before:tabular-nums [&_code_.line]:before:shrink-0 [&_code_.line]:before:opacity-60 [&_code_.line]:before:text-xs [&_code_.line]:inline-block [&_code_.line]:w-full"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

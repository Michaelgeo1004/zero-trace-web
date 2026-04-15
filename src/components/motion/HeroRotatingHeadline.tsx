"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  prefix: string;
  keywords: readonly string[];
  suffix?: string;
  typeMs?: number;
  holdMs?: number;
  deleteMs?: number;
};

export function HeroRotatingHeadline({
  prefix,
  keywords,
  suffix = "",
  typeMs = 48,
  holdMs = 1600,
  deleteMs = 32,
}: Props) {
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "deleting">("typing");
  const words = useMemo(() => keywords.filter(Boolean), [keywords]);
  const maxWordLength = useMemo(
    () => words.reduce((max, word) => Math.max(max, word.length), 0),
    [words],
  );

  useEffect(() => {
    if (words.length === 0) return;
    if (reduce) {
      setText(words[0]);
      return;
    }

    const activeWord = words[wordIndex] ?? words[0];

    if (phase === "typing") {
      if (text.length < activeWord.length) {
        const id = window.setTimeout(() => {
          setText(activeWord.slice(0, text.length + 1));
        }, typeMs);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => setPhase("hold"), holdMs);
      return () => window.clearTimeout(id);
    }

    if (phase === "hold") {
      const id = window.setTimeout(() => setPhase("deleting"), holdMs);
      return () => window.clearTimeout(id);
    }

    if (text.length > 0) {
      const id = window.setTimeout(() => {
        setText(activeWord.slice(0, text.length - 1));
      }, deleteMs);
      return () => window.clearTimeout(id);
    }

    setWordIndex((i) => (i + 1) % words.length);
    setPhase("typing");
  }, [deleteMs, holdMs, phase, reduce, text, typeMs, wordIndex, words]);

  if (words.length === 0) return <span>{prefix}</span>;

  return (
    <span className="inline">
      {prefix}
      <span className="inline-block whitespace-nowrap align-baseline">
        <span
          className="inline-block text-left text-[var(--accent)]"
          style={{ width: `${Math.max(maxWordLength + 1, 10)}ch` }}
        >
          {text || "\u00A0"} 
        </span>
      </span>
    </span>
  );
}

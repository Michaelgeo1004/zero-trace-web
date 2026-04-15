"use client";

import { SiteLogo } from "@/components/brand/SiteLogo";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const BRAND_NAME = "Zero Trace";
const TAGLINE = "Celebrate more. Waste zero.";
const SCENE_MS = [5000, 5000, 10000, 10000, 10000] as const;
const TOTAL_MS = SCENE_MS.reduce((a, b) => a + b, 0);

type SceneIndex = 0 | 1 | 2 | 3 | 4;

const SHOTS = {
  hero: "/brand/hero-campaign.png",
  dining: "/brand/kit-dining.png",
  solution: "/brand/solution-banner.png",
} as const;

function useSceneTimeline(opts: {
  reduceMotion: boolean;
  autoStart: boolean;
  hideChrome: boolean;
}) {
  const { reduceMotion, autoStart, hideChrome } = opts;
  const [scene, setScene] = useState<SceneIndex>(0);
  const [playing, setPlaying] = useState(autoStart && !reduceMotion);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    setFinished(false);
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setPlaying(false);
    clearTimer();
  }, [clearTimer]);

  const restart = useCallback(() => {
    clearTimer();
    setScene(0);
    setFinished(false);
    setPlaying(true);
  }, [clearTimer]);

  useEffect(() => {
    if (reduceMotion || !playing || finished) {
      clearTimer();
      return;
    }
    const dur = SCENE_MS[scene];
    timerRef.current = setTimeout(() => {
      if (scene < 4) {
        setScene((s) => (s + 1) as SceneIndex);
      } else {
        setPlaying(false);
        setFinished(true);
      }
    }, dur);
    return clearTimer;
  }, [scene, playing, finished, reduceMotion, clearTimer]);

  useEffect(() => {
    if (hideChrome && !reduceMotion) {
      setPlaying(true);
      setFinished(false);
      setScene(0);
    }
  }, [hideChrome, reduceMotion]);

  const nextManual = useCallback(() => {
    if (scene < 4) setScene((s) => (s + 1) as SceneIndex);
    else setFinished(true);
  }, [scene]);

  const prevManual = useCallback(() => {
    if (scene > 0) setScene((s) => (s - 1) as SceneIndex);
  }, [scene]);

  return {
    scene,
    playing,
    finished,
    totalMs: TOTAL_MS,
    play,
    pause,
    restart,
    nextManual,
    prevManual,
  };
}

function AdCinematicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-[30] opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[31] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)]"
        aria-hidden
      />
      {/* Cinematic letterbox bars for promo-film feel */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[40] h-[7%] bg-black/75" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[40] h-[7%] bg-black/75" />
      <div className="relative z-20 flex h-full w-full flex-col">{children}</div>
    </div>
  );
}

const sceneTransition = {
  initial: { opacity: 0, scale: 1.05, filter: "blur(12px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.97, filter: "blur(8px)" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
};

function SceneProblem({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-black px-[6%] py-[7%]"
      {...sceneTransition}
    >
      <AdCinematicShell>
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1, 1.06] }}
          transition={{ duration: 5.2, ease: "easeOut" }}
        >
          <Image
            src={SHOTS.solution}
            alt=""
            fill
            className="object-cover saturate-50 brightness-[0.42] contrast-125"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20" />
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-md border border-white/15 bg-white/10"
            style={{
              left: `${8 + (i * 7) % 86}%`,
              top: `${16 + (i * 13) % 64}%`,
              width: `${20 + (i % 3) * 16}px`,
              height: `${10 + (i % 2) * 8}px`,
              rotate: -20 + i * 7,
            }}
            animate={reduce ? undefined : { y: [0, -8, 2, 0], opacity: [0.2, 0.55, 0.4] }}
            transition={{ duration: 2.8 + (i % 4) * 0.4, repeat: Infinity, delay: i * 0.09 }}
          />
        ))}
        <div className="relative z-50 flex h-full flex-col justify-end pb-[10%]">
          <p className="max-w-3xl font-display text-[clamp(1.2rem,3.4vw,2.6rem)] leading-tight text-white">
            “Every celebration leaves behind memories… and waste.”
          </p>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/80 sm:text-base">
            Trash after an event: plastic plates, cups, and disposable clutter.
          </p>
        </div>
      </AdCinematicShell>
    </motion.div>
  );
}

function SceneAwareness({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="relative flex h-full w-full flex-col overflow-hidden bg-[#050a0c] px-[6%] py-[7%]"
      {...sceneTransition}
    >
      <AdCinematicShell>
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1.02, 1.1], x: [0, -10] }}
          transition={{ duration: 5.5, ease: "easeOut" }}
        >
          <Image
            src={SHOTS.hero}
            alt=""
            fill
            className="object-cover grayscale brightness-[0.38] contrast-125 saturate-0"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#061018]/85 via-[#07161d]/70 to-[#020406]/95" />
        <motion.div
          className="absolute left-[10%] top-[18%] h-40 w-40 rounded-full border border-cyan-200/25"
          animate={reduce ? undefined : { scale: [1, 1.08, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 4.2, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-[12%] top-[34%] h-32 w-32 rounded-full border border-cyan-200/20"
          animate={reduce ? undefined : { scale: [1, 1.12, 1], rotate: [0, -20, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, delay: 0.3 }}
        />
        <div className="absolute inset-x-[8%] top-[20%] flex justify-between gap-2 opacity-55">
          {["Single-use", "Landfill pressure", "Disposal cost"].map((label, i) => (
            <motion.span
              key={label}
              className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-white/80 sm:text-xs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
            >
              {label}
            </motion.span>
          ))}
        </div>
        <div className="relative z-50 flex h-full flex-col justify-end pb-[12%]">
          <h2 className="max-w-3xl font-display text-[clamp(1.3rem,3.2vw,2.4rem)] leading-tight text-white">
            “But what if your event could celebrate without harming the planet?”
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-sm text-white/78 sm:text-base">
            Sad earth and pollution mood, dark and desaturated.
          </p>
        </div>
      </AdCinematicShell>
    </motion.div>
  );
}

function KitCard({
  src,
  label,
  index,
  active,
  reduce,
}: {
  src: string;
  label: string;
  index: number;
  active: boolean;
  reduce: boolean;
}) {
  return (
    <motion.div
      className="relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-black/20 ring-1 ring-white/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)]"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: active ? 1 : 0.65, y: 0, scale: active ? 1.03 : 0.98 }}
      transition={{ delay: reduce ? 0 : 0.15 + index * 0.14, duration: 0.45 }}
    >
      <div className="relative h-full min-h-0 w-full">
        <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      </div>
      <p className="absolute bottom-2 left-2 right-2 rounded-md bg-black/55 px-2 py-1.5 text-center font-sans text-xs font-semibold uppercase tracking-wide text-white">
        {label}
      </p>
    </motion.div>
  );
}

function SceneSolution({ reduce }: { reduce: boolean }) {
  const kits = [
    { src: SHOTS.dining, label: "Reusable plates" },
    { src: SHOTS.solution, label: "Bamboo cutlery" },
    { src: SHOTS.hero, label: "Cloth decor" },
  ] as const;
  const [activeKit, setActiveKit] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActiveKit((i) => (i + 1) % kits.length);
    }, 1800);
    return () => clearInterval(id);
  }, [reduce, kits.length]);

  return (
    <motion.div
      className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-br from-[#faf7f0] via-[#f0ebe0] to-[#e2dccf] px-[4%] py-[5%]"
      {...sceneTransition}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_0%,rgba(125,155,118,0.18),transparent_50%)]" />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="mb-3 shrink-0 text-center">
          <h2 className="mt-1 font-display text-[clamp(1.35rem,3.5vw,2.35rem)] text-forest-deep">
            “Introducing {BRAND_NAME} – sustainable event kits designed for a greener future.”
          </h2>
          <p className="mx-auto mt-2 max-w-2xl font-sans text-xs leading-relaxed text-forest-deep/70 sm:text-sm">
            Clean, aesthetic eco-friendly setup.
          </p>
        </div>

        <div className="mb-4 flex shrink-0 flex-wrap items-center justify-center gap-2 sm:gap-3">
          {kits.map((kit, idx) => (
            <motion.span
              key={kit.label}
              className="rounded-full border border-forest-deep/20 bg-white/60 px-3 py-1 text-xs font-medium text-forest-deep"
              animate={{ opacity: reduce || idx === activeKit ? 1 : 0.4 }}
            >
              {kit.label}
            </motion.span>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-2 sm:gap-3">
          {kits.map((kit, i) => (
            <KitCard key={kit.src + kit.label} {...kit} index={i} active={i === activeKit} reduce={reduce} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SceneLifestyle({ reduce }: { reduce: boolean }) {
  const chips = ["Weddings", "College fests", "Birthdays", "Campus events"] as const;
  return (
    <motion.div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#0f1a12] px-[6%] py-[7%]"
      {...sceneTransition}
    >
      <AdCinematicShell>
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1, 1.07], x: [0, -12] }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <Image
            src={SHOTS.hero}
            alt=""
            fill
            className="object-cover brightness-[0.72] saturate-125"
            sizes="100vw"
            priority
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(125,155,118,0.15), transparent 40%, rgba(155,196,146,0.08), transparent 70%)",
          }}
          animate={reduce ? {} : { rotate: [0, 360] }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/15" />
        <div className="relative z-50 flex w-full max-w-4xl flex-col items-center text-center">
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.75rem)] leading-tight text-cream">
            “From weddings to college fests, make every event stylish, reusable, and responsible.”
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            {chips.map((c, i) => (
              <motion.span
                key={c}
                className="rounded-full border border-moss/35 bg-moss/10 px-4 py-2 font-sans text-xs font-medium text-cream sm:text-sm"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 0.12 + i * 0.08 }}
              >
                {c}
              </motion.span>
            ))}
          </div>
          <motion.div className="mt-10 grid w-full max-w-2xl grid-cols-5 gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="h-16 rounded-t-full bg-white/28"
                animate={reduce ? {} : { y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 + i * 0.2, delay: i * 0.08 }}
              />
            ))}
          </motion.div>
        </div>
      </AdCinematicShell>
    </motion.div>
  );
}

function SceneClose({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#eef4ea] via-cream to-[#dde8d6] px-[6%] py-[7%]"
      {...sceneTransition}
    >
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { scale: [1, 1.05] }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <Image
          src={SHOTS.dining}
          alt=""
          fill
          className="object-cover opacity-25 blur-[1px]"
          sizes="100vw"
          priority
        />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40"
        animate={reduce ? {} : { scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 120%, rgba(125,155,118,0.35), transparent 55%)",
        }}
      />
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <SiteLogo src="/brand/logo-zero-trace.png" alt={BRAND_NAME} size={80} animate={!reduce} />
        <span className="mt-4 font-display text-[clamp(2rem,6vw,3.25rem)] text-forest-deep">
          {BRAND_NAME}
        </span>
        <p className="mt-4 font-display text-lg leading-snug text-forest-deep/88 sm:text-xl md:text-2xl">
          “{BRAND_NAME} – {TAGLINE}”
        </p>
        <motion.div className="mt-8" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-forest-deep px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-xl shadow-forest-deep/25 transition-colors hover:bg-moss hover:text-forest-deep sm:text-sm"
          >
            Book now
          </Link>
        </motion.div>
        <p className="mt-6 font-sans text-[11px] tracking-wide text-forest-deep/45">zero-trace-web-eta.vercel.app</p>
      </div>
    </motion.div>
  );
}

export function BrandAdPlayer() {
  const reduce = useReducedMotion();
  const searchParams = useSearchParams();
  const hideChrome = searchParams.get("record") === "1";
  const autoStart = true;

  const tl = useSceneTimeline({ reduceMotion: !!reduce, autoStart, hideChrome });

  const progress = useMemo(() => {
    let elapsed = 0;
    for (let i = 0; i < tl.scene; i++) elapsed += SCENE_MS[i as SceneIndex];
    return (elapsed / TOTAL_MS) * 100;
  }, [tl.scene]);

  const { playing, pause, play, finished, restart } = tl;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (playing) pause();
        else if (finished) restart();
        else play();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, finished, pause, play, restart]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-3 py-6 sm:px-4">
      {!hideChrome && (
        <div className="mb-4 flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 text-cream-muted/90">
          <div>
            <h1 className="font-display text-lg text-cream sm:text-xl">
              Zero Trace ad · 16:9
            </h1>
            <p className="text-xs text-cream-muted/60">
              ~{TOTAL_MS / 1000}s · follows your 5-scene script · Space to play/pause
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {reduce && (
              <span className="rounded-md bg-moss/20 px-2 py-1 text-xs text-moss-bright">
                Reduced motion: use Prev / Next
              </span>
            )}
            <button
              type="button"
              className="rounded-lg bg-moss px-3 py-1.5 text-sm font-medium text-forest-deep hover:bg-moss-bright"
              onClick={() => (tl.playing ? tl.pause() : tl.finished ? tl.restart() : tl.play())}
            >
              {tl.finished ? "Replay" : tl.playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              className="rounded-lg border border-cream/20 px-3 py-1.5 text-sm text-cream hover:bg-white/10"
              onClick={tl.restart}
            >
              From start
            </button>
            {reduce && (
              <>
                <button
                  type="button"
                  className="rounded-lg border border-cream/20 px-3 py-1.5 text-sm text-cream hover:bg-white/10"
                  onClick={tl.prevManual}
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-cream/20 px-3 py-1.5 text-sm text-cream hover:bg-white/10"
                  onClick={tl.nextManual}
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="relative w-full max-w-[min(100vw-1.5rem,177.78vh)] overflow-hidden rounded-lg shadow-2xl ring-1 ring-white/10">
        <div className="relative aspect-video w-full bg-forest-deep">
          <AnimatePresence mode="wait">
            {tl.scene === 0 && <SceneProblem key="s0" reduce={!!reduce} />}
            {tl.scene === 1 && <SceneAwareness key="s1" reduce={!!reduce} />}
            {tl.scene === 2 && <SceneSolution key="s2" reduce={!!reduce} />}
            {tl.scene === 3 && <SceneLifestyle key="s3" reduce={!!reduce} />}
            {tl.scene === 4 && <SceneClose key="s4" reduce={!!reduce} />}
          </AnimatePresence>
        </div>
        {!hideChrome && (
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-black/40"
            aria-hidden
          >
            <motion.div
              className="h-full bg-moss/90"
              style={{ width: `${tl.finished ? 100 : progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        )}
      </div>

      {!hideChrome && (
        <p className="mt-4 max-w-xl text-center text-xs leading-relaxed text-cream-muted/55">
          Script sequence: Problem → Pollution → Solution → Happy usage → Logo + CTA. Record:{" "}
          <code className="rounded bg-white/10 px-1 text-cream-muted/80">/ad?record=1</code>{" "}
          then add VO and music in post.
        </p>
      )}
    </div>
  );
}

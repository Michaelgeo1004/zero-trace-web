import type { Metadata } from "next";
import { Suspense } from "react";
import { BrandAdPlayer } from "@/components/ad/BrandAdPlayer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Brand film (16:9)",
  description: `${site.name} animated storyboard for YouTube and web — picture-first; add audio in post.`,
  robots: { index: false, follow: true },
};

function AdFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-cream-muted">
      Loading…
    </div>
  );
}

export default function AdPage() {
  return (
    <Suspense fallback={<AdFallback />}>
      <BrandAdPlayer />
    </Suspense>
  );
}

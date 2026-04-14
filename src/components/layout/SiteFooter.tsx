import { SiteLogo } from "@/components/brand/SiteLogo";
import { site } from "@/content/site";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mode-section border-t py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <SiteLogo
              src={site.assets.logo}
              alt={`${site.name} logo`}
              size={40}
              animate={false}
            />
            <p className="mode-text font-display text-2xl">{site.name}</p>
          </div>
          <p className="mode-muted mt-3 max-w-md text-sm leading-relaxed">
            {site.footer.mission}
          </p>
          <p className="mode-muted mt-4 text-xs leading-relaxed opacity-80">
            {site.program}
          </p>
        </div>
        <div className="mode-muted flex flex-col gap-3 text-sm">
          <p className="mode-accent text-xs uppercase tracking-widest">
            Links
          </p>
          <Link
            href={site.links.landing}
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Canva landing page
          </Link>
          <Link
            href={site.links.pitchVideo}
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Pitch video
          </Link>
          <p className="pt-2 text-xs opacity-80">{site.footer.mentor}</p>
        </div>
      </div>
      <p className="mode-muted mx-auto mt-12 max-w-6xl px-4 text-center text-xs opacity-60 md:px-6">
        © {new Date().getFullYear()} {site.name}. MBA venture coursework.
      </p>
    </footer>
  );
}

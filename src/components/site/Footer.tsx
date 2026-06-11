import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-card/40 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full gradient-hero-bg shadow-glow">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-semibold">Waste2Worth</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              The smart recycling marketplace turning everyday waste into worth — for people and the planet.
            </p>
          </div>
          {[
            { title: "Product", links: ["Marketplace", "Sell waste", "Pricing", "Roadmap"] },
            { title: "Company", links: ["About", "Impact", "Press", "Careers"] },
            { title: "Resources", links: ["Help center", "Guides", "Contact", "Privacy"] },
          ].map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold">{c.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) => <li key={l}><a className="hover:text-foreground" href="#">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Waste2Worth. All rights reserved.</p>
          <p>Built for a cleaner, circular economy 🌿</p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(1200px,calc(100%-2rem))] -translate-x-1/2">
      <nav className="glass flex items-center justify-between rounded-full px-5 py-3 shadow-elegant">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full gradient-hero-bg shadow-glow">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Waste2Worth</span>
        </Link>
        <div className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#categories" className="hover:text-foreground transition-colors">Categories</a>
          <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/auth" className="hidden rounded-full px-4 py-2 text-sm font-medium hover:bg-accent sm:inline-flex">
            Sign in
          </Link>
          <Link
            to="/marketplace"
            className="rounded-full gradient-hero-bg px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Launch app
          </Link>
        </div>
      </nav>
    </header>
  );
}

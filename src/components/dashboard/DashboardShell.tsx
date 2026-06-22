import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Leaf, LayoutDashboard, Package, MessageCircle, BarChart3, Wallet, Settings, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";

const navByRole = {
  seller: [
    { to: "/seller", label: "Overview", icon: LayoutDashboard },
    { to: "/seller/listings", label: "My listings", icon: Package },
    { to: "/seller-offers", label: "Offers", icon: MessageCircle },
    { to: "/seller-analytics", label: "Analytics", icon: BarChart3 },
    { to: "/seller/wallet", label: "Wallet", icon: Wallet },
  ],
  buyer: [
  { to: "/marketplace", label: "Marketplace", icon: LayoutDashboard },
  { to: "/buyer-offers", label: "My Offers", icon: MessageCircle },
  ],
  admin: [
    { to: "/admin", label: "Overview", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: Package },
    { to: "/admin/transactions", label: "Transactions", icon: Wallet },
    { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  ],
} as const;

export function DashboardShell({ role, title, children }: { role: keyof typeof navByRole; title: string; children: ReactNode }) {
  const path = useRouterState({ select: r => r.location.pathname });
  const items = navByRole[role];
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => { await signOut(); navigate({ to: "/auth" }); };

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border/60 bg-card/40 backdrop-blur-xl p-5 md:flex md:flex-col">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full gradient-hero-bg shadow-glow">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-semibold">Waste2Worth</span>
        </Link>

        <div className="mt-3 inline-flex w-fit items-center rounded-full glass px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {role} portal
        </div>

        <nav className="mt-8 flex-1 space-y-1">
          {items.map(i => {
            const active = path === i.to;
            return (
              <a key={i.to} href={i.to} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${active ? "gradient-eco-bg text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>
                <i.icon className="h-4 w-4" /> {i.label}
              </a>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-border/60 pt-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
            <Settings className="h-4 w-4" /> Settings
          </button>
          <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground">Welcome back — here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground sm:block">
              Eco score · <span className="gradient-text font-bold">A+</span>
            </div>
            <div className="h-10 w-10 rounded-full gradient-eco-bg shadow-glow" />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

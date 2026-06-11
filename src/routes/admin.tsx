import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Users, Recycle, Wallet, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Waste2Worth" }] }),
  component: Admin,
});

type Activity = { id: string; title: string; category: string; price_inr: number; created_at: string };

function Admin() {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ users: 0, listings: 0, txns: 0, gmv: 0, kg: 0 });
  const [recent, setRecent] = useState<Activity[]>([]);
  const [catShare, setCatShare] = useState<{ name: string; pct: number; color: string }[]>([]);

  useEffect(() => {
    if (!loading && (!user || role !== "admin")) navigate({ to: "/auth" });
  }, [user, role, loading, navigate]);

  useEffect(() => {
    if (role !== "admin") return;
    (async () => {
      const [{ count: users }, { count: listings }, { data: txns }, { data: allListings }, { data: recentRows }] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("listings").select("id", { count: "exact", head: true }),
        supabase.from("transactions").select("final_price_inr"),
        supabase.from("listings").select("category, quantity_kg"),
        supabase.from("listings").select("id, title, category, price_inr, created_at").order("created_at", { ascending: false }).limit(8),
      ]);
      const gmv = (txns ?? []).reduce((s, t) => s + Number(t.final_price_inr || 0), 0);
      const kg = (allListings ?? []).reduce((s, l) => s + Number(l.quantity_kg || 0), 0);
      setCounts({ users: users ?? 0, listings: listings ?? 0, txns: (txns ?? []).length, gmv, kg });
      setRecent((recentRows ?? []) as Activity[]);

      const buckets = new Map<string, number>();
      (allListings ?? []).forEach(l => buckets.set(l.category, (buckets.get(l.category) ?? 0) + Number(l.quantity_kg || 1)));
      const total = Array.from(buckets.values()).reduce((a, b) => a + b, 0) || 1;
      const palette: Record<string, string> = {
        "E-Waste": "from-emerald-400 to-cyan-500",
        Plastic: "from-cyan-400 to-blue-500",
        Metal: "from-teal-400 to-emerald-600",
        Paper: "from-lime-400 to-emerald-500",
        Glass: "from-sky-400 to-cyan-600",
        Cardboard: "from-amber-300 to-lime-500",
      };
      setCatShare(Array.from(buckets.entries()).map(([name, v]) => ({
        name, pct: Math.round((v / total) * 100), color: palette[name] ?? "from-emerald-400 to-cyan-500",
      })).sort((a, b) => b.pct - a.pct));
    })();
  }, [role]);

  const stats = [
    { label: "Total users", value: counts.users.toLocaleString("en-IN"), trend: "registered", icon: Users },
    { label: "Listings", value: counts.listings.toLocaleString("en-IN"), trend: "all-time", icon: Recycle },
    { label: "GMV", value: `₹ ${counts.gmv.toLocaleString("en-IN")}`, trend: `${counts.txns} txns`, icon: Wallet },
    { label: "Recycled", value: `${Math.round(counts.kg)} kg`, trend: "total volume", icon: Leaf },
  ];

  const bars = [42, 68, 55, 80, 72, 90, 64, 78, 88, 95, 70, 84];

  return (
    <DashboardShell role="admin" title="Platform overview">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-3xl glass p-5 shadow-elegant transition-all hover:-translate-y-1 hover:shadow-glow">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl gradient-eco-bg text-primary-foreground shadow-glow"><s.icon className="h-5 w-5" /></span>
              <span className="text-xs font-semibold text-primary">{s.trend}</span>
            </div>
            <p className="mt-5 font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl glass p-6 shadow-elegant lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Volume (12 months)</h2>
            <span className="text-xs text-muted-foreground">indicative</span>
          </div>
          <div className="mt-6 flex h-56 items-end gap-3">
            {bars.map((h,i) => (
              <div key={i} className="group relative flex-1 rounded-t-xl gradient-hero-bg transition-all hover:opacity-90" style={{height:`${h}%`}}>
                <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md glass px-2 py-0.5 text-[10px] font-semibold group-hover:block">{h*12}t</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m=><span key={m}>{m}</span>)}
          </div>
        </section>

        <section className="rounded-3xl glass p-6 shadow-elegant">
          <h2 className="font-display text-xl font-semibold">Category share</h2>
          <div className="mt-6 space-y-4">
            {catShare.length === 0 ? (
              <p className="text-xs text-muted-foreground">No listings yet.</p>
            ) : catShare.map(c => (
              <div key={c.name}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted-foreground">{c.pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full bg-gradient-to-r ${c.color}`} style={{width:`${c.pct}%`}} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-3xl glass p-6 shadow-elegant">
        <h2 className="font-display text-xl font-semibold">Recent activity</h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border/60">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3">Item</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">When</th></tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No recent activity</td></tr>
              ) : recent.map(r => (
                <tr key={r.id} className="border-t border-border/60 hover:bg-accent/40">
                  <td className="px-4 py-3 font-medium">{r.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.category}</td>
                  <td className="px-4 py-3">₹ {Number(r.price_inr).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
}

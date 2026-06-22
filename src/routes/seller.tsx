import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Upload, Recycle, TrendingUp, Leaf, Plus, Trash2, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/seller")({
  head: () => ({ meta: [{ title: "Seller dashboard — Waste2Worth" }] }),
  component: SellerDashboard,
});

type Listing = {
  id: string;
  title: string;
  category: string;
  price_inr: number;
  quantity_kg: number;
  status: string;
  description: string | null;
  user_id: string;
  created_at: string;
};

const CATEGORIES = ["E-Waste", "Plastic", "Metal", "Paper", "Glass", "Cardboard"];

function SellerDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [offersCount, setOffersCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<Listing | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("E-Waste");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const refresh = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) { toast.error(error.message); return; }
    setListings(data as Listing[]);

    const ids = (data ?? []).map(l => l.id);
    if (ids.length) {
      const { count } = await supabase
        .from("offers")
        .select("id", { count: "exact", head: true })
        .in("listing_id", ids)
        .eq("status", "pending");
      setOffersCount(count ?? 0);
    } else setOffersCount(0);
  };

  useEffect(() => { void refresh(); }, [user?.id]);

  const resetForm = () => {
    setTitle(""); setCategory("E-Waste"); setPrice(""); setQty(""); setEditing(null);
  };

  const submitListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title || !price) { toast.error("Title and price are required"); return; }
    setBusy(true);
    try {
      let imageUrl = null;

if (image) {
  const fileName = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;

  const { error: uploadError } = await supabase.storage
    .from("listings")
    .upload(fileName, image);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("listings")
    .getPublicUrl(fileName);

  imageUrl = data.publicUrl;
}
      const payload = {
  title,
  category,
  price_inr: Number(price) || 0,
  quantity_kg: Number(qty) || 0,
  user_id: user.id,
  status: "live",
  image_url: imageUrl,
};
      if (editing) {
        const { error } = await supabase.from("listings").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("Listing updated");
      } else {
        const { error } = await supabase.from("listings").insert(payload);
        if (error) throw error;
        toast.success("Listing published");
      }
      resetForm();
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally { setBusy(false); }
  };

  const startEdit = (l: Listing) => {
    setEditing(l);
    setTitle(l.title); setCategory(l.category);
    setPrice(String(l.price_inr)); setQty(String(l.quantity_kg));
  };

  const removeListing = async (id: string) => {
    if (!confirm("Delete this listing?")) return;
    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    await refresh();
  };

  const totalEarnings = listings
    .filter(l => l.status === "sold")
    .reduce((s, l) => s + Number(l.price_inr), 0);
  const activeCount = listings.filter(l => l.status === "live" || l.status === "negotiating").length;
  const co2Saved = listings.reduce((s, l) => s + Number(l.quantity_kg) * 1.2, 0);

  const stats = [
    { label: "Total earnings", value: `₹ ${totalEarnings.toLocaleString("en-IN")}`, trend: "from sales", icon: TrendingUp },
    { label: "Active listings", value: String(activeCount), trend: `${listings.length} total`, icon: Recycle },
    { label: "CO₂ saved", value: `${Math.round(co2Saved)} kg`, trend: "estimated", icon: Leaf },
    { label: "Pending offers", value: String(offersCount), trend: "awaiting", icon: Upload },
  ];

  return (
    <DashboardShell role="seller" title="Seller overview">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="group rounded-3xl glass p-5 shadow-elegant transition-all hover:-translate-y-1 hover:shadow-glow">
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
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Your listings</h2>
            <span className="text-xs text-muted-foreground">{listings.length} total</span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="px-4 py-3">Item</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Qty</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th></tr>
              </thead>
              <tbody>
                {listings.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No listings yet. Create your first one →</td></tr>
                )}
                {listings.map(l => (
                  <tr key={l.id} className="border-t border-border/60 transition-colors hover:bg-accent/40">
                    <td className="px-4 py-3 font-medium">{l.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.category}</td>
                    <td className="px-4 py-3 font-semibold">₹ {Number(l.price_inr).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3">{l.quantity_kg} kg</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${l.status==="live"?"bg-emerald-500/15 text-emerald-600":l.status==="sold"?"bg-muted text-muted-foreground":"bg-cyan-500/15 text-cyan-600"}`}>{l.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button onClick={() => startEdit(l)} className="rounded-lg p-1.5 hover:bg-accent" aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => removeListing(l.id)} className="rounded-lg p-1.5 hover:bg-destructive/10 hover:text-destructive" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl glass p-6 shadow-elegant">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">{editing ? "Edit listing" : "Upload new waste"}</h2>
            {editing && (
              <button onClick={resetForm} className="rounded-full p-1 hover:bg-accent" aria-label="Cancel"><X className="h-4 w-4" /></button>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{editing ? "Update the details below." : "Add details to publish a new listing."}</p>

          <div className="mt-5 grid place-items-center rounded-2xl border-2 border-dashed border-border bg-background/50 p-8 text-center">
  <Upload className="h-8 w-8 text-primary" />

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files?.[0] || null)}
    className="mt-3"
  />

  {image && (
    <p className="mt-2 text-sm text-emerald-600">
      Selected: {image.name}
    </p>
  )}
</div>

          <form onSubmit={submitListing} className="mt-5 space-y-3">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Item name" className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
            <div className="grid grid-cols-2 gap-3">
              <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input value={price} onChange={e=>setPrice(e.target.value)} type="number" placeholder="Expected price ₹" className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm" />
            </div>
            <input value={qty} onChange={e=>setQty(e.target.value)} type="number" placeholder="Quantity (kg)" className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm" />
            <button disabled={busy} type="submit" className="flex w-full items-center justify-center gap-2 rounded-full gradient-hero-bg py-2.5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-70">
              {editing ? "Save changes" : "Publish listing"} <Plus className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>

      <section className="mt-8 rounded-3xl gradient-hero-bg p-8 text-primary-foreground shadow-elegant">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">Your environmental impact</span>
            <h3 className="mt-2 font-display text-3xl font-bold">You've saved {Math.round(co2Saved)} kg of CO₂ 🌿</h3>
            <p className="mt-1 text-white/80 text-sm">Based on {listings.reduce((s,l) => s + Number(l.quantity_kg), 0)} kg of recyclables listed.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              {v: String(Math.round(co2Saved / 22)), l: "Trees"},
              {v: `${Math.round(co2Saved)}kg`, l: "CO₂"},
              {v: `${listings.reduce((s,l) => s + Number(l.quantity_kg), 0)}kg`, l: "Recycled"},
            ].map(i=>(
              <div key={i.l} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20">
                <p className="font-display text-2xl font-bold">{i.v}</p>
                <p className="text-xs text-white/80">{i.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}

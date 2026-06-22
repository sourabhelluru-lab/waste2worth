import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, MessageCircle, Send, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace — Waste2Worth" }] }),
  component: Marketplace,
});

type Listing = {
  id: string;
  title: string;
  category: string;
  price_inr: number;
  quantity_kg: number;
  user_id: string;
  status: string;
  image_url: string | null;
};

const cats = ["All", "E-Waste", "Paper", "Plastic", "Metal", "Glass", "Cardboard"];
const gradFor = (cat: string) => ({
  "E-Waste": "from-emerald-400 to-cyan-500",
  Cardboard: "from-amber-300 to-lime-500",
  Metal: "from-teal-400 to-emerald-600",
  Plastic: "from-cyan-400 to-blue-500",
  Glass: "from-sky-400 to-cyan-600",
  Paper: "from-lime-400 to-emerald-500",
}[cat] ?? "from-emerald-400 to-cyan-500");

function Marketplace() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Listing[]>([]);
  const [open, setOpen] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("status", "live")
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      else setItems((data ?? []) as Listing[]);
      setLoading(false);
    })();
  }, []);

  const filtered = items.filter(i =>
    (active === "All" || i.category === active) &&
    (!query || i.title.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl font-bold">Marketplace</h1>
            <p className="mt-1 text-sm text-muted-foreground">Browse verified recyclable listings and start negotiating.</p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search materials, sellers…" className="w-full rounded-full border border-border bg-card/60 pl-11 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map(c => (
            <button key={c} onClick={()=>setActive(c)} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${active===c ? "gradient-hero-bg text-primary-foreground shadow-glow" : "glass hover:bg-accent"}`}>{c}</button>
          ))}
        </div>

        {loading ? (
          <div className="mt-16 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">No listings match your filters yet.</p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(it => (
              <article key={it.id} className="group overflow-hidden rounded-3xl glass shadow-elegant transition-all hover:-translate-y-1 hover:shadow-glow">
                <div className="relative h-44">
  <img
    src={it.image_url || ""}
    alt={it.title}
    className="h-full w-full object-cover"
  />

  <span className="absolute left-4 top-4 rounded-full bg-black/30 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
    {it.category}
  </span>
</div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{it.title}</h3>
                      <p className="text-xs text-muted-foreground">{it.quantity_kg} kg</p>
                    </div>
                    <p className="font-display text-lg font-bold gradient-text">₹{Number(it.price_inr).toLocaleString("en-IN")}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={()=>setOpen(it)} className="flex-1 rounded-full gradient-hero-bg py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">Place offer</button>
                    <button onClick={()=>setOpen(it)} className="rounded-full glass p-2 hover:bg-accent"><MessageCircle className="h-4 w-4" /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {open && <NegotiationModal item={open} onClose={()=>setOpen(null)} />}
    </div>
  );
}

function NegotiationModal({ item, onClose }: { item: Listing; onClose: () => void }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [offerPrice, setOfferPrice] = useState(String(Math.round(item.price_inr * 0.9)));
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ id: string; from: "you" | "seller"; text: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("offers")
        .select("id, offered_price_inr, message, buyer_id, created_at")
        .eq("listing_id", item.id)
        .eq("buyer_id", user.id)
        .order("created_at", { ascending: true });
      setHistory(
        (data ?? []).map(o => ({
          id: o.id,
          from: "you" as const,
          text: `₹${o.offered_price_inr}${o.message ? " — " + o.message : ""}`,
        }))
      );
    })();
  }, [user?.id, item.id]);

  const placeOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please sign in"); navigate({ to: "/auth" }); return; }
    if (user.id === item.user_id) { toast.error("You cannot bid on your own listing"); return; }
    const price = Number(offerPrice);
    if (!price) { toast.error("Enter a valid price"); return; }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("offers")
      .insert({ listing_id: item.id, buyer_id: user.id, offered_price_inr: price, message: input || null, status: "pending" })
      .select()
      .single();
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Offer sent");
    setHistory(h => [...h, { id: data!.id, from: "you", text: `₹${price}${input ? " — " + input : ""}` }]);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm animate-fade-up">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl glass shadow-elegant">
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <div>
            <p className="text-xs text-muted-foreground">Negotiating</p>
            <h3 className="font-semibold">{item.title}</h3>
          </div>
          <button onClick={onClose} className="rounded-full px-3 py-1 text-sm hover:bg-accent">Close</button>
        </div>

        <div className="max-h-80 space-y-3 overflow-y-auto p-5">
          <div className="rounded-2xl glass px-4 py-2.5 text-sm">
            Listed at ₹{Number(item.price_inr).toLocaleString("en-IN")} for {item.quantity_kg} kg.
          </div>
          {history.length === 0 ? (
            <p className="text-center text-xs text-muted-foreground">No offers yet. Make the first one!</p>
          ) : history.map(m => (
            <div key={m.id} className={`flex ${m.from==="you"?"justify-end":""}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from==="you" ? "gradient-hero-bg text-primary-foreground shadow-glow" : "glass"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={placeOffer} className="border-t border-border/60 p-4 space-y-2">
          <div className="flex gap-2">
            <input value={offerPrice} onChange={e=>setOfferPrice(e.target.value)} type="number" placeholder="Your price ₹" className="w-32 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Message (optional)…" className="flex-1 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
            <button disabled={submitting} className="rounded-full gradient-hero-bg p-2.5 text-primary-foreground shadow-glow disabled:opacity-70">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

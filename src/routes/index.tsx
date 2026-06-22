import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Recycle, Leaf, Cpu, Newspaper, Wine, Box, Package, Sparkles,
  TrendingUp, Users, Globe2, MessageCircle, Shield, Zap, Star
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waste2Worth — Turn Waste Into Worth" },
      { name: "description", content: "A smart recycling marketplace where sellers list recyclable waste and recyclers negotiate to buy — driving real environmental impact." },
      { property: "og:title", content: "Waste2Worth — Turn Waste Into Worth" },
      { property: "og:description", content: "Smart recycling marketplace with live bargaining, carbon tracking, and a premium dashboard experience." },
    ],
  }),
  component: Landing,
});

const categories = [
  { name: "E-Waste", icon: Cpu, gradient: "from-emerald-400 to-cyan-500", desc: "Phones, laptops, circuits" },
  { name: "Paper", icon: Newspaper, gradient: "from-lime-400 to-emerald-500", desc: "Newspaper, books, sheets" },
  { name: "Plastic", icon: Package, gradient: "from-cyan-400 to-blue-500", desc: "PET, HDPE, bottles" },
  { name: "Metal", icon: Box, gradient: "from-teal-400 to-emerald-600", desc: "Aluminium, iron, copper" },
  { name: "Glass", icon: Wine, gradient: "from-sky-400 to-cyan-600", desc: "Bottles, jars, cullet" },
  { name: "Cardboard", icon: Package, gradient: "from-amber-300 to-lime-500", desc: "Boxes, packaging" },
];

const stats = [
  { value: "12,480", label: "Tons recycled", icon: Recycle },
  { value: "48,210", label: "Active members", icon: Users },
  { value: "9,320", label: "CO₂ tons saved", icon: Globe2 },
  { value: "₹4.2 Cr+", label: "Earnings paid", icon: TrendingUp },
];

const features = [
  { icon: MessageCircle, title: "Live bargaining", desc: "Chat-style negotiation with counter-offers and transparent history." },
  { icon: Shield, title: "Verified traders", desc: "Trusted buyers and sellers with ratings, KYC and dispute resolution." },
  { icon: Zap, title: "Instant payouts", desc: "Get paid the moment a deal is accepted — no waiting, no friction." },
  { icon: Globe2, title: "Carbon tracking", desc: "Every transaction is scored for CO₂ saved, trees rescued and impact." },
];

const steps = [
  { n: "01", title: "List your waste", desc: "Snap photos, set a price, pick a category — your listing goes live instantly." },
  { n: "02", title: "Negotiate offers", desc: "Verified recyclers send offers. Counter, chat, and settle in our live bargaining room." },
  { n: "03", title: "Get paid & track impact", desc: "Accept a deal, complete pickup, and watch your environmental impact grow." },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-20 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--eco-emerald)] opacity-30 blur-3xl animate-glow-pulse" />
          <div className="absolute top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-[color:var(--eco-cyan)] opacity-30 blur-3xl animate-glow-pulse" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              The smart recycling marketplace
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Turn <span className="gradient-text">Waste</span><br />Into <span className="gradient-text">Worth</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              List recyclables, negotiate live with verified buyers, and watch every kilogram translate into earnings and measurable climate impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth" className="group inline-flex items-center gap-2 rounded-full gradient-hero-bg px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                Sell waste <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/marketplace" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-accent">
                Browse marketplace
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-5">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`h-9 w-9 rounded-full border-2 border-background bg-gradient-to-br ${["from-emerald-400 to-cyan-500","from-lime-400 to-emerald-600","from-cyan-400 to-blue-500","from-teal-400 to-emerald-500"][i-1]}`} />
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({length:5}).map((_,i)=><Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="mt-1">Trusted by 48k+ recyclers & 1,200+ businesses</p>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] gradient-hero-bg opacity-30 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-border/60 shadow-elegant">
              <img src={heroImg} alt="Eco-tech recycling visualization" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden glass rounded-2xl p-4 shadow-elegant sm:block animate-float">
              <p className="text-xs text-muted-foreground">CO₂ saved today</p>
              <p className="font-display text-2xl font-bold gradient-text">+ 1.2 t</p>
            </div>
            <div className="absolute -top-6 -right-6 hidden glass rounded-2xl p-4 shadow-elegant sm:block animate-float" style={{animationDelay:"-2s"}}>
              <p className="text-xs text-muted-foreground">Live offer</p>
              <p className="font-display text-2xl font-bold">₹ 2,480 <span className="text-sm text-primary">+18%</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid gap-4 rounded-3xl glass p-6 shadow-elegant sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-2xl p-4 transition-all hover:bg-accent/40">
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-eco-bg text-primary-foreground shadow-glow">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto mt-32 max-w-7xl px-6">
        <SectionHeading eyebrow="How it works" title="Three steps from waste to worth" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="group relative overflow-hidden rounded-3xl glass p-7 shadow-elegant transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-500/30 blur-2xl transition-opacity group-hover:opacity-100" />
              <span className="font-display text-5xl font-bold gradient-text">{s.n}</span>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              {i < 2 && <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto mt-32 max-w-7xl px-6">
        <SectionHeading eyebrow="Waste categories" title="Trade every kind of recyclable" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
  <Link
    key={c.name}
    to="/education/recycling-guide"
    className="group relative overflow-hidden rounded-3xl glass p-6 shadow-elegant transition-all hover:-translate-y-2 hover:shadow-glow block cursor-pointer"
  >
    <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${c.gradient} text-white shadow-glow`}>
      <c.icon className="h-7 w-7" />
    </div>

    <h3 className="mt-5 text-xl font-semibold">{c.name}</h3>

    <p className="mt-1 text-sm text-muted-foreground">
      {c.desc}
    </p>

    <div className={`absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-gradient-to-br ${c.gradient} opacity-20 blur-2xl transition-all group-hover:scale-150`} />
  </Link>
))}
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="mx-auto mt-32 max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] gradient-hero-bg p-10 text-primary-foreground shadow-elegant sm:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 80% 20%, white, transparent 40%), radial-gradient(circle at 10% 80%, white, transparent 40%)"}} />
          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                <Leaf className="h-3.5 w-3.5" /> Environmental impact
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
                Every trade plants a measurable footprint of good.
              </h2>
              <p className="mt-4 max-w-md text-white/80">
                We compute trees saved, CO₂ avoided and landfill diverted on every transaction — turning your activity into a living impact score.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "32,400", l: "Trees saved" },
                { v: "9,320 t", l: "CO₂ reduced" },
                { v: "12,480 t", l: "Waste recycled" },
                { v: "A+", l: "Eco score" },
              ].map(i => (
                <div key={i.l} className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl ring-1 ring-white/20">
                  <p className="font-display text-3xl font-bold">{i.v}</p>
                  <p className="mt-1 text-sm text-white/80">{i.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto mt-32 max-w-7xl px-6">
        <SectionHeading eyebrow="Platform features" title="Engineered like a real product" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(f => (
            <div key={f.title} className="rounded-3xl glass p-6 shadow-elegant transition-all hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-eco-bg text-primary-foreground shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto mt-32 max-w-7xl px-6">
        <SectionHeading eyebrow="Loved by the community" title="What our users say" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { n: "Ananya P.", r: "Seller, Bengaluru", t: "I cleared 60kg of e-waste in a week. The bargaining chat made it feel like a real trade." },
            { n: "GreenCycle Ltd.", r: "Recycler, Mumbai", t: "Sourcing has never been this transparent. The dashboard analytics are next level." },
            { n: "Rahul K.", r: "Seller, Delhi", t: "Beautiful product. Felt like using a Series-A SaaS, not a recycling app." },
          ].map(q => (
            <div key={q.n} className="rounded-3xl glass p-7 shadow-elegant">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({length:5}).map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed">"{q.t}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-eco-bg" />
                <div>
                  <p className="text-sm font-semibold">{q.n}</p>
                  <p className="text-xs text-muted-foreground">{q.r}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-32 max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] glass p-12 text-center shadow-elegant">
          <div className="absolute inset-0 -z-10 gradient-hero-bg opacity-10" />
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Ready to turn waste into <span className="gradient-text">worth?</span></h2>
          <p className="mt-4 text-muted-foreground">Join thousands of sellers and recyclers building the circular economy.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/auth" className="rounded-full gradient-hero-bg px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">Get started free</Link>
            <Link to="/marketplace" className="rounded-full glass px-7 py-3 text-sm font-semibold hover:bg-accent">Explore marketplace</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-primary" /> {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
    </div>
  );
}

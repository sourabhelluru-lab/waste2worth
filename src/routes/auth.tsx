import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Leaf, ArrowRight, Store, Recycle, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth, roleHome, type AppRole } from "@/hooks/use-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Waste2Worth" }] }),
  component: AuthPage,
});

const roles: { id: AppRole; title: string; desc: string; icon: typeof Store }[] = [
  { id: "seller", title: "Seller", desc: "List recyclable waste", icon: Recycle },
  { id: "buyer", title: "Buyer", desc: "Source materials & bid", icon: Store },
  { id: "admin", title: "Admin", desc: "Operate the platform", icon: ShieldCheck },
];

function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<AppRole>("seller");
  const [showPw, setShowPw] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp, user, role: currentRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && currentRole !== null) {
      navigate({ to: roleHome(currentRole) });
    }
  }, [user, currentRole, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (mode === "register") {
        if (!fullName.trim()) { toast.error("Please enter your full name"); return; }
        const { error } = await signUp(email, password, fullName, role);
        if (error) { toast.error(error); return; }
        toast.success("Account created! Redirecting…");
        navigate({ to: roleHome(role) });
      } else {
        const { error } = await signIn(email, password);
        if (error) { toast.error(error); return; }
        toast.success("Welcome back!");
        // role-based redirect handled by useEffect once role loads
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[color:var(--eco-emerald)] opacity-30 blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full bg-[color:var(--eco-cyan)] opacity-30 blur-3xl animate-glow-pulse" />
      </div>

      <Link to="/" className="mb-8 inline-flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full gradient-hero-bg shadow-glow">
          <Leaf className="h-5 w-5 text-primary-foreground" />
        </span>
        <span className="font-display text-lg font-semibold">Waste2Worth</span>
      </Link>

      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <h1 className="font-display text-5xl font-bold leading-tight">
            Welcome to the <span className="gradient-text">circular</span> economy.
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Sign in to list waste, place offers, negotiate live, and track your environmental footprint in real time.
          </p>
          <div className="mt-8 space-y-3">
            {["Live chat-style bargaining", "Verified buyers & instant payouts", "Carbon impact dashboard"].map(t => (
              <div key={t} className="flex items-center gap-3 rounded-2xl glass p-3 text-sm">
                <span className="grid h-8 w-8 place-items-center rounded-lg gradient-eco-bg text-primary-foreground"><Leaf className="h-4 w-4" /></span>
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl glass p-7 shadow-elegant animate-fade-up">
          <div className="grid grid-cols-3 gap-2">
            {roles.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`rounded-2xl border p-3 text-left transition-all ${role===r.id ? "border-transparent gradient-eco-bg text-primary-foreground shadow-glow" : "border-border hover:bg-accent"}`}
              >
                <r.icon className="h-5 w-5" />
                <p className="mt-2 text-sm font-semibold">{r.title}</p>
                <p className={`text-[11px] ${role===r.id ? "text-white/80" : "text-muted-foreground"}`}>{r.desc}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 flex rounded-full bg-muted p-1 text-sm font-medium">
            {(["login","register"] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded-full py-2 capitalize transition-all ${mode===m ? "gradient-hero-bg text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
              >
                {m === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {mode === "register" && (
              <Field label="Full name" type="text" placeholder="Ananya Patel" value={fullName} onChange={setFullName} />
            )}
            <Field label="Email" type="email" placeholder="you@waste2worth.app" value={email} onChange={setEmail} />
            <div className="relative">
              <Field label="Password" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={setPassword} />
              <button type="button" onClick={()=>setShowPw(v=>!v)} className="absolute right-3 top-9 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {mode === "login" && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="accent-[color:var(--primary)]" /> Remember me
                </label>
                <a href="#" className="font-medium text-primary hover:underline">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-2 rounded-full gradient-hero-bg py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === "login" ? "Sign in" : "Create account"} as {role}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to our Terms & Privacy.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, placeholder, value, onChange }: { label: string; type: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={type !== "checkbox"}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}

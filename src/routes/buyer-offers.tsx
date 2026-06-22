import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Clock, CheckCircle, XCircle, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/buyer-offers")({
  component: BuyerOffers,
});

type Offer = {
  id: string;
  offered_price_inr: number;
  message: string | null;
  status: string;
  created_at: string;
};

function BuyerOffers() {
  const { user } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadOffers = async () => {
      const { data } = await supabase
        .from("offers")
        .select("*")
        .eq("buyer_id", user.id)
        .order("created_at", { ascending: false });

      setOffers((data as Offer[]) || []);
      setLoading(false);
    };

    loadOffers();
  }, [user]);

  const badgeStyle = (status: string) => {
    if (status === "accepted")
      return "bg-emerald-500/15 text-emerald-600";

    if (status === "rejected")
      return "bg-red-500/15 text-red-600";

    return "bg-amber-500/15 text-amber-600";
  };

  const statusIcon = (status: string) => {
    if (status === "accepted")
      return <CheckCircle className="h-4 w-4" />;

    if (status === "rejected")
      return <XCircle className="h-4 w-4" />;

    return <Clock className="h-4 w-4" />;
  };

  return (
    <DashboardShell role="buyer" title="My Offers">
      <div className="space-y-5">
        {loading ? (
          <div className="rounded-3xl glass p-8 text-center">
            Loading offers...
          </div>
        ) : offers.length === 0 ? (
          <div className="rounded-3xl glass p-8 text-center">
            No offers placed yet.
          </div>
        ) : (
          offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-3xl glass p-6 shadow-elegant"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-2xl font-bold">
                      {offer.offered_price_inr}
                    </h2>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {offer.message || "No message"}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(offer.created_at).toLocaleString()}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold capitalize ${badgeStyle(
                    offer.status
                  )}`}
                >
                  {statusIcon(offer.status)}
                  {offer.status}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardShell>
  );
}
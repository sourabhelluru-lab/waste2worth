import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { CheckCircle, XCircle, IndianRupee, MessageSquare, Clock } from "lucide-react";

export const Route = createFileRoute("/seller-offers")({
  component: SellerOffers,
});

type Offer = {
  id: string;
  listing_id: string;
  buyer_id: string;
  offered_price_inr: number;
  message: string | null;
  status: string;
  created_at: string;
};

function SellerOffers() {
  const { user } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOffers = async () => {
    if (!user) return;

    setLoading(true);

    const { data: listings } = await supabase
      .from("listings")
      .select("id")
      .eq("user_id", user.id);

    if (!listings || listings.length === 0) {
      setOffers([]);
      setLoading(false);
      return;
    }

    const listingIds = listings.map((l) => l.id);

    const { data } = await supabase
      .from("offers")
      .select("*")
      .in("listing_id", listingIds)
      .order("created_at", { ascending: false });

    setOffers((data as Offer[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    loadOffers();
  }, [user]);

  const updateStatus = async (
    offerId: string,
    status: "accepted" | "rejected"
  ) => {
    const { error } = await supabase
      .from("offers")
      .update({ status })
      .eq("id", offerId);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`Offer ${status}`);
    await loadOffers();
  };

  const badgeStyle = (status: string) => {
    if (status === "accepted")
      return "bg-emerald-500/15 text-emerald-600";
    if (status === "rejected")
      return "bg-red-500/15 text-red-600";

    return "bg-amber-500/15 text-amber-600";
  };

  return (
    <DashboardShell role="seller" title="Offers">
      <div className="space-y-5">
        {loading ? (
          <div className="rounded-3xl glass p-8 text-center">
            Loading offers...
          </div>
        ) : offers.length === 0 ? (
          <div className="rounded-3xl glass p-8 text-center">
            No offers received yet.
          </div>
        ) : (
          offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-3xl glass p-6 shadow-elegant transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-2xl font-bold">
                      {Number(offer.offered_price_inr).toLocaleString("en-IN")}
                    </h2>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    {offer.message || "No message provided"}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(offer.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeStyle(
                      offer.status
                    )}`}
                  >
                    {offer.status}
                  </span>

                  {offer.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateStatus(offer.id, "accepted")
                        }
                        className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(offer.id, "rejected")
                        }
                        className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardShell>
  );
}


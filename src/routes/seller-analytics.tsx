import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  Package,
  IndianRupee,
  Clock,
  CheckCircle,
  Recycle,
  Leaf,
} from "lucide-react";

export const Route = createFileRoute("/seller-analytics")({
  component: SellerAnalytics,
});

function SellerAnalytics() {
    const { user } = useAuth();

const [totalListings, setTotalListings] = useState(0);
const [potentialRevenue, setPotentialRevenue] = useState(0);
const [pendingOffers, setPendingOffers] = useState(0);
const [acceptedOffers, setAcceptedOffers] = useState(0);
const [wasteListed, setWasteListed] = useState(0);
useEffect(() => {
  if (!user) return;

  const loadAnalytics = async () => {
    const { data: listings } = await supabase
      .from("listings")
      .select("*")
      .eq("user_id", user.id);

    if (!listings) return;

    setTotalListings(listings.length);

    const revenue = listings.reduce(
      (sum, item) => sum + Number(item.price_inr),
      0
    );

    setPotentialRevenue(revenue);

    const waste = listings.reduce(
      (sum, item) => sum + Number(item.quantity_kg),
      0
    );

    setWasteListed(waste);

    const listingIds = listings.map((l) => l.id);

    if (listingIds.length > 0) {
      const { data: offers } = await supabase
        .from("offers")
        .select("*")
        .in("listing_id", listingIds);

      if (offers) {
        setPendingOffers(
          offers.filter((o) => o.status === "pending").length
        );

        setAcceptedOffers(
          offers.filter((o) => o.status === "accepted").length
        );
      }
    }
  };

  loadAnalytics();
}, [user]);
  const stats = [
  {
    title: "Total Listings",
    value: String(totalListings),
    icon: Package,
  },
  {
    title: "Potential Revenue",
    value: `₹${potentialRevenue.toLocaleString("en-IN")}`,
    icon: IndianRupee,
  },
  {
    title: "Accepted Offers",
    value: String(acceptedOffers),
    icon: CheckCircle,
  },
  {
    title: "Pending Offers",
    value: String(pendingOffers),
    icon: Clock,
  },
  {
    title: "Waste Listed",
    value: `${wasteListed} kg`,
    icon: Recycle,
  },
  {
    title: "CO₂ Saved",
    value: `${Math.round(wasteListed * 1.2)} kg`,
    icon: Leaf,
  },
];

  return (
    <DashboardShell role="seller" title="Analytics">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl glass p-6 shadow-elegant hover:shadow-glow transition-all"
          >
            <div className="flex items-center justify-between">
              <item.icon className="h-8 w-8 text-primary" />
            </div>

            <h3 className="mt-4 text-sm text-muted-foreground">
              {item.title}
            </h3>

            <p className="mt-2 text-3xl font-bold">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl glass p-6 shadow-elegant">
        <h2 className="text-xl font-semibold">
          Seller Performance Overview
        </h2>

        <p className="mt-3 text-muted-foreground">
          Analytics from your listings, offers, revenue, and environmental
          impact will appear here.
        </p>
      </div>
    </DashboardShell>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { CheckCircle, IndianRupee, Package } from "lucide-react";

export const Route = createFileRoute("/buyer-orders")({
  component: BuyerOrders,
});

type Order = {
  id: string;
  offered_price_inr: number;
  message: string | null;
  created_at: string;
};

function BuyerOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadOrders = async () => {
      const { data } = await supabase
        .from("offers")
        .select("*")
        .eq("buyer_id", user.id)
        .eq("status", "accepted")
        .order("created_at", { ascending: false });

      setOrders((data as Order[]) || []);
      setLoading(false);
    };

    loadOrders();
  }, [user]);

  return (
    <DashboardShell role="buyer" title="My Orders">
      <div className="space-y-5">
        {loading ? (
          <div className="rounded-3xl glass p-8 text-center">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl glass p-8 text-center">
            No accepted orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl glass p-6 shadow-elegant"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="font-semibold">
                      Order #{order.id.slice(0, 8)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-primary" />
                    <span className="font-bold text-lg">
                      {Number(order.offered_price_inr).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {order.message || "No message"}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-emerald-600 font-semibold">
                  <CheckCircle className="h-4 w-4" />
                  Accepted
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardShell>
  );
}
// src/seller/pages/SellerOrders.tsx
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: any;
}

type FilterStatus = "all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const STATUS_COLORS: Record<string, string> = {
  pending:    { bg: "#fff8e1", text: "#f59e0b" } as any,
  processing: { bg: "#e8f4fd", text: "#3b82f6" } as any,
  shipped:    { bg: "#f0fdf4", text: "#22c55e" } as any,
  delivered:  { bg: "#f0fdf4", text: "#16a34a" } as any,
  cancelled:  { bg: "#fef2f2", text: "#ef4444" } as any,
};

const getStatusStyle = (status: string) => {
  const s = STATUS_COLORS[status] || { bg: "#f3f4f6", text: "#6b7280" };
  return {
    backgroundColor: (s as any).bg,
    color: (s as any).text,
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
    fontSize: "0.8rem",
    fontWeight: 600,
    textTransform: "capitalize" as const,
  };
};

const SellerOrders = ({ onSelectOrder }: { onSelectOrder: (order: Order) => void }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>("all");

  useEffect(() => {
    // onSnapshot gives real-time updates — new orders appear instantly
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(orderList);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  const filteredOrders = filter === "all"
    ? orders
    : orders.filter((o) => o.status === filter);

  const filterTabs: FilterStatus[] = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-KE", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading orders...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>Orders</h2>
      <p style={{ color: "#888", marginBottom: "1.5rem" }}>
        {orders.length} total order{orders.length !== 1 ? "s" : ""}
      </p>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "999px",
              border: "1px solid",
              borderColor: filter === tab ? "#1a1a1a" : "#ddd",
              backgroundColor: filter === tab ? "#1a1a1a" : "white",
              color: filter === tab ? "white" : "#555",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: filter === tab ? 600 : 400,
              textTransform: "capitalize",
            }}
          >
            {tab}
            {tab !== "all" && (
              <span style={{ marginLeft: "0.4rem", opacity: 0.7 }}>
                ({orders.filter((o) => o.status === tab).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <p style={{ color: "#888", textAlign: "center", padding: "3rem" }}>
          No {filter !== "all" ? filter : ""} orders found.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9", textAlign: "left" }}>
                {["Order ID", "Customer", "Items", "Total", "Date", "Status", "Action"].map((h) => (
                  <th key={h} style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #eee", fontWeight: 600, color: "#444" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <td style={{ padding: "0.85rem 1rem", color: "#888", fontSize: "0.78rem" }}>
                    #{order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                      <div style={{ fontWeight: 500 }}>
                        {order.customer?.firstName} {order.customer?.lastName}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#888" }}>
                        {order.customer?.email}
                      </div>
                  </td>
                  <td style={{ padding: "0.85rem 1rem", color: "#555" }}>
                    {order.items?.length ?? 0} item{order.items?.length !== 1 ? "s" : ""}
                  </td>
                  <td style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>
                    KES {order.total?.toLocaleString()}
                  </td>
                  <td style={{ padding: "0.85rem 1rem", color: "#888", fontSize: "0.82rem" }}>
                    {formatDate(order.createdAt)}
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <span style={getStatusStyle(order.status)}>{order.status}</span>
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <button
                      onClick={() => onSelectOrder(order)}
                      style={{
                        padding: "0.4rem 0.9rem",
                        backgroundColor: "#1a1a1a",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.82rem",
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
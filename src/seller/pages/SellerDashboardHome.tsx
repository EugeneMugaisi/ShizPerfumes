// src/seller/pages/SellerDashboardHome.tsx
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
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
  };
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: any;
}

const StatCard = ({
  label,
  value,
  subtitle,
  color = "#1a1a1a",
}: {
  label: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}) => (
  <div style={{
    backgroundColor: "white", borderRadius: "12px",
    padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    flex: 1, minWidth: "160px",
  }}>
    <p style={{ margin: "0 0 0.5rem", fontSize: "0.82rem", color: "#888", fontWeight: 500 }}>
      {label}
    </p>
    <h2 style={{ margin: "0 0 0.25rem", fontSize: "1.75rem", color, fontWeight: 700 }}>
      {value}
    </h2>
    {subtitle && (
      <p style={{ margin: 0, fontSize: "0.78rem", color: "#aaa" }}>{subtitle}</p>
    )}
  </div>
);

const SellerDashboardHome = ({ onNavigateToOrders }: { onNavigateToOrders: () => void }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [newOrderAlert, setNewOrderAlert] = useState(false);
  const [prevOrderCount, setPrevOrderCount] = useState<number | null>(null);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];

      // Detect new orders after initial load
      if (prevOrderCount !== null && orderList.length > prevOrderCount) {
        setNewOrderAlert(true);
        // Play a subtle browser notification if permitted
        if (Notification.permission === "granted") {
          new Notification("🛍️ New Order!", {
            body: `A new order just came in from ${orderList[0]?.customer?.firstName || "a customer"}!`,
          });
        }
        // Auto dismiss alert after 8 seconds
        setTimeout(() => setNewOrderAlert(false), 8000);
      }

      setPrevOrderCount(orderList.length);
      setOrders(orderList);
      setLoading(false);
    });

    // Request browser notification permission
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => unsubscribe();
  }, [prevOrderCount]);

  // Computed stats
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const todayOrders = orders.filter((o) => {
    if (!o.createdAt) return false;
    const date = o.createdAt.toDate ? o.createdAt.toDate() : new Date(o.createdAt);
    return date.toDateString() === new Date().toDateString();
  });

  // Best selling product
  const productSales: Record<string, number> = {};
  orders
    .filter((o) => o.status !== "cancelled")
    .forEach((order) => {
      order.items?.forEach((item) => {
        productSales[item.name] = (productSales[item.name] || 0) + (item.quantity || 1);
      });
    });
  const bestSeller = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0];

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-KE", {
      day: "numeric", month: "short",
      hour: "2-digit", minute: "2-digit",
    });
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading dashboard...</p>;

  return (
    <div style={{ padding: "2rem" }}>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ margin: "0 0 0.25rem" }}>Dashboard</h2>
        <p style={{ color: "#888", margin: 0, fontSize: "0.88rem" }}>
          Welcome back! Here's what's happening with Shiz Perfumes today.
        </p>
      </div>

      {/* New Order Alert Banner */}
      {newOrderAlert && (
        <div style={{
          backgroundColor: "#f0fdf4", border: "1px solid #86efac",
          borderRadius: "10px", padding: "1rem 1.25rem",
          marginBottom: "1.5rem", display: "flex",
          justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.5rem" }}>🛍️</span>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: "#16a34a" }}>New order just came in!</p>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#4ade80" }}>
                A customer just placed a new order.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToOrders}
            style={{
              padding: "0.5rem 1rem", backgroundColor: "#16a34a",
              color: "white", border: "none", borderRadius: "8px",
              cursor: "pointer", fontSize: "0.85rem", fontWeight: 600,
            }}
          >
            View Order →
          </button>
        </div>
      )}

      {/* Stat Cards */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        <StatCard
          label="Total Revenue"
          value={`KES ${totalRevenue.toLocaleString()}`}
          subtitle="Excluding cancelled orders"
        />
        <StatCard
          label="Pending Orders"
          value={pendingOrders.length}
          subtitle="Awaiting action"
          color={pendingOrders.length > 0 ? "#f59e0b" : "#1a1a1a"}
        />
        <StatCard
          label="Orders Today"
          value={todayOrders.length}
          subtitle={new Date().toLocaleDateString("en-KE", { weekday: "long", day: "numeric", month: "short" })}
        />
        <StatCard
          label="Total Orders"
          value={orders.length}
          subtitle="All time"
        />
      </div>

      {/* Best Seller + Order Status Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>

        {/* Best Seller */}
        <div style={{
          backgroundColor: "white", borderRadius: "12px",
          padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <h4 style={{ margin: "0 0 1rem", color: "#444" }}>🏆 Best Selling Fragrance</h4>
          {bestSeller ? (
            <div>
              <p style={{ margin: "0 0 0.4rem", fontWeight: 700, fontSize: "1.1rem" }}>
                {bestSeller[0]}
              </p>
              <p style={{ margin: 0, color: "#888", fontSize: "0.88rem" }}>
                {bestSeller[1]} unit{bestSeller[1] !== 1 ? "s" : ""} sold
              </p>
            </div>
          ) : (
            <p style={{ color: "#aaa", margin: 0 }}>No sales data yet.</p>
          )}
        </div>

        {/* Order Status Breakdown */}
        <div style={{
          backgroundColor: "white", borderRadius: "12px",
          padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <h4 style={{ margin: "0 0 1rem", color: "#444" }}>📦 Orders by Status</h4>
          {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => {
            const count = orders.filter((o) => o.status === status).length;
            const colors: Record<string, string> = {
              pending: "#f59e0b", processing: "#3b82f6",
              shipped: "#22c55e", delivered: "#16a34a", cancelled: "#ef4444",
            };
            return (
              <div key={status} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: "0.6rem",
              }}>
                <span style={{
                  textTransform: "capitalize", fontSize: "0.88rem", color: "#555"
                }}>
                  {status}
                </span>
                <span style={{
                  backgroundColor: colors[status] + "22",
                  color: colors[status],
                  padding: "0.15rem 0.65rem",
                  borderRadius: "999px", fontSize: "0.82rem", fontWeight: 600,
                }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{
        backgroundColor: "white", borderRadius: "12px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
      }}>
        <div style={{
          padding: "1.25rem 1.5rem", borderBottom: "1px solid #f0f0f0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <h4 style={{ margin: 0, color: "#444" }}>🕐 Recent Orders</h4>
          <button
            onClick={onNavigateToOrders}
            style={{
              padding: "0.4rem 0.9rem", backgroundColor: "white",
              color: "#555", border: "1px solid #ddd", borderRadius: "6px",
              cursor: "pointer", fontSize: "0.82rem",
            }}
          >
            View All
          </button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              {["Order ID", "Customer", "Total", "Date", "Status"].map((h) => (
                <th key={h} style={{
                  padding: "0.75rem 1rem", textAlign: "left",
                  color: "#666", fontWeight: 600, borderBottom: "1px solid #eee",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "0.85rem 1rem", color: "#888", fontSize: "0.78rem" }}>
                  #{order.id.slice(0, 8).toUpperCase()}
                </td>
                <td style={{ padding: "0.85rem 1rem", fontWeight: 500 }}>
                  {order.customer?.firstName} {order.customer?.lastName}
                </td>
                <td style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>
                  KES {order.total?.toLocaleString()}
                </td>
                <td style={{ padding: "0.85rem 1rem", color: "#888", fontSize: "0.82rem" }}>
                  {formatDate(order.createdAt)}
                </td>
                <td style={{ padding: "0.85rem 1rem" }}>
                  <span style={{
                    padding: "0.2rem 0.65rem", borderRadius: "999px",
                    fontSize: "0.78rem", fontWeight: 600, textTransform: "capitalize",
                    backgroundColor: {
                      pending: "#fff8e1", processing: "#e8f4fd",
                      shipped: "#f0fdf4", delivered: "#dcfce7", cancelled: "#fef2f2",
                    }[order.status] || "#f3f4f6",
                    color: {
                      pending: "#f59e0b", processing: "#3b82f6",
                      shipped: "#22c55e", delivered: "#16a34a", cancelled: "#ef4444",
                    }[order.status] || "#6b7280",
                  }}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p style={{ textAlign: "center", padding: "2rem", color: "#aaa" }}>
            No orders yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SellerDashboardHome;
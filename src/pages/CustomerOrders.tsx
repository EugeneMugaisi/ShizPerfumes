// src/pages/CustomerOrders.tsx
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useCustomerAuth } from "../context/CustomerAuthContext";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: any;
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending:    { bg: "#fff8e1", text: "#f59e0b" },
  processing: { bg: "#e8f4fd", text: "#3b82f6" },
  shipped:    { bg: "#f0fdf4", text: "#22c55e" },
  delivered:  { bg: "#dcfce7", text: "#16a34a" },
  cancelled:  { bg: "#fef2f2", text: "#ef4444" },
};

const CustomerOrders = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { currentUser } = useCustomerAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("customer.uid", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-KE", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <p>Please log in to view your orders.</p>
        <button
          onClick={() => onNavigate('account')}
          style={{
            padding: "0.75rem 1.5rem", backgroundColor: "#1a1a1a",
            color: "white", border: "none", borderRadius: "8px",
            cursor: "pointer", marginTop: "1rem",
          }}
        >
          Log In
        </button>
      </div>
    );
  }

  if (loading) return <p style={{ padding: "2rem" }}>Loading your orders...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>My Orders</h2>
      <p style={{ color: "#888", marginBottom: "2rem" }}>
        {orders.length} order{orders.length !== 1 ? "s" : ""} found
      </p>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", backgroundColor: "white", borderRadius: "12px" }}>
          <p style={{ color: "#888", marginBottom: "1rem" }}>You have not placed any orders yet.</p>
          <button
            onClick={() => onNavigate('shop')}
            style={{
              padding: "0.75rem 1.5rem", backgroundColor: "#1a1a1a",
              color: "white", border: "none", borderRadius: "8px", cursor: "pointer",
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {orders.map((order) => {
            const statusStyle = STATUS_COLORS[order.status] || { bg: "#f3f4f6", text: "#6b7280" };
            return (
              <div key={order.id} style={{
                backgroundColor: "white", borderRadius: "12px",
                padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div>
                    <p style={{ margin: "0 0 0.25rem", fontWeight: 700, fontSize: "0.95rem" }}>
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p style={{ margin: 0, color: "#888", fontSize: "0.82rem" }}>
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <span style={{
                    backgroundColor: statusStyle.bg, color: statusStyle.text,
                    padding: "0.25rem 0.85rem", borderRadius: "999px",
                    fontSize: "0.8rem", fontWeight: 600, textTransform: "capitalize",
                    alignSelf: "flex-start",
                  }}>
                    {order.status}
                  </span>
                </div>

                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "1rem" }}>
                  {order.items?.map((item, index) => (
                    <div key={index} style={{
                      display: "flex", justifyContent: "space-between",
                      fontSize: "0.88rem", marginBottom: "0.4rem",
                    }}>
                      <span style={{ color: "#444" }}>{item.name} × {item.quantity}</span>
                      <span style={{ fontWeight: 500 }}>KES {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    borderTop: "1px solid #f0f0f0", paddingTop: "0.75rem",
                    marginTop: "0.5rem", fontWeight: 700,
                  }}>
                    <span>Total</span>
                    <span>KES {order.total?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
// src/seller/pages/SellerOrderDetail.tsx
import { useState } from "react";
import { doc, updateDoc, increment, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { sendStatusUpdateEmail } from "../services/emailService";

interface OrderItem {
  id: number;
  firebaseId?: string;
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

const STATUS_FLOW = ["pending", "processing", "shipped", "delivered"];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending:    { bg: "#fff8e1", text: "#f59e0b" },
  processing: { bg: "#e8f4fd", text: "#3b82f6" },
  shipped:    { bg: "#f0fdf4", text: "#22c55e" },
  delivered:  { bg: "#dcfce7", text: "#16a34a" },
  cancelled:  { bg: "#fef2f2", text: "#ef4444" },
};

const SellerOrderDetail = ({
  order,
  onBack,
}: {
  order: Order;
  onBack: () => void;
}) => {
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-KE", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  const handleStatusUpdate = async (newStatus: string) => {
    setUpdating(true);
    setSuccessMessage("");
    try {
      // If moving to "shipped", decrement stock
      if (newStatus === "shipped" && currentStatus !== "shipped") {
        for (const item of order.items) {
          let productRef = null;
          
          if (item.firebaseId) {
            productRef = doc(db, "products", item.firebaseId);
          } else if (item.id) {
            // Fallback: Find by numeric ID
            const q = query(collection(db, "products"), where("id", "==", item.id));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
              productRef = doc(db, "products", snapshot.docs[0].id);
            }
          }

          if (productRef) {
            try {
              const productSnap = await getDoc(productRef);
              if (productSnap.exists()) {
                await updateDoc(productRef, {
                  stock: increment(-item.quantity)
                });
              }
            } catch (err) {
              console.error(`Error updating stock for product ${item.name}:`, err);
            }
          }
        }
      }

      const orderRef = doc(db, "orders", order.id);
      await updateDoc(orderRef, {
        status: newStatus,
        ...(trackingNumber && { trackingNumber }),
        updatedAt: new Date(),
      });

      await sendStatusUpdateEmail(order, newStatus);

      setCurrentStatus(newStatus);
      setSuccessMessage(`✅ Order status updated to "${newStatus}" successfully!`);
    } catch (error) {
      console.error("Error updating status:", error);
      setSuccessMessage("❌ Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      await handleStatusUpdate("cancelled");
    }
  };

  const statusStyle = STATUS_COLORS[currentStatus] || { bg: "#f3f4f6", text: "#6b7280" };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={onBack}
          style={{
            padding: "0.4rem 1rem", backgroundColor: "white",
            border: "1px solid #ddd", borderRadius: "6px",
            cursor: "pointer", fontSize: "0.85rem",
          }}
        >
          ← Back
        </button>
        <div>
          <h2 style={{ margin: 0 }}>
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h2>
          <p style={{ margin: "0.25rem 0 0", color: "#888", fontSize: "0.85rem" }}>
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <span style={{
          marginLeft: "auto",
          backgroundColor: statusStyle.bg,
          color: statusStyle.text,
          padding: "0.35rem 1rem",
          borderRadius: "999px",
          fontSize: "0.85rem",
          fontWeight: 600,
          textTransform: "capitalize",
        }}>
          {currentStatus}
        </span>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div style={{
          padding: "0.85rem 1rem", borderRadius: "8px", marginBottom: "1.5rem",
          backgroundColor: successMessage.startsWith("✅") ? "#f0fdf4" : "#fef2f2",
          color: successMessage.startsWith("✅") ? "#16a34a" : "#ef4444",
          fontSize: "0.9rem",
        }}>
          {successMessage}
        </div>
      )}

      {/* Two Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>

        {/* Customer Info */}
        <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <h4 style={{ margin: "0 0 1rem", color: "#444" }}>Customer Details</h4>
          <InfoRow label="Name" value={`${order.customer?.firstName} ${order.customer?.lastName}`} />
          <InfoRow label="Email" value={order.customer?.email} />
          <InfoRow label="Phone" value={order.customer?.phone} />
        </div>

        {/* Delivery Info */}
        <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <h4 style={{ margin: "0 0 1rem", color: "#444" }}>Delivery Address</h4>
          <InfoRow label="Address" value={order.customer?.address} />
          <InfoRow label="City" value={order.customer?.city} />
          <InfoRow label="Country" value={order.customer?.country} />
        </div>
      </div>

      {/* Order Items */}
      <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
        <h4 style={{ margin: "0 0 1rem", color: "#444" }}>Items Ordered</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              {["Product", "Price", "Qty", "Subtotal"].map((h) => (
                <th key={h} style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "#666", fontWeight: 600, borderBottom: "1px solid #eee" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "0.75rem" }}>{item.name}</td>
                <td style={{ padding: "0.75rem", color: "#555" }}>KES {item.price?.toLocaleString()}</td>
                <td style={{ padding: "0.75rem", color: "#555" }}>{item.quantity}</td>
                <td style={{ padding: "0.75rem", fontWeight: 600 }}>
                  KES {(item.price * item.quantity)?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ padding: "0.75rem", textAlign: "right", fontWeight: 700, color: "#333" }}>
                Total
              </td>
              <td style={{ padding: "0.75rem", fontWeight: 700, fontSize: "1rem" }}>
                KES {order.total?.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Status Update */}
      {currentStatus !== "cancelled" && currentStatus !== "delivered" && (
        <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
          <h4 style={{ margin: "0 0 1rem", color: "#444" }}>Update Order Status</h4>

          {/* Progress Bar */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {STATUS_FLOW.map((status, index) => {
              const currentIndex = STATUS_FLOW.indexOf(currentStatus);
              const isPast = index <= currentIndex;
              return (
                <div key={status} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{
                    height: "6px", borderRadius: "3px", marginBottom: "0.4rem",
                    backgroundColor: isPast ? "#1a1a1a" : "#e5e7eb",
                  }} />
                  <span style={{
                    fontSize: "0.72rem", textTransform: "capitalize",
                    color: isPast ? "#1a1a1a" : "#9ca3af",
                    fontWeight: isPast ? 600 : 400,
                  }}>
                    {status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Tracking Number Input */}
          {currentStatus === "processing" && (
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 500 }}>
                Tracking Number (optional)
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. DHL1234567"
                style={{
                  width: "100%", padding: "0.6rem", border: "1px solid #ddd",
                  borderRadius: "6px", fontSize: "0.9rem", boxSizing: "border-box",
                }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {STATUS_FLOW.map((status) => {
              const currentIndex = STATUS_FLOW.indexOf(currentStatus);
              const statusIndex = STATUS_FLOW.indexOf(status);
              const isNext = statusIndex === currentIndex + 1;

              if (!isNext) return null;

              return (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  disabled={updating}
                  style={{
                    padding: "0.65rem 1.5rem",
                    backgroundColor: "#1a1a1a",
                    color: "white", border: "none",
                    borderRadius: "8px", cursor: updating ? "not-allowed" : "pointer",
                    fontSize: "0.9rem", opacity: updating ? 0.7 : 1,
                    textTransform: "capitalize",
                  }}
                >
                  {updating ? "Updating..." : `Mark as ${status}`}
                </button>
              );
            })}

            <button
              onClick={handleCancel}
              disabled={updating}
              style={{
                padding: "0.65rem 1.5rem",
                backgroundColor: "white", color: "#ef4444",
                border: "1px solid #ef4444", borderRadius: "8px",
                cursor: updating ? "not-allowed" : "pointer",
                fontSize: "0.9rem", opacity: updating ? 0.7 : 1,
              }}
            >
              Cancel Order
            </button>
          </div>
        </div>
      )}

      {/* Completed/Cancelled State */}
      {(currentStatus === "delivered" || currentStatus === "cancelled") && (
        <div style={{
          backgroundColor: currentStatus === "delivered" ? "#f0fdf4" : "#fef2f2",
          borderRadius: "10px", padding: "1.25rem 1.5rem",
          color: currentStatus === "delivered" ? "#16a34a" : "#ef4444",
          fontWeight: 500, fontSize: "0.95rem",
        }}>
          {currentStatus === "delivered"
            ? "✅ This order has been delivered successfully."
            : "❌ This order has been cancelled."}
        </div>
      )}
    </div>
  );
};

// Reusable info row component
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem", fontSize: "0.88rem" }}>
    <span style={{ color: "#888" }}>{label}</span>
    <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "60%" }}>{value || "—"}</span>
  </div>
);

export default SellerOrderDetail;
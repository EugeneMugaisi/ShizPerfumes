// src/seller/pages/SellerDashboard.tsx
import { useState } from "react";
import { auth } from "../../firebase";
import SellerOrders from "./SellerOrders";
import SellerOrderDetail from "./SellerOrderDetail";
import SellerInventory from "./SellerInventory";
import SellerDashboardHome from "./SellerDashboardHome";
import { useInactivityLogout } from "../hooks/useInactivityLogout";
import InactivityWarning from "../components/InactivityWarning";

type SellerView = "orders" | "inventory" | "dashboard";

const SellerDashboard = () => {
  const [currentView, setCurrentView] = useState<SellerView>("dashboard");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { showWarning, secondsLeft, resetTimers, handleLogout } = useInactivityLogout();

  const navItems: { label: string; view: SellerView }[] = [
    { label: "Dashboard", view: "dashboard" },
    { label: "Orders", view: "orders" },
    { label: "Inventory", view: "inventory" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7", display: "flex" }}>
       {/* Inactivity Warning Modal */}
        {showWarning && (
          <InactivityWarning
            secondsLeft={secondsLeft}
            onStayLoggedIn={resetTimers}
            onLogout={handleLogout}
          />
        )}
      {/* Sidebar */}
      <div style={{
        width: "220px", backgroundColor: "#1a1a1a", color: "white",
        display: "flex", flexDirection: "column", padding: "1.5rem 0", flexShrink: 0
      }}>
        <div style={{ padding: "0 1.5rem 2rem" }}>
          <h3 style={{ margin: 0, fontSize: "1rem", color: "white" }}>Shiz Perfumes</h3>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.75rem", color: "#888" }}>Seller Portal</p>
        </div>

        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => { setCurrentView(item.view); setSelectedOrder(null); }}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: currentView === item.view ? "#333" : "transparent",
              color: currentView === item.view ? "white" : "#aaa",
              border: "none", textAlign: "left", cursor: "pointer",
              fontSize: "0.9rem", fontWeight: currentView === item.view ? 600 : 400,
            }}
          >
            {item.label}
          </button>
        ))}

        <div style={{ marginTop: "auto", padding: "0 1.5rem" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%", padding: "0.6rem", backgroundColor: "transparent",
              color: "#aaa", border: "1px solid #444", borderRadius: "6px",
              cursor: "pointer", fontSize: "0.85rem",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {currentView === "orders" && (
          <>
            {selectedOrder ? (
              <SellerOrderDetail
                order={selectedOrder}
                onBack={() => setSelectedOrder(null)}
              />
            ) : (
              <SellerOrders onSelectOrder={(order) => setSelectedOrder(order)} />
            )}
          </>
        )}
        {currentView === "inventory" && <SellerInventory />}
        {currentView === "dashboard" && (
          <SellerDashboardHome
            onNavigateToOrders={() => {
              setSelectedOrder(null);
              setCurrentView("orders");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
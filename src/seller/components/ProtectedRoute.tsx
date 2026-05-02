// src/seller/components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSellerAuth } from "../SellerAuthContext";
import SellerLogin from "../pages/SellerLogin";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { currentUser, loading } = useSellerAuth();
  const [isSeller, setIsSeller] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSellerRole = async () => {
      if (!currentUser) {
        setIsSeller(false);
        setChecking(false);
        return;
      }

      try {
        // Check if this user exists in the users collection with role = seller
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (userDoc.exists() && userDoc.data().role === "seller") {
          setIsSeller(true);
        } else {
          // User is logged in but NOT in users collection or not a seller
          setIsSeller(false);
          console.warn("Access denied — not a seller account");
        }
      } catch (error) {
        console.error("Error checking seller role:", error);
        setIsSeller(false);
      } finally {
        setChecking(false);
      }
    };

    if (!loading) {
      checkSellerRole();
    }
  }, [currentUser, loading]);

  // Still checking role
  if (loading || checking) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}>
        <p style={{ color: "#888" }}>Verifying access...</p>
      </div>
    );
  }

  // Not logged in or not a seller
  if (!currentUser || !isSeller) {
    return <SellerLogin />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
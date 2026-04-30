// src/seller/SellerAuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const SellerAuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

export const SellerAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        console.warn("Seller auth loading timed out");
        setLoading(false);
      }
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      clearTimeout(safetyTimeout);
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(safetyTimeout);
    }; // cleanup on unmount
  }, []);

  return (
    <SellerAuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </SellerAuthContext.Provider>
  );
};

export const useSellerAuth = () => useContext(SellerAuthContext);
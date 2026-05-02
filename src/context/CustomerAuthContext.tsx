// src/context/CustomerAuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

interface CustomerProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: any;
}

interface CustomerAuthContextType {
  currentUser: User | null;
  customerProfile: CustomerProfile | null;
  loading: boolean;
}

const CustomerAuthContext = createContext<CustomerAuthContextType>({
  currentUser: null,
  customerProfile: null,
  loading: true,
});

export const CustomerAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        console.warn("Customer auth loading timed out");
        setLoading(false);
      }
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      clearTimeout(safetyTimeout);
      setCurrentUser(user);

      if (user) {
        // Fetch customer profile from Firestore
        const q = query(
          collection(db, "customers"),
          where("uid", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setCustomerProfile(snapshot.docs[0].data() as CustomerProfile);
        } else {
          setCustomerProfile({
            uid: user.uid,
            name: user.displayName || user.email?.split('@')[0] || 'Customer',
            email: user.email || '',
          });
        }
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <CustomerAuthContext.Provider value={{ currentUser, customerProfile, loading }}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => useContext(CustomerAuthContext);
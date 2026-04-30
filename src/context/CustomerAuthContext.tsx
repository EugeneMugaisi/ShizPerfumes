// src/context/CustomerAuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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
        const profileDoc = await getDoc(doc(db, "customers", user.uid));
        if (profileDoc.exists()) {
          setCustomerProfile(profileDoc.data() as CustomerProfile);
        }
      } else {
        setCustomerProfile(null);
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
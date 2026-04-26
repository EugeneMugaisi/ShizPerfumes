// src/seller/components/ProtectedRoute.tsx
import { useSellerAuth } from "../SellerAuthContext";
import SellerLogin from "../pages/SellerLogin";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { currentUser, loading } = useSellerAuth();

  if (loading) {
    return null; // Or a loading spinner
  }

  if (!currentUser) {
    return <SellerLogin />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
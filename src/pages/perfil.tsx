import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import {UserProfile} from "@/components/UserProfile";

const Perfil = () => {
  const { user, loading } = useAuth();

if (loading)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-4 border-muted border-t-primary animate-spin" />
    </div>
  )

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UserProfile />
  );
};

export default Perfil;

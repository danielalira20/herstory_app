import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

interface Props {
  children: React.ReactNode
}

const ProtectedAdminRoute = ({ children }: Props) => {
  const { user, loading } = useAuth()
  console.log("Usuario:", user)
console.log("Metadata:", user?.user_metadata)
console.log("Role:", user?.user_metadata?.role)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Verificando acceso...</p>
      </div>
    )
  }

  // No está autenticado
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Está autenticado pero no es admin
  const isAdmin = user.user_metadata?.role === "admin"
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedAdminRoute
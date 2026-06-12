///Adminnavbar.tsx

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import {
  Shield, CheckSquare, Users, LogOut, Heart, LayoutDashboard
} from "lucide-react"

const AdminNavbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  const links = [
    {
      href: "/admin/verificacion",
      label: "Aprobaciones Reportes",
      icon: CheckSquare,
    },
    {
      href: "/admin/solicitudes",
      label: "Solicitudes colectivos",
      icon: Users,
    },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">

        {/* Logo → va a HerStory */}
        <Link to="/" className="flex items-center gap-2.5">
          <img 
                src="/img/logo/logo_story.png" 
                alt="HerStory logo" 
                className="h-9 w-auto"
            />
          <div className="leading-tight">
            <p className="font-bold text-base tracking-tight">HerStory</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Panel Admin
            </p>
          </div>
        </Link>

        {/* Links de navegación */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label, icon: Icon }) => {
            const active = location.pathname === href
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Usuario + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-muted-foreground truncate max-w-[140px]">
              {user?.email}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </Button>
        </div>
      </div>

      {/* Nav mobile */}
      <div className="flex items-center gap-1 px-5 pb-3 md:hidden">
        {links.map(({ href, label, icon: Icon }) => {
          const active = location.pathname === href
          return (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          )
        })}
      </div>
    </header>
  )
}

export default AdminNavbar
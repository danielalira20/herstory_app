// Integrante        Tarea         Qué modifica
// ------------      ----------    -------------------------------------------
// Daf               NAV-F01       Solo páginas de Búsqueda.
//                                 "Ir a Aprende". Dark mode añadido
// Jess              DEL-D01       Eliminar item "Voces Silenciadas" según
//                                 decisión grupal

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu, User, LogOut, Map, FileText, Users, AlertTriangle, Heart, Mic,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const NavbarSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();

  const handleLogout = async () => { await supabase.auth.signOut(); };
  const isActive = (path: string) => location.pathname === path;

  const navItems: NavItem[] = [
    { label: "Mapa",              href: "/rastro-nacional",       icon: Map           },
    { label: "Formularios",       href: "/mujeres-desaparecidas", icon: FileText      },
    { label: "Ayuda",             href: "/ayuda",                 icon: Heart         },
    { label: "Reportar",          href: "/reportar",              icon: AlertTriangle },
    { label: "Para Colectivos",   href: "/para-colectivos",            icon: Users         },
    // TODO [DEL-D01 — JESS, Semana 1]: Eliminar o ajustar según reunión de fin de semana 1.
    { label: "Voces Silenciadas", href: "/voces-silenciadas",     icon: Mic           },
  ];

  const universalItems: NavItem[] = [
    { label: "Nosotras", href: "/nosotras", icon: Users    },
    { label: "Contacto", href: "/contacto", icon: FileText },
  ];

  const allItems = [...navItems, ...universalItems];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur",
      "bg-purple-100/95 dark:bg-background/95",
      "border-purple-200/60 dark:border-purple-900/40"
    )}>
      <div className="container flex h-16 items-center gap-2">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-4 shrink-0">
          <img src="/img/logo/logo_story.png" alt="HerStory Logo" className="h-7 w-7" />
          <span className="hidden font-bold sm:inline-block text-purple-800 dark:text-purple-200 text-sm">
            HerStory
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {allItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium transition-colors",
                "text-purple-800 dark:text-purple-200",
                "hover:bg-purple-200/60 dark:hover:bg-purple-800/50",
                isActive(item.href)
                  ? "bg-purple-200/70 dark:bg-purple-800/60 font-semibold"
                  : ""
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Espaciador */}
        <div className="flex-1" />

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          {!loading && (
            <>
              {user ? (
                <>
                  <Link to="/perfil" className="hidden md:block">
                    <Button variant="outline" size="sm"
                      className="h-9 text-sm text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700 hover:bg-purple-200/50 dark:hover:bg-purple-800/50">
                      <User className="mr-2 h-4 w-4" /> Mi Perfil
                    </Button>
                  </Link>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon"
                        className="hidden md:inline-flex h-9 w-9 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700 hover:bg-purple-200/50 dark:hover:bg-purple-800/50"
                        onClick={handleLogout}>
                        <LogOut className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Cerrar Sesión</p></TooltipContent>
                  </Tooltip>
                </>
              ) : (
                <Link to="/login" className="hidden md:block">
                  <Button variant="outline" size="sm"
                    className="h-9 text-sm text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700 hover:bg-purple-200/50 dark:hover:bg-purple-800/50">
                    <User className="mr-2 h-4 w-4" /> Iniciar Sesión
                  </Button>
                </Link>
              )}
            </>
          )}

          {/* Mobile hamburger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"
                className="lg:hidden h-8 w-8 text-purple-800 dark:text-purple-200">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right"
              className="w-[280px] bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
              <nav className="flex flex-col gap-1 pt-6">
                <p className="px-3 pb-3 font-bold text-purple-800 dark:text-purple-200 text-sm">HerStory</p>
                {allItems.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      "text-purple-800 dark:text-purple-200",
                      "hover:bg-purple-200/50 dark:hover:bg-purple-800/50",
                      isActive(item.href) && "bg-purple-200/50 dark:bg-purple-800/50"
                    )}>
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800 flex flex-col gap-2">
                  {!loading && (user ? (
                    <>
                      <Link to="/perfil" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full text-sm text-purple-800 dark:text-purple-200 border-purple-400 dark:border-purple-600">
                          <User className="mr-2 h-4 w-4" /> Mi Perfil
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full text-sm text-purple-800 dark:text-purple-200 border-purple-400 dark:border-purple-600"
                        onClick={() => { handleLogout(); setIsOpen(false); }}>
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full text-sm text-purple-800 dark:text-purple-200 border-purple-400 dark:border-purple-600">
                        <User className="mr-2 h-4 w-4" /> Iniciar Sesión
                      </Button>
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavbarSearch;
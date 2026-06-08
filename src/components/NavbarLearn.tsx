// Integrante        Tarea         Qué modifica
// ------------      ----------    -------------------------------------------
// Daf               NAV-F01       Solo páginas de Educación. Sin botón
//                                 "Ir a Búsqueda". Dark mode añadido
// Jess              DEL-F01       Eliminar item "Ella Dice"
// Jess              DEL-D01       Eliminar item "Voces Silenciadas" según
//                                 decisión grupal

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu, User, LogOut, Heart, FileText, Users, BookMarked, Gamepad2, MessageCircle, Mic, Phone,
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

const NavbarLearn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();

  const handleLogout = async () => { await supabase.auth.signOut(); };
  const isActive = (path: string) => location.pathname === path;

  const navItems: NavItem[] = [
    { label: "Museo",      href: "/herstory",        icon: Heart         },
    { label: "Guías",      href: "/awareness-guide", icon: FileText      },
    { label: "Directorio", href: "/directorio",      icon: Users         },
    { label: "Glosario",   href: "/glosario",        icon: BookMarked    },
    { label: "MiniJuegos",    href: "/aprende",          icon: Gamepad2      },
    // TODO [DEL-F01 — JESS, Semana 1]: Eliminar este item y quitar su route en App.tsx.
    //{ label: "Ella Dice",         href: "/ella-dice",        icon: MessageCircle },
    // TODO [DEL-D01 — JESS, Semana 1]: Pendiente decisión grupal.
    //{ label: "Voces Silenciadas", href: "/voces-silenciadas", icon: Mic  },
  ];

  const universalItems: NavItem[] = [
    { label: "Nosotras", href: "/nosotras", icon: Users },
    { label: "Contacto", href: "/contacto", icon: Phone },
  ];

  const allItems = [...navItems, ...universalItems];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b",
      "bg-pink-50 dark:bg-background/95",
      "border-pink-200/60 dark:border-pink-900/40"
    )}>
      <div className="container flex h-16 items-center gap-2">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-4 shrink-0">
          <img src="/img/logo/logo_story.png" alt="HerStory Logo" className="h-7 w-7" />
          <span className="hidden font-bold sm:inline-block text-pink-900 dark:text-pink-200 text-sm">
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
                "text-pink-900 dark:text-pink-200",
                "hover:bg-pink-200/80 dark:hover:bg-pink-800/50",
                isActive(item.href)
                  ? "bg-pink-200/70 dark:bg-pink-800/60 font-semibold"
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
                      className="h-9 text-sm text-pink-900 dark:text-pink-200 border-pink-300 dark:border-pink-700 hover:bg-pink-200/50 dark:hover:bg-pink-800/50">
                      <User className="mr-2 h-4 w-4" /> Mi Perfil
                    </Button>
                  </Link>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon"
                        className="hidden md:inline-flex h-9 w-9 text-pink-900 dark:text-pink-200 border-pink-300 dark:border-pink-700 hover:bg-pink-200/50 dark:hover:bg-pink-800/50"
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
                    className="h-9 text-sm text-pink-900 dark:text-pink-200 border-pink-300 dark:border-pink-700 hover:bg-pink-200/50 dark:hover:bg-pink-800/50">
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
                className="lg:hidden h-8 w-8 text-pink-900 dark:text-pink-200">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right"
              className="w-[280px] bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800">
              <nav className="flex flex-col gap-1 pt-6">
                <p className="px-3 pb-3 font-bold text-pink-900 dark:text-pink-200 text-sm">HerStory</p>
                {allItems.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      "text-pink-900 dark:text-pink-200",
                      "hover:bg-pink-200/50 dark:hover:bg-pink-800/50",
                      isActive(item.href) && "bg-pink-200/50 dark:bg-pink-800/50"
                    )}>
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-pink-200 dark:border-pink-800 flex flex-col gap-2">
                  {!loading && (user ? (
                    <>
                      <Link to="/perfil" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full text-sm text-pink-900 dark:text-pink-200 border-pink-400 dark:border-pink-600">
                          <User className="mr-2 h-4 w-4" /> Mi Perfil
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full text-sm text-pink-900 dark:text-pink-200 border-pink-400 dark:border-pink-600"
                        onClick={() => { handleLogout(); setIsOpen(false); }}>
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full text-sm text-pink-900 dark:text-pink-200 border-pink-400 dark:border-pink-600">
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

export default NavbarLearn;
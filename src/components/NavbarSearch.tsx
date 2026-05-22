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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
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
  description?: string;
}

const NavbarSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();

  const handleLogout = async () => { await supabase.auth.signOut(); };
  const isActive = (path: string) => location.pathname === path;

  const navItems: NavItem[] = [
    { label: "Mapa",              href: "/rastro-nacional",       icon: Map          },
    { label: "Formularios",       href: "/mujeres-desaparecidas", icon: FileText     },
    { label: "Ayuda",             href: "/ayuda",                 icon: Heart        },
    { label: "Reportar",          href: "/reportar",              icon: AlertTriangle },
    { label: "Para Colectivos",   href: "/colectivos",            icon: Users        },
    // TODO [DEL-D01 — JESS, Semana 1]: Eliminar o ajustar según reunión de fin de semana 1.
    { label: "Voces Silenciadas", href: "/voces-silenciadas",     icon: Mic          },
  ];

  const universalItems: NavItem[] = [
    { label: "Nosotras", href: "/nosotras", icon: Users },
    { label: "Contacto", href: "/contacto", icon: FileText },
  ];

  const allItems = [...navItems, ...universalItems];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-purple-50/60",
      "bg-purple-100/95 dark:bg-background/95",
      "border-purple-200/60 dark:border-purple-900/40"
    )}>
      <div className="container flex h-16 items-center">

        {/* Logo */}
        <div className="mr-6 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/img/logo/logo_story.png" alt="HerStory Logo" className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block text-purple-800 dark:text-purple-200">
              HerStory
            </span>
          </Link>
        </div>

        {/* Desktop */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="space-x-1">
            {allItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      "text-purple-800 dark:text-purple-200",
                      "hover:bg-purple-200/50 dark:hover:bg-purple-800/50",
                      isActive(item.href) && "bg-purple-200/50 dark:bg-purple-800/50"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right */}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {!loading && (
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link to="/perfil">
                    <Button variant="outline" size="sm"
                      className="hidden md:inline-flex text-purple-800 dark:text-purple-200 border-purple-400 dark:border-purple-600 hover:bg-purple-200/50 dark:hover:bg-purple-800/50">
                      <User className="mr-2 h-4 w-4" /> Mi Perfil
                    </Button>
                  </Link>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleLogout}
                        className="hidden md:inline-flex text-purple-800 dark:text-purple-200 border-purple-400 dark:border-purple-600 hover:bg-purple-200/50 dark:hover:bg-purple-800/50">
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Cerrar Sesión</p></TooltipContent>
                  </Tooltip>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm"
                    className="hidden md:inline-flex text-purple-800 dark:text-purple-200 border-purple-400 dark:border-purple-600 hover:bg-purple-200/50 dark:hover:bg-purple-800/50">
                    <User className="mr-2 h-4 w-4" /> Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          )}

          {/* Mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-purple-800 dark:text-purple-200">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
              <nav className="flex flex-col space-y-2 pt-4">
                <div className="px-3 pb-2 font-bold text-purple-800 dark:text-purple-200">HerStory</div>
                {allItems.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      "text-purple-800 dark:text-purple-200",
                      "hover:bg-purple-200/50 dark:hover:bg-purple-800/50",
                      isActive(item.href) && "bg-purple-200/50 dark:bg-purple-800/50"
                    )}>
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-purple-200 dark:border-purple-800">
                  {!loading && (user ? (
                    <div className="flex flex-col space-y-2">
                      <Link to="/perfil" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full text-purple-800 dark:text-purple-200 border-purple-400 dark:border-purple-600">
                          <User className="mr-2 h-4 w-4" /> Mi Perfil
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full text-purple-800 dark:text-purple-200 border-purple-400 dark:border-purple-600"
                        onClick={() => { handleLogout(); setIsOpen(false); }}>
                        Cerrar Sesión
                      </Button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full text-purple-800 dark:text-purple-200 border-purple-400 dark:border-purple-600">
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
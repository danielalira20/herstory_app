import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Search, Mic, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const NavbarSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      label: "Nos Faltan Ellas",
      href: "/nos-faltan-ellas",
      icon: Search,
      hasDropdown: true,
      description: "Herramientas de búsqueda",
      dropdownItems: [
        { label: "Mapa Nacional", href: "/mujeres-desaparecidas", description: "Visualiza casos en todo el país" },
        { label: "Rastro Nacional", href: "/rastro-nacional", description: "Base de datos de búsqueda" },
        { label: "Reportar Caso", href: "/reportar", description: "Ayuda a difundir información" }
      ]
    },
    {
      label: "Voces Silenciadas",
      href: "/voces-silenciadas",
      icon: Mic,
      description: "Testimonios de familias"
    }
  ];

  const universalItems = [
    { label: "Nosotras", href: "/nosotras" },
    { label: "Contacto", href: "/contacto" }
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-purple-50/60",
        "bg-purple-100/95 dark:bg-background/95",
        "border-purple-200/60 dark:border-purple-900/40"
      )}
    >
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="mr-6 flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg">
              <img src="/img/logo/logo_story.png" alt="HerStory Logo" className="h-8 w-8" />
            </div>
            <span className="hidden font-bold sm:inline-block text-purple-900 dark:text-purple-200">
              HerStory
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="space-x-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.hasDropdown ? (
                  <>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent text-purple-900 dark:text-purple-200",
                        "hover:bg-purple-200/50 dark:hover:bg-purple-800/50",
                        isActive(item.href) && "bg-purple-200/50 dark:bg-purple-800/50"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.dropdownItems?.map((subItem) => (
                          <li key={subItem.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={subItem.href}
                                className={cn(
                                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                  "hover:bg-purple-100/50 dark:hover:bg-purple-800/50",
                                  isActive(subItem.href) && "bg-purple-200/50 dark:bg-purple-800/50"
                                )}
                              >
                                <div className="text-sm font-medium leading-none text-purple-900 dark:text-purple-200">
                                  {subItem.label}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-purple-700 dark:text-purple-400">
                                  {subItem.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors",
                        "text-purple-900 dark:text-purple-200",
                        "hover:bg-purple-200/50 dark:hover:bg-purple-800/50",
                        isActive(item.href) && "bg-purple-200/50 dark:bg-purple-800/50"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}

            {/* Botón destacado: Ir a Aprende */}
            <NavigationMenuItem>
              <Link to="/learn">
                <Button
                  size="sm"
                  className="font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)'
                  }}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ir a Aprende
                </Button>
              </Link>
            </NavigationMenuItem>

            {/* Items universales */}
            {universalItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors",
                      "text-purple-900 dark:text-purple-200",
                      "hover:bg-purple-200/50 dark:hover:bg-purple-800/50",
                      isActive(item.href) && "bg-purple-200/50 dark:bg-purple-800/50"
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side */}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />

          {!loading && (
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link to="/perfil">
                    <Button variant="outline" size="sm"
                      className="hidden md:inline-flex text-purple-900 dark:text-purple-200 border-purple-400 dark:border-purple-600 hover:bg-purple-200/50 dark:hover:bg-purple-800/50">
                      <User className="mr-2 h-4 w-4" />
                      Mi Perfil
                    </Button>
                  </Link>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleLogout}
                        className="hidden md:inline-flex text-purple-900 dark:text-purple-200 border-purple-400 dark:border-purple-600 hover:bg-purple-200/50 dark:hover:bg-purple-800/50">
                        <LogOut className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cerrar Sesión</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm"
                    className="hidden md:inline-flex text-purple-900 dark:text-purple-200 border-purple-400 dark:border-purple-600 hover:bg-purple-200/50 dark:hover:bg-purple-800/50">
                    <User className="mr-2 h-4 w-4" />
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-purple-900 dark:text-purple-200">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        "text-purple-900 dark:text-purple-200",
                        "hover:bg-purple-200/50 dark:hover:bg-purple-800/50",
                        isActive(item.href) && "bg-purple-200/50 dark:bg-purple-800/50"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                    {item.hasDropdown && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.dropdownItems?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm transition-colors",
                              "text-purple-900 dark:text-purple-200",
                              "hover:bg-purple-200/50 dark:hover:bg-purple-800/50"
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Link to="/learn" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', color: 'white' }}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ir a Aprende
                  </Button>
                </Link>

                {universalItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      "text-purple-900 dark:text-purple-200",
                      "hover:bg-purple-200/50 dark:hover:bg-purple-800/50",
                      isActive(item.href) && "bg-purple-200/50 dark:bg-purple-800/50"
                    )}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}

                <div className="pt-4 border-t border-purple-200 dark:border-purple-800">
                  {!loading && (
                    user ? (
                      <div className="flex flex-col space-y-3">
                        <Link to="/perfil" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full text-purple-900 dark:text-purple-200 border-purple-400 dark:border-purple-600">
                            <User className="mr-2 h-4 w-4" />
                            Mi Perfil
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full text-purple-900 dark:text-purple-200 border-purple-400 dark:border-purple-600" onClick={() => { handleLogout(); setIsOpen(false); }}>
                          Cerrar Sesión
                        </Button>
                      </div>
                    ) : (
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full text-purple-900 dark:text-purple-200 border-purple-400 dark:border-purple-600">
                          <User className="mr-2 h-4 w-4" />
                          Iniciar Sesión
                        </Button>
                      </Link>
                    )
                  )}
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
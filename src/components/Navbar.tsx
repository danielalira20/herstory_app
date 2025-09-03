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
import { Menu, User, Heart, Mic, Search, BookOpen, Users, MessageCircle, Gamepad2, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { 
      label: "Inicio", 
      href: "/", 
      icon: Heart,
      description: "Página principal"
    },
    { 
      label: "Voces Silenciadas", 
      href: "/voces-silenciadas", 
      icon: Mic,
      description: "Historias y testimonios"
    },
    {
      label: "Nos Faltan Ellas",
      href: "/nos-faltan-ellas",
      icon: Search,
      hasDropdown: true,
      description: "Sección dedicada a las mujeres desaparecidas",
      dropdownItems: [
        { label: "Ayuda", href: "/ayuda", description: "Centro de ayuda y recursos" },
        { label: "Mujeres Desaparecidas", href: "/mujeres-desaparecidas", description: "Base de datos y casos" },
        { label: "Rastro Nacional", href: "/rastro-nacional", description: "Red nacional de búsqueda" }
      ]
    },
    { 
      label: "HerStory", 
      href: "/herstory", 
      icon: BookOpen,
      description: "Podcasts y contenido multimedia"
    },
    { 
      label: "Ella Dice", 
      href: "/ella-dice", 
      icon: MessageCircle,
      description: "Foro de la comunidad"
    },
    { 
      label: "Aprende", 
      href: "/aprende", 
      icon: Gamepad2,
      description: "Juegos educativos"
    },
    { 
      label: "Nosotras", 
      href: "/nosotras", 
      icon: Users,
      description: "Acerca de nosotras"
    },
    { 
      label: "Contacto", 
      href: "/contacto", 
      icon: Phone,
      description: "Formulario de contacto"
    }
  ];

  const DropdownContent = ({ items }: { items: any[] }) => (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {items.map((item) => (
        <li key={item.href}>
          <NavigationMenuLink asChild>
            <Link
              to={item.href}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                isActive(item.href) && "bg-accent text-accent-foreground"
              )}
            >
              <div className="text-sm font-medium leading-none">{item.label}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {item.description}
              </p>
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="mr-6 flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="hidden font-bold sm:inline-block bg-gradient-hero bg-clip-text text-transparent">
              Voz Activada
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
                        "bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        isActive(item.href) && "bg-accent text-accent-foreground"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <DropdownContent items={item.dropdownItems} />
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isActive(item.href) && "bg-accent text-accent-foreground"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side - Login Button */}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="hero" size="sm" className="hidden md:inline-flex">
              <User className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 px-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold bg-gradient-hero bg-clip-text text-transparent">
                    Voz Activada
                  </span>
                </div>
                
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        isActive(item.href) && "bg-accent text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
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
                              "block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                              isActive(subItem.href) && "bg-accent text-accent-foreground"
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-4">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="hero" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Iniciar Sesión
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
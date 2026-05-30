// Componente que todas las páginas deben usar como navbar.
// Renderiza NavbarSearch o NavbarLearn según la sección activa.
// Reemplaza al antiguo Navbar.tsx.

import { useSection } from "@/context/SectionContext";
import NavbarSearch from "./NavbarSearch";
import NavbarLearn from "./NavbarLearn";

const NavbarWrapper = () => {
  const { section } = useSection();
  return section === "learn" ? <NavbarLearn /> : <NavbarSearch />;
};

export default NavbarWrapper;
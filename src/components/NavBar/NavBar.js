import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Button from "../ui/Button";
import styles from "./NavBar.module.css";
import NavBarItemsList from "./NavBarItemsList";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu((prev) => !prev);
  }

  function closeMenu() {
    setShowMenu(false);
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/home" className={styles["navbar-logo"]} onClick={closeMenu}>
        <Logo className={styles["navbar-logo"]} />
      </Link>
      <NavBarItemsList showMenu={showMenu} closeMenu={closeMenu} />
      <Button
        className={styles["show-more-button"]}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={showMenu}
      >
        <IoIosMore size={20} />
      </Button>
    </nav>
  );
}

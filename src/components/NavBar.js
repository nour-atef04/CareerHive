import Button from "./Button";
import Logo from "./Logo";
import styles from "./NavBar.module.css";
import ellipses from "../assets/ellipses.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavBarItemsList from "./NavBarItemsList";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.navbar}>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive ? `${styles["nav-item"]} ${styles.active}` : styles["nav-item"]
        }
      >
        <Logo className={styles["navbar-logo"]} />
      </NavLink>
      <NavBarItemsList showMenu={showMenu}/>
      <Button
        className={styles["show-more-button"]}
        onClick={() => setShowMenu(showMenu ? false : true)}
      >
        <img
          src={ellipses}
          alt="show more"
          className={styles["show-more-ellipses"]}
        />
      </Button>
    </div>
  );
}

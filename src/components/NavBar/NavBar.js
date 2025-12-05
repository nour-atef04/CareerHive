import Button from "../ui/Button";
import Logo from "../Logo/Logo";
import styles from "./NavBar.module.css";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import NavBarItemsList from "./NavBarItemsList";
import NavBarItem from "./NavBarItem";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.navbar}>
      <NavBarItem page={"/home"}>
        <Logo className={styles["navbar-logo"]} />
      </NavBarItem>
      <NavBarItemsList showMenu={showMenu} />
      <Button
        className={styles["show-more-button"]}
        onClick={() => setShowMenu(showMenu ? false : true)}
      >
        <IoIosMore style={{ fontSize: "large" }} />
      </Button>
    </div>
  );
}

import NavBarItem from "./NavBarItem";
import styles from "./NavBarItemsList.module.css";

export default function NavBarItemsList({ showMenu }) {

  const navItems = ["home", "network", "jobs", "messages", "profile"];

  return (
    <ul className={`${styles["navbar-list"]} ${showMenu ? styles.show : ""}`}>
      {navItems.map((item, i) => <NavBarItem key={i} page={item}/>)}
    </ul>
  );
}

import { NavLink } from "react-router-dom";
import styles from "./NavBarItem.module.css";

export default function NavBarItem({ page, children, icon }) {
  return (
    <li className={styles.list}>
      <NavLink
        to={page}
        className={({ isActive }) =>
          isActive
            ? `${styles["nav-item"]} ${styles.active}`
            : styles["nav-item"]
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

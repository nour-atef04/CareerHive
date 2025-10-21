import { NavLink } from "react-router-dom";
import styles from "./NavBarItem.module.css";

export default function NavBarItem({ page }) {
  return (
    <li>
      <NavLink
        to={page}
        className={({ isActive }) =>
          isActive
            ? `${styles["nav-item"]} ${styles.active}`
            : styles["nav-item"]
        }
      >
        <p className={styles["item-name"]}>{page}</p>
      </NavLink>
    </li>
  );
}

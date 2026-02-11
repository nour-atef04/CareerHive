import NavBarItem from "./NavBarItem";
import styles from "./NavBarItemsList.module.css";
import { IoHomeOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiSuitcaseSimple } from "react-icons/pi";
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";

export default function NavBarItemsList({ showMenu, closeMenu }) {
  const navLinks = [
    { label: "Home", path: "home", icon: <IoHomeOutline /> },
    { label: "Network", path: "network", icon: <LiaUserFriendsSolid /> },
    { label: "Jobs", path: "jobs", icon: <PiSuitcaseSimple /> },
    { label: "Messages", path: "messages", icon: <LuMessagesSquare /> },
    { label: "Profile", path: "profile/me", icon: <FaRegUser /> }, // Easy to customize paths like this
  ];

  return (
    <ul className={`${styles["navbar-list"]} ${showMenu ? styles.show : ""}`}>
      {navLinks.map((link) => (
        <NavBarItem key={link.label} page={link.path} onClick={closeMenu}>
          {link.icon} <span>{link.label}</span>
        </NavBarItem>
      ))}
    </ul>
  );
}

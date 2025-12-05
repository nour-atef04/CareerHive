import NavBarItem from "./NavBarItem";
import styles from "./NavBarItemsList.module.css";
import { IoHomeOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiSuitcaseSimple } from "react-icons/pi";
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";

export default function NavBarItemsList({ showMenu }) {
  const navItems = ["Home", "Network", "Jobs", "Messages", "Profile"];
  const navItemsIcons = {
    Home: <IoHomeOutline />,
    Network: <LiaUserFriendsSolid />,
    Jobs: <PiSuitcaseSimple />,
    Messages: <LuMessagesSquare />,
    Profile: <FaRegUser />,
  };

  return (
    <ul className={`${styles["navbar-list"]} ${showMenu ? styles.show : ""}`}>
      {navItems.map((item, i) => (
        <NavBarItem key={i} page={item.toLowerCase()}>
          {navItemsIcons[item]} <span>{item}</span>
        </NavBarItem>
      ))}
    </ul>
  );
}

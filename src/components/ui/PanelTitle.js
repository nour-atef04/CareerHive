import styles from "./PanelTitle.module.css";

export default function PanelTitle({ children, type = "h4", className }) {
  const style = `${styles["panel-title"]} ${className || ""}`;

  switch (type) {
    case "h3":
      return <h3 className={style}>{children}</h3>;
    default:
      return <h4 className={style}>{children}</h4>;
  }
}

import styles from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  onClick,
  className,
  variant = "filled", // "filled" | "outline" | "outline-dark" | "disabled" | "disabled-dark"
  size = "md", // "sm" | "md" | "lg"
  color = "brand1", // "brand1" | "brand2"
}) {
  const variantClass = styles[`variant--${variant}`];
  const sizeClass = styles[`size--${size}`];
  const colorClass = styles[`color--${color}`];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${variantClass} ${sizeClass} ${colorClass} ${
        className || ""
      }`}
      disabled={variant === "disabled" || variant === "disabled-dark"}
    >
      {children}
    </button>
  );
}

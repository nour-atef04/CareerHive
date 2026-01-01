import styles from "./Spinner.module.css";

export default function Spinner({ size = "medium", color = "#fff", thickness = 3 }) {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  return (
    <div
      className={styles.spinner}
      style={{
        width: spinnerSize,
        height: spinnerSize,
        borderWidth: thickness,
        borderColor: `${color} transparent ${color} transparent`,
      }}
    />
  );
}
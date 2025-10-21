import styles from "./FormInput.module.css";

export default function FormInput({
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.input}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      required
    />
  );
}

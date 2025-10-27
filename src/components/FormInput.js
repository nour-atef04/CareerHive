import styles from "./FormInput.module.css";

export default function FormInput({
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  className,
  ref
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${styles.input} ${className || ""}`}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      ref={ref}
      required
    />
  );
}

import styles from "./FormInput.module.css";

export default function FormInput({
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  className,
  ref,
}) {
  if (type === "textarea") {
    return (
      <textarea
        className={`${styles.input} ${className || ""}`}
        rows="5"
        cols="40"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    );
  }

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

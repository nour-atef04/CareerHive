import styles from "./FormInput.module.css";
import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(
  {
    type = "text",
    placeholder,
    defaultValue,
    value,
    onChange,
    autoComplete,
    className,
    id,
    ...props
  },
  ref,
) {
  if (type === "textarea") {
    return (
      <textarea
        id={id}
        className={`${styles.input} ${className || ""}`}
        rows="5"
        cols="40"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      ></textarea>
    );
  }

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`${styles.input} ${className || ""}`}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      ref={ref}
      defaultValue={defaultValue}
      required
      {...props}
    />
  );
});

export default FormInput;

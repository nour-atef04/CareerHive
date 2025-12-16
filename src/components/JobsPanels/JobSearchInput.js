import { IoSearchOutline } from "react-icons/io5";
import styles from "./JobSearchInput.module.css";
import FormInput from "../ui/FormInput";

export default function JobSearchInput({ className, value, onChange }) {
  return (
    <div className={`${styles["search-job-input"]} ${className || ""}`}>
      <IoSearchOutline />
      <FormInput
        value={value}
        onChange={onChange}
        placeholder="Companies, location, or skills..."
      />
    </div>
  );
}

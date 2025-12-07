import { IoSearchOutline } from "react-icons/io5";
import styles from "./JobSearchInput.module.css";
import FormInput from "../ui/FormInput";

export default function JobSearchInput({ className }) {
  return (
    <div className={`${styles["search-job-input"]} ${className || ""}`}>
      <IoSearchOutline />
      <FormInput placeholder="Companies, location, or skills..." />
    </div>
  );
}

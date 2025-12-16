import styles from "./Loader.module.css";

const Loader = ({ className }) => (
  <div className={`${styles.dots} ${className || ""}`}>
    <span />
    <span />
    <span />
  </div>
);

export default Loader;

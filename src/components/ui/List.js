import styles from "./List.module.css";

export default function List({
  items = [], // data source
  renderItem, // render prop
  keyExtractor, // to avoid index keys
  className,
  emptyMessage = "Nothing to show",
}) {

  if (!items.length) return <p className={styles.empty}>{emptyMessage}</p>;

  return (
    <ul className={`${styles.list} ${className || ""}`}>
      {items.map((item, index) => (
        <li key={keyExtractor ? keyExtractor(item) : index}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

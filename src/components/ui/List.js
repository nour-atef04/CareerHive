import styles from "./List.module.css";

export default function List({
  items = [], // data source
  renderItem, // render prop
  keyExtractor, // to avoid index keys
  className,
  emptyMessage = "Nothing to show",
}) {
  if (!items.length) return <p>{emptyMessage}</p>;

  return (
    <div className={`${styles.list} ${className || ""}`}>
      {items.map((item, index) => (
        <div key={keyExtractor ? keyExtractor(item) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

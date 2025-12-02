function isSameDay(d1, d2) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

function getDateLabel(date) {
  const today = new Date();
  const msgDate = new Date(date);

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(msgDate, today)) return "Today";
  if (isSameDay(msgDate, yesterday)) return "Yesterday";

  // o.w. return dd/mm/yyyy
  const day = msgDate.getDate().toString().padStart(2, "0");
  const month = (msgDate.getMonth() + 1).toString().padStart(2, "0");
  const year = msgDate.getFullYear();

  return `${day}/${month}/${year}`;
}

export { isSameDay, getDateLabel };

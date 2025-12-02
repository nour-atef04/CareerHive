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

function formatFullTimestamp(isoString) {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const mins = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} · ${hours}:${mins}`;
}

export { isSameDay, getDateLabel, formatFullTimestamp };

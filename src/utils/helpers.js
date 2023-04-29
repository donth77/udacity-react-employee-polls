export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const locale = navigator.language;
  const time = d.toLocaleString(locale, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${time} | ${d.toLocaleDateString(locale)}`;
}

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (months > 0) return `Posted ${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks > 0) return `Posted ${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days > 0) return `Posted ${days} day${days > 1 ? "s" : ""} ago`;
  return "Posted today";
}

export function truncate(text: string, maxLength = 180): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + "...";
}

export function formatDate(date: string | Date): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function isDeadlinePassed(deadline: string | Date): boolean {
  if (!deadline) return false;
  return new Date(deadline) < new Date();
}

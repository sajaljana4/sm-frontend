interface FormatDateOptions {
  includeTime?: boolean;
  includeDate?: boolean;
}

export function formatDate(
  dateString: string,
  options: FormatDateOptions = {},
): string {
  const { includeTime = false, includeDate = true } = options;

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "—";
  }

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  if (includeTime) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    if (!includeDate) {
      return `${displayHours}:${minutes} ${ampm}`;
    }

    return `${formattedDate}, ${displayHours}:${minutes} ${ampm}`;
  }

  return formattedDate;
}

export function formatRelativeDate(
  dateString: string,
  options?: {
    dateFormat: "detailed" | "short";
  },
): string {
  const { dateFormat = "detailed" } = options ?? {};
  const now = new Date();
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "—";
  }

  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins === 0) {
    return "Just now";
  }

  const diffHours = diffMins / 60;
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${diffMins} min${diffMins !== 1 ? "s" : ""}`;
  }

  if (diffHours < 24) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
  }

  if (dateFormat === "short") {
    if (diffDays === 1) {
      return "Yesterday";
    }
    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }
    return formatDate(dateString, { includeTime: false });
  }

  return formatDate(dateString, { includeTime: true });
}

export function formatDuration(seconds?: number | null) {
  if (seconds == null) return "0:00";
  if (!Number.isFinite(seconds)) return "0:00";

  const total = Math.max(0, Math.floor(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;

  return `${m}:${String(s).padStart(2, "0")}`;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
export const monthShort = (d: Date) =>
  d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase();
export const weekdayShort = (d: Date) =>
  d
    .toLocaleString("en-US", { weekday: "short", timeZone: "UTC" })
    .toUpperCase();

/** Local date + time with seconds, e.g. "Thu, 4 Jun · 2:30:45 pm" */
export function formatCurrentDateTimeWithSeconds(date: Date): string {
  const weekday = date
    .toLocaleString("en-IN", { weekday: "short" })
    .replace(/\./g, "");
  const day = date.getDate();
  const month = date
    .toLocaleString("en-IN", { month: "short" })
    .replace(/\./g, "");
  const time = date.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return `${weekday}, ${day} ${month} · ${time}`;
}
export const timeLabel = (d: Date) =>
  d
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    })
    .toUpperCase();

export function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 1) {
    return "Just now";
  }

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + "y ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + "mo ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + "d ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + "h ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + "m ago";
  }
  return Math.floor(seconds) + "s ago";
}

export const timeRemaining = (endTime?: string | null) => {
  if (!endTime) return null;
  const expiryDate = new Date(endTime);
  const now = new Date();

  if (expiryDate < now) return "Ended";

  const diffMs = expiryDate.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  if (diffDays > 0) return `${diffDays}d ${diffHours}h left`;
  if (diffHours > 0) return `${diffHours}h left`;

  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffMins}m left`;
};

export function formatTime(time24: string): string {
  const [hourStr, minuteStr] = time24.split(":");
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  const period = hour >= 12 ? "PM" : "AM";
  let displayHour: number;
  if (hour > 12) {
    displayHour = hour - 12;
  } else if (hour === 0) {
    displayHour = 12;
  } else {
    displayHour = hour;
  }
  return `${String(displayHour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
}

export const now = new Date();
export const todayString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

export function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

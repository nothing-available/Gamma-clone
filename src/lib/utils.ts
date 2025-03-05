import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(timeStamp: string) {
  const now = new Date();
  const diffInSeconds =
    Math.floor(now.getTime() - new Date(timeStamp).getTime()) / 1000;

  const intervels = [
    { label: "year", value: 60 * 60 * 24 * 365 },
    { label: "month", value: 60 * 60 * 24 * 30 },
    { label: "day", value: 60 * 60 * 24 },
    { label: "hours", value: 60 * 60 },
    { label: "minute", value: 60 },
    { label: "second", value: 1 },
  ];

  for (let i = 0; i < intervels.length; i++) {
    const intervel = intervels[i];
    const count = Math.floor(diffInSeconds / intervel.value);

    if (count >= 1) {
      return `${count} ${intervel.label} ago`;
    }
  }
  return "just now";
}

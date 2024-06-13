import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  const names = name.split(' ');
  let initials = '';

  for (let n of names) initials += n.charAt(0).toUpperCase();

  return initials;
}

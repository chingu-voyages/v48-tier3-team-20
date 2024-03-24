// put all shared utility functions here
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// useful for testing loading state or simulating API calls
export const sleep = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

// checks if the type for value matches the const array
export function isType<T>(value: any, array: readonly T[]): value is T {
  return array.includes(value as T);
}

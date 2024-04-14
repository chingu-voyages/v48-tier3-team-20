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

// extract yyyy-MM-ddThh:mm
export const getDateTime = (dateObj: Date) => {
  const offset = dateObj.getTimezoneOffset() * 60 * 1000;
  const timeStr = dateObj.getTime();
  const dateTime = new Date(timeStr - offset).toISOString().slice(0, 16);

  return dateTime;
};

export const convertToIso = (dateStr: string) => {
  return new Date(dateStr).toISOString();
};

export function tryParseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return jsonString;
  }
}

export function parseEventFormData(formData: FormData) {
  const formDataObject: { [key: string]: any } = {};
  formData.forEach((val, key) => {
    formDataObject[key] = typeof val === "string" ? tryParseJSON(val) : val;
  });
  return formDataObject;
}

/* user form data */
export function parseUserFormData(formData: FormData) {
  const formDataObject: { [key: string]: any } = {};
  formData.forEach((val, key) => {
    formDataObject[key] = typeof val === "string" ? tryParseJSON(val) : val;
  });
  return formDataObject;
}

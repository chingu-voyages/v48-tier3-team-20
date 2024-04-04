// put all shared utility functions here
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export { cloudinary }

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
    formDataObject[key] = typeof val === 'string' ? tryParseJSON(val) : val;
  })
  return formDataObject
}

export const uploadImageToCloudinary = async (buffer: Buffer, filename: string, options: { tags?: string[] } = {}) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      {
        tags: options.tags || [''],
        use_filename: true,
        filename_override: filename
      },
      function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    ).end(buffer);
  });
};

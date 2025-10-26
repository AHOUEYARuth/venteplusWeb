/* eslint-disable @typescript-eslint/no-explicit-any */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const objectToFormData = (payload: { [key: string]: any }): FormData => {
  const keys = Object.keys(payload);
  const data = new FormData();
  keys.forEach((key) => {
    data.append(key, payload[key]);
  });
  return data;
};
export const objectToFormDataWithArray = (payload: {
  [key: string]: any;
}): FormData => {
  const data = new FormData();
  Object.keys(payload).forEach((key) => {
    if (Array.isArray(payload[key])) {
      payload[key].forEach((item: any) => {
        data.append(`${key}[]`, item);
      });
    } else {
      data.append(key, payload[key]);
    }
  });
  return data;
};


export const cleanPayload = (payload: Record<string, any>) => {
        const cleaned: Record<string, any> = {};
          for (const key in payload) {
            const value = payload[key];
            if (value !== null && value !== "" && value !== undefined) {
              cleaned[key] = value;
            }
          }
          return cleaned;
}

export type VerbHttpType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const toBoolean = (value: any): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return Boolean(value);
};
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

export type VerbHttpType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
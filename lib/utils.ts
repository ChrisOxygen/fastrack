import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class CustomFormError extends Error {
  field?: string;
  statusCode?: number;

  constructor(message: string, field?: string, statusCode?: number) {
    super(message);
    this.field = field;
    this.statusCode = statusCode;
    this.name = "CustomFormError";

    // Maintaining proper stack trace (only works in V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomFormError);
    }
  }
}

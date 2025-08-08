import { ZodSchema } from "zod";
import { ERROR_MESSAGES } from "../common/errors";

export function validateWithSchema<T>(schema: ZodSchema<T>,data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  return result.data;
}

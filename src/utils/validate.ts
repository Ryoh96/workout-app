import type { z, ZodSchema } from 'zod'

export const validate = <T extends ZodSchema>(
  target: unknown,
  schema: T
): asserts target is z.infer<T> => {
  schema.parse(target)
}

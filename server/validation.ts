import { H3Event } from "h3";
import { ZodSchema, z } from "zod";

type Extraction = "body" | "params" | "query";

export const validate = async (
  event: H3Event,
  schema: ZodSchema,
  ...extract: Array<Extraction>
) => {
  if (extract.length === 0) {
    extract = ["body"];
  }

  let value = {};
  for (const extractor of extract) {
    if (extractor === "body") {
      const body = await readBody(event);
      value = { ...value, ...body };
    }

    if (extractor === "query") {
      value = { ...value, ...getQuery(event) };
    }

    if (extractor === "params") {
      value = { ...value, ...event.context.params };
    }
  }

  const response = schema.safeParse(value);
  if (response.success) {
    return response.data as z.infer<typeof schema>;
  }

  throw createError({ status: 400, data: response.error.errors });
};

interface FormError {
  key: string;
  value: string;
}

export const createFormError = (error: FormError | Array<FormError>) => {
  const errors = Array.isArray(error) ? error : [error];
  return createError({ status: 422, data: errors });
};

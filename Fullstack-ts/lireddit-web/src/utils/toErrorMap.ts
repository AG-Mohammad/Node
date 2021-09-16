import { FieldError } from "../generated/graphql";

export const toErrorMap = (err: FieldError[]) => {
  const errMap: Record<string, string> = {};
  err.forEach(({ field, msg }) => {
    errMap[field] = msg;
  });
  return errMap;
};

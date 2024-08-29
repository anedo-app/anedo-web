export const throwIfUndefined: <T>(
  x: T | undefined | null,
) => asserts x is T = (x) => {
  if (typeof x === "undefined") throw new Error("OH NOEZ");
};

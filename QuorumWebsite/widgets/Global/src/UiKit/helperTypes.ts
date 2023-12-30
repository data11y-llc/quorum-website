// /** split array into chunks of size n */
export type ValueOf<T> = T[keyof T];
export type KeysTuple<T> = { [K in keyof T]: keyof T[K] }[];
export type TupleToUnion<T extends readonly (keyof any)[]> = T[number];

export type Theme = [
  "light",
  "dark",
  "high-contrast",
];

export const ThemeArray: Theme = [
  "light",
  "dark",
  "high-contrast",
];


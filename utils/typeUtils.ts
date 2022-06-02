export type ArrayUnwrap<T> = T extends Array<infer U> ? U : T;

export type NextQueryField = string | string[] | null;

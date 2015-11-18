/** Returns `true` if `val` is `null` or `undefined`. */
export declare function nullish(...vals: any[]): boolean;
export declare function nonemptyString(str: string): boolean;
export declare function isEmptyObject(x: any): boolean;
export declare function intersperse<T>(thing: T): (into: any, each: any) => T[];
export declare function zip<T, U>(lhs: T[], rhs: U[]): [T, U][];
/** Tap functional pipelines with `.map(logthru)`. */
export declare function logthru<T>(val: T): T;
export declare function formatDict(dict: any): string;
export declare function ensureInt(thing: string | number, fallback?: number): number;
export declare function ensureBool(thing: any): boolean;

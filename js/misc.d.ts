/**
    Prevents stack overflows.
 */
export declare function async(fn: Function): void;
/** Returns `true` if `val` is `null` or `undefined`. */
export declare function nullish(...vals: any[]): boolean;
export declare function nonemptyString(str: string): boolean;
export declare function isEmptyObject(x: any): boolean;
export declare function intersperse<T>(thing: T): (into: any, each: any) => T[];
export declare function zip<T, U>(lhs: T[], rhs: U[]): [T, U][];
/** Tap functional pipelines with `.map(logthru)`. */
export declare function logthru<T>(val: T): T;
export declare function formatDict(dict: any): string;
/**
    Takes a `string` or a `number`, and returns a number (by parsing the string if necessary).  Good for converting query string
    parameters and other things that the browser always gives you as a string.  If this function is given a string it can't
    parse, it returns the value of the argument `fallback` (0 by default).  `ensureInt()` never throws exceptions.
 */
export declare function ensureInt(thing: string | number, fallback?: number): number;
export declare function ensureBool(thing: any): boolean;
/**
    Bounds `n` to within (min, max), inclusive.
 */
export declare function bound(n: number, min: number, max: number): number;
export declare function defaults(orig: Object, defaults: Object): Object;
/**
    Intended to be passed as the fourth argument of `_.assign(...)`.  Causes any object properties
    to be recursively merged rather than overwriting one another.
 */
export declare function assignAvailableProperties(value: any, other: any): any;
/**
    Returns `true` if `arr` contains `elem`, otherwise `false`.
 */
export declare function contains<T>(arr: T[], elem: T): boolean;

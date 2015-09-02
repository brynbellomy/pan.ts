
declare module pants {
    /** Returns `true` if `val` is `null` or `undefined`. */
    export function nullish(...vals: any[]): boolean;
    export function nonemptyString(str: string): boolean;
    export function intersperse<T>(thing: T): (into: any, each: any) => T[];
    export function zip<T, U>(lhs: T[], rhs: U[]): [T, U][];
    /** Tap functional pipelines with `.map(logthru)`. */
    export function logthru<T>(val: T): T;
    export function formatDict(dict: any): string;
    
}

declare module 'pan.ts' {
    export = pants;
}

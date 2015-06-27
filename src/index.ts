

/** Returns `true` if `val` is `null` or `undefined`. */
export function nullish (val:any): boolean {
    return val === null || val === undefined
}

export function intersperse <T> (thing: T) {
    return function (into, each): T[] {
        return into.concat(each, thing)
    }
}

export function zip <T, U> (lhs: T[], rhs: U[]) {
    return lhs.reduce(function (into: Array<[T, U]>, each: T) {
        into.push([each, rhs.shift()])
        return into
    }, [])
}

/** Tap functional pipelines with `.map(logthru)`. */
export function logthru <T> (val: T): T {
    console.log('log: ', val)
    return val
}

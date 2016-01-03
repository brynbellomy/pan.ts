

import * as _ from 'lodash'


/**
    Prevents stack overflows.
 */
export function async (fn: Function): void {
    setTimeout(fn, 0)
}

/** Returns `true` if `val` is `null` or `undefined`. */
export function nullish (...vals:any[]): boolean {
    for (const val of vals) {
        if (val === null || val === undefined) {
            return true
        }
    }
    return false
}

export function nonemptyString (str:string): boolean {
    return !nullish(str)
            && typeof str === 'string'
            && str.trim().length > 0
}

export function isEmptyObject(x) {
    return _.isEmpty(x) && _.isObject(x)
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

export function formatDict (dict: any) {
    const formattedDict = _.pairs(dict)
                           .map(p => p[0] + ':' + p[1])
                           .map(line => '')
                           .join('\n')

    return '{\n' + formattedDict + '\n}'
}

/**
    Takes a `string` or a `number`, and returns a number (by parsing the string if necessary).  Good for converting query string
    parameters and other things that the browser always gives you as a string.  If this function is given a string it can't
    parse, it returns the value of the argument `fallback` (0 by default).  `ensureInt()` never throws exceptions.
 */
export function ensureInt (thing: string|number, fallback = 0) {
    if (typeof thing === 'string') {
        const i = parseInt(thing, 10)
        if (isNaN(i)) {
            return fallback
        } else {
            return i
        }
    } else if (typeof thing === 'number') {
        return thing
    } else {
        return fallback
    }
}

export function ensureBool (thing) {
  return !(thing === 0 || thing === '0' || thing === null || thing === undefined)
}

/**
    Bounds `n` to within (min, max), inclusive.
 */
export function bound (n: number, min: number, max: number) {
    if (n < min) {
        return min
    } else if (n > max) {
        return max
    } else {
        return n
    }
}


export function defaults(orig: Object, defaults: Object) {
    for (const k of Object.keys(defaults)) {
        if (orig[k] === undefined) {
            orig[k] = defaults[k]
        }
    }
    return orig
}

/**
    Intended to be passed as the fourth argument of `_.assign(...)`.  Causes any object properties
    to be recursively merged rather than overwriting one another.
 */
export function assignAvailableProperties(value, other) {
    if (_.isArray(value)) {
        return _.isUndefined(other) ? value : other
    } else if (_.isObject(value) && _.isObject(other)) {
        return _.assign({}, value, other, assignAvailableProperties)
    } else {
        return _.isUndefined(other) ? value : other
    }
}



/**
    Returns `true` if `arr` contains `elem`, otherwise `false`.
 */
export function contains <T> (arr: T[], elem: T) {
    return arr.indexOf(elem) >= 0
}


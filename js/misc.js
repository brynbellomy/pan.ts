var _ = require('lodash');
/**
    Prevents stack overflows.
 */
function async(fn) {
    setTimeout(fn, 0);
}
exports.async = async;
/** Returns `true` if `val` is `null` or `undefined`. */
function nullish() {
    var vals = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        vals[_i - 0] = arguments[_i];
    }
    for (var _a = 0, vals_1 = vals; _a < vals_1.length; _a++) {
        var val = vals_1[_a];
        if (val === null || val === undefined) {
            return true;
        }
    }
    return false;
}
exports.nullish = nullish;
function nonemptyString(str) {
    return !nullish(str)
        && typeof str === 'string'
        && str.trim().length > 0;
}
exports.nonemptyString = nonemptyString;
function isEmptyObject(x) {
    return _.isEmpty(x) && _.isObject(x);
}
exports.isEmptyObject = isEmptyObject;
function intersperse(thing) {
    return function (into, each) {
        return into.concat(each, thing);
    };
}
exports.intersperse = intersperse;
function zip(lhs, rhs) {
    return lhs.reduce(function (into, each) {
        into.push([each, rhs.shift()]);
        return into;
    }, []);
}
exports.zip = zip;
/** Tap functional pipelines with `.map(logthru)`. */
function logthru(val) {
    console.log('log: ', val);
    return val;
}
exports.logthru = logthru;
function formatDict(dict) {
    var formattedDict = _.pairs(dict)
        .map(function (p) { return p[0] + ':' + p[1]; })
        .map(function (line) { return ''; })
        .join('\n');
    return '{\n' + formattedDict + '\n}';
}
exports.formatDict = formatDict;
/**
    Takes a `string` or a `number`, and returns a number (by parsing the string if necessary).  Good for converting query string
    parameters and other things that the browser always gives you as a string.  If this function is given a string it can't
    parse, it returns the value of the argument `fallback` (0 by default).  `ensureInt()` never throws exceptions.
 */
function ensureInt(thing, fallback) {
    if (fallback === void 0) { fallback = 0; }
    if (typeof thing === 'string') {
        var i = parseInt(thing, 10);
        if (isNaN(i)) {
            return fallback;
        }
        else {
            return i;
        }
    }
    else if (typeof thing === 'number') {
        return thing;
    }
    else {
        return fallback;
    }
}
exports.ensureInt = ensureInt;
function ensureBool(thing) {
    return !(thing === 0 || thing === '0' || thing === null || thing === undefined);
}
exports.ensureBool = ensureBool;
/**
    Bounds `n` to within (min, max), inclusive.
 */
function bound(n, min, max) {
    if (n < min) {
        return min;
    }
    else if (n > max) {
        return max;
    }
    else {
        return n;
    }
}
exports.bound = bound;
function defaults(orig, defaults) {
    for (var _i = 0, _a = Object.keys(defaults); _i < _a.length; _i++) {
        var k = _a[_i];
        if (orig[k] === undefined) {
            orig[k] = defaults[k];
        }
    }
    return orig;
}
exports.defaults = defaults;
/**
    Intended to be passed as the fourth argument of `_.assign(...)`.  Causes any object properties
    to be recursively merged rather than overwriting one another.
 */
function assignAvailableProperties(value, other) {
    if (_.isArray(value)) {
        return _.isUndefined(other) ? value : other;
    }
    else if (_.isObject(value) && _.isObject(other)) {
        return _.assign({}, value, other, assignAvailableProperties);
    }
    else {
        return _.isUndefined(other) ? value : other;
    }
}
exports.assignAvailableProperties = assignAvailableProperties;
/**
    Returns `true` if `arr` contains `elem`, otherwise `false`.
 */
function contains(arr, elem) {
    return arr.indexOf(elem) >= 0;
}
exports.contains = contains;
//# sourceMappingURL=misc.js.map
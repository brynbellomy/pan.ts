var _ = require('lodash');
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
//# sourceMappingURL=misc.js.map
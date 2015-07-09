/** Returns `true` if `val` is `null` or `undefined`. */
function nullish() {
    var vals = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        vals[_i - 0] = arguments[_i];
    }
    for (var _a = 0; _a < vals.length; _a++) {
        var val = vals[_a];
        if (val === null || val === undefined) {
            return true;
        }
    }
    return false;
}
exports.nullish = nullish;
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

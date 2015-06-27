/** Returns `true` if `val` is `null` or `undefined`. */
function nullish(val) {
    return val === null || val === undefined;
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

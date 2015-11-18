/**
    Utility function that generates instances of a class.
 */
function construct(constructor, args) {
    var c = function () {
        return constructor.apply(this, args);
    };
    c.prototype = constructor.prototype;
    c.name = constructor.name;
    return new c();
}
exports.construct = construct;
/**
    Simplifies the creation of class decorators for the most common use case.  Example:

        const debugPrintable = utils.makeClassDecorator(function (original, ...args) {
            const obj = utils.construct(original, args)
            obj.debugPrint = function () { console.debug(this) }.bind(obj)
            return obj
        })

        @debugPrintable
        class Blah {
            hello = 'yarrr'

            constructor() {
                console.log('original constructor', this)      // "{hello: 'yarrr'}"
                console.log('instance?', this instanceof Blah) // "true"
            }

            debugPrint: () => void;
        }

        const x = new Blah()
        x.debugPrint()         // works

 */
function makeClassDecorator(closure) {
    return function (target) {
        // save a reference to the original constructor
        var original = target;
        // the new constructor behaviour
        var wrapper = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return closure.bind(this, original, args)();
        };
        // copy prototype so intanceof operator still works
        wrapper.prototype = original.prototype;
        // return new constructor (will override original)
        return wrapper;
    };
}
exports.makeClassDecorator = makeClassDecorator;
//# sourceMappingURL=utils.js.map
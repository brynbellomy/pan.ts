/**
    For ease of reference, this is pasted from Typescript's lib.d.ts file.

    interface TypedPropertyDescriptor<T> {
        enumerable?: boolean;
        configurable?: boolean;
        writable?: boolean;
        value?: T;
        get?: () => T;
        set?: (value: T) => void;
    }

    declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
    declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
    declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
    declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
 */
var index_1 = require('./index');
exports.override = function (target, propertyKey, descriptor) {
    if (Object.getPrototypeOf(target)[propertyKey] === undefined) {
        throw new Error(propertyKey + " does not override a member of its superclass");
    }
};
exports.readonly = function (target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
};
/**

    Method decorator factory.  Logs the input arguments and return value of the decorated method.  Ex:

    <pre><code>
    class Thing {
        \@logMethod('Thing:', { args: true })
        doSomeMysteriousAction() {
            // ...
        }
    }
    </code></pre>

 */
function logMethod(prefix, opts) {
    if (opts === void 0) { opts = {}; }
    return function (target, propertyKey, descriptor) {
        var originalFunc = descriptor.value;
        descriptor.value = _.wrap(originalFunc, function (originalFn) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var returnValue = originalFn.apply(void 0, args);
            var message = [prefix, propertyKey, '(', (opts.args === true ? args : null), ')', '=>']
                .filter(function (part) { return !index_1.nullish(part); }) // prefix or args might be null
                .join(' ');
            console.log(message, returnValue);
            return returnValue;
        });
        return descriptor;
    };
}
exports.logMethod = logMethod;
function logAfterMethod(prefix, closure) {
    return function (target, propertyKey, descriptor) {
        var originalFunc = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var returnValue = originalFunc.apply(this, args);
            var message = closure(this, returnValue);
            if (!index_1.nullish(prefix)) {
                console.log(prefix, message);
            }
            else {
                console.log(message);
            }
            return returnValue;
        };
        return descriptor;
    };
}
exports.logAfterMethod = logAfterMethod;
var utils;
(function (utils) {
    /** Utility function that generates instances of a class. */
    function construct(constructor, args) {
        var c = function () {
            return constructor.apply(this, args);
        };
        c.prototype = constructor.prototype;
        c.name = constructor.name;
        return new c();
    }
    utils.construct = construct;
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
    utils.makeClassDecorator = makeClassDecorator;
})(utils = exports.utils || (exports.utils = {}));
exports.debugPrintable = utils.makeClassDecorator(function (original) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var obj = utils.construct(original, args);
    function debugPrint() {
        console.debug('[ debug ]', this);
    }
    obj.debugPrint = debugPrint.bind(obj);
    return obj;
});
// export let logMethodInbound: MethodDecorator = function (prefix:string) {
//     return function (protoObj: Function, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
//         let originalFunc = descriptor.value
//         descriptor.value = function (...args: any[]) {
//             let prettyArgs = args.map((arg) => $.io.prettyFormat(arg)).join(', ')
//             logger.println(`${propertyKey}(${prettyArgs})`)
//             let result = originalFunc.apply(this, args)
//             return result
//         }
//         return descriptor
//     }
// }

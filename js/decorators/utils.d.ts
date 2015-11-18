/**
    Utility function that generates instances of a class.
 */
export declare function construct(constructor: any, args: any[]): any;
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
export declare function makeClassDecorator<C>(closure: (original: any, args: any[]) => C): (target: any) => any;

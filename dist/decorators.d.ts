
declare module pants {
    export var override: MethodDecorator | PropertyDecorator;
    export var readonly: MethodDecorator;
    export interface ILogMethodDecoratorOptions {
        args?: boolean;
    }
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
    export function logMethod(prefix: string, opts?: ILogMethodDecoratorOptions): MethodDecorator;
    export function logAfterMethod(prefix: string, closure: (self?: any, retval?: any) => any): MethodDecorator;
    export interface ConstructorOf<C> {
        new (...args: any[]): C;
    }
    export module utils {
        /** Utility function that generates instances of a class. */
        function construct(constructor: any, args: any[]): any;
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
        function makeClassDecorator<C>(closure: (original: any, args: any[]) => C): (target: any) => any;
    }
    export var debugPrintable: (target: any) => any;
    
}

declare module 'pan.ts' {
    export = pants;
}

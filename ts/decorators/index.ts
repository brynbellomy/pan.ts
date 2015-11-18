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

import { nullish } from '../misc'
import * as utils from './utils'
export { utils }


export var override: MethodDecorator|PropertyDecorator = function (target:any, propertyKey:string, descriptor?:TypedPropertyDescriptor<any>) {
    if (Object.getPrototypeOf(target)[propertyKey] === undefined) {
        throw new Error(`${propertyKey} does not override a member of its superclass`);
    }
}

export var readonly: MethodDecorator = function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
    descriptor.writable = false
    return descriptor
}

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
export function logMethod (prefix: string, opts: ILogMethodDecoratorOptions = {}): MethodDecorator {
    return function <T extends Function> (target, propertyKey, descriptor:TypedPropertyDescriptor<T>) {
        const originalFunc = descriptor.value

        descriptor.value = <T> _.wrap(originalFunc, function (originalFn, ...args: any[]) {
            const returnValue = originalFn(...args)
            const message = [ prefix, propertyKey, '(', (opts.args === true ? args : null), ')', '=>' ]
                                .filter(part => !nullish(part)) // prefix or args might be null
                                .join(' ')

            console.log(message, returnValue)

            return returnValue
        })
        return descriptor
    }
}

export function logAfterMethod (prefix:string, closure: (self?:any, retval?:any) => any): MethodDecorator {
    return function <T extends Function> (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
        const originalFunc = descriptor.value

        descriptor.value = <T><any> function (...args: any[]) {
            const returnValue = originalFunc.apply(this, args)

            const message = closure(this, returnValue)
            if (!nullish(prefix)) {
                console.log(prefix, message)
            }
            else {
                console.log(message)
            }

            return returnValue
        }
        return descriptor
    }
}

export interface ConstructorOf <C> {
    new(...args:any[]): C
}


export var debugPrintable = utils.makeClassDecorator(function (original: any, ...args) {
    const obj: any = utils.construct(original, args)

    function debugPrint () {
        console.debug('[ debug ]', this)
    }
    obj.debugPrint = debugPrint.bind(obj)

    return obj
})

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


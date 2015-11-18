import * as utils from './utils';
export { utils };
export declare var override: MethodDecorator | PropertyDecorator;
export declare var readonly: MethodDecorator;
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
export declare function logMethod(prefix: string, opts?: ILogMethodDecoratorOptions): MethodDecorator;
export declare function logAfterMethod(prefix: string, closure: (self?: any, retval?: any) => any): MethodDecorator;
export interface ConstructorOf<C> {
    new (...args: any[]): C;
}
export declare var debugPrintable: (target: any) => any;

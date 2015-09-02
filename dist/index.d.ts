
declare module pants {
    export * from './misc';
    export import decorators = require('./decorators');
    
}

declare module 'pan.ts' {
    export = pants;
}

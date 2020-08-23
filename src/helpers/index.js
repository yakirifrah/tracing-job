import { parse, stringify } from 'flatted/esm';


export const loggerMobx = (...args) => console.log(...args.map(arg => !arg ? arg : parse(stringify(arg))));

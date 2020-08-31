import { parse, stringify } from 'flatted/esm';


export const loggerMobx = (...args) => console.log(...args.map(arg => !arg ? arg : parse(stringify(arg))));

export const showName = (str) => {
  if (str.split(' ').length === 1)
    return str;
  return str.split(' ')[0][0] + str.split(' ')[1][0];
};

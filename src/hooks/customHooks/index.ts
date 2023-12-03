import { Context } from 'vm';

export type PickSingle<TObj, TProp extends keyof TObj> = TObj[TProp];

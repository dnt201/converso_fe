import { iOption } from '@interfaces/index';

export const findOptionByValue = (value: string, options: iOption[]): iOption | undefined => {
   return options.find((item) => item.value === value) ?? undefined;
};

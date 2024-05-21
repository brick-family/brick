import { uiPrefix } from '../../variables';

export const generatorClass = (className: string) => {
  return `${uiPrefix}-${className}`;
};

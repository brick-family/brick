let umiHistory: any = {};

export const setUmiHistory = (history: any) => {
  umiHistory = history;
};

const push = (to: string, state?: any) => {
  umiHistory?.push(to, state);
};

const replace = (to: string, state?: any) => {
  umiHistory?.replace(to, state);
};

const go = (index: number) => {
  umiHistory?.go(index);
};

export const history = { push, replace, go };
export default history;

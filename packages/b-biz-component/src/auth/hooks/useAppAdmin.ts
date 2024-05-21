import { useGlobalSelector } from '@brick/processor';

/**
 * 是否是app管理员
 */
export const useAppAdmin = () => {
  const [isAppAdmin] = useGlobalSelector((s) => [s.isAppAdmin]);

  return { isAppAdmin };
};

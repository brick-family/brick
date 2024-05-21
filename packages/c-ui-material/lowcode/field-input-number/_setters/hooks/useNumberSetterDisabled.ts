import { usePropsValue, useReRenderEvent } from '../../../_hooks';
import { EColumnDecimalFormat } from '@brick/types';

export const useNumberSetterDisabled = (props: any) => {
  useReRenderEvent();
  const { getPropValue } = usePropsValue(props);
  const format = getPropValue('columnConfig.format');
  const isDisabled = format == EColumnDecimalFormat.percent;

  return {
    isDisabled,
  };
};

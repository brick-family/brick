import { EFieldType, TFieldType } from '@brick/types';
import { IDataRenderProps } from '../types';
import { RadioRender } from '../radio-render';
import { ImageRender } from '../image-render';
import { NumberRender } from '../number-render';
import { DateRender } from '../date-render/DateRender';
import { RelationRender } from '../relation-render';
import { SelectRender } from '../select-render';

const RENDER_MAP: Record<string, any> = {
  [EFieldType.RADIO]: RadioRender,
  [EFieldType.IMAGE]: ImageRender,
  [EFieldType.DECIMAL]: NumberRender,
  [EFieldType.DATE]: DateRender,
  [EFieldType.FILE]: FileReader,
  [EFieldType.RELATION]: RelationRender,
  [EFieldType.SELECT]: SelectRender,
};

export const createDataRender = (fieldType: TFieldType, props: IDataRenderProps) => {
  const RenderComponent = RENDER_MAP[fieldType];
  if (!RenderComponent) {
    return props.value;
  }
  return <RenderComponent {...props} />;
};

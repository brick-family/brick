import { EFieldType, IColumnEntity } from '@brick/types';

/**
 * Form Item Props
 */
export interface IFormItemProps {
  value?: any;
  onChange?: (value: any) => void;
}

export interface IBaseFieldProps<T extends EFieldType = EFieldType>
  extends Pick<IColumnEntity<T>, 'title' | 'columnConfig'>,
    IFormItemProps {
  style?: React.CSSProperties;
  className?: string;
}

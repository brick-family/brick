import * as React from 'react';
import { BaseWrapper, BaseWrapperProps } from '../base';
import './fieldSelect.less';
import { useFormContainerSelector } from '../../form-container';
import { FieldSelectMobile } from './FieldSelectMobile';
import { EFieldType } from '@brick/types';
import { BaseFieldSelect } from '@brick/biz-component';

export interface IFieldSelectProps extends BaseWrapperProps<EFieldType.SELECT> {
  placeholder: string;
  defaultValue: any;
}

export const FieldSelect: React.FC<IFieldSelectProps> = function FieldSelect(props) {
  const [isMobile] = useFormContainerSelector((s) => [s.isMobile]);
  return (
    <BaseWrapper {...props}>
      {isMobile && <FieldSelectMobile {...props} />}
      {!isMobile && <BaseFieldSelect {...props} />}
    </BaseWrapper>
  );
};

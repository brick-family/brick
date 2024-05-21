import * as React from 'react';
// import type { ChangeEvent } from 'antd';
import { BaseWrapper, BaseWrapperProps } from '../base';
import './fieldInput.less';
import { useFormContainerSelector } from '../../form-container';
import { FieldInputWeb } from './FieldInputWeb';
import { EFieldType } from '@brick/types';

export interface IFieldInputProps extends BaseWrapperProps<EFieldType.STRING> {}

export const FieldInput: React.FC<IFieldInputProps> = function FieldInput(props) {
  const [isMobile] = useFormContainerSelector((s) => [s.isMobile]);

  return (
    <BaseWrapper {...props}>
      {isMobile && <FieldInputWeb {...props} />}
      {!isMobile && <FieldInputWeb {...props} />}
    </BaseWrapper>
  );
};

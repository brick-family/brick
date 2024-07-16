import React from 'react';

import { BRichEditor } from '@brick/component';
import { EFieldType } from '@brick/types';
import { Input } from 'antd';
import { BaseFieldInputNumber } from './base-field-input-number';
import { BaseFieldDate } from './base-field-date';
import { BaseFieldFile } from './base-field-file';
import { BaseFieldImage } from './base-field-image';
import { BaseFieldRadio } from './base-field-radio';
import { BaseFieldSelect } from './base-field-select';
import { BaseFieldUserSelect } from './base-field-user-select';

/**
 * 基础字段组件映射关系
 */
export const FIELD_MAP: Record<string, React.FunctionComponent<any>> = {
  [EFieldType.STRING]: Input,
  [EFieldType.TEXT]: Input.TextArea,
  [EFieldType.RICH]: BRichEditor,
  [EFieldType.DECIMAL]: BaseFieldInputNumber,
  [EFieldType.FILE]: BaseFieldFile,
  [EFieldType.IMAGE]: BaseFieldImage,
  [EFieldType.DATE]: BaseFieldDate,
  [EFieldType.RADIO]: BaseFieldRadio,
  [EFieldType.SELECT]: BaseFieldSelect,
  [EFieldType.USER]: BaseFieldUserSelect,
};

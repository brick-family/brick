import {
  CloseOutlined,
  CopyOutlined,
  DownOutlined,
  LockOutlined,
  UnlockOutlined,
  UpOutlined,
} from '@ant-design/icons';
import * as React from 'react';
import type { Controls, FullField, Translations } from 'react-querybuilder';
import { getCompatContextProvider } from 'react-querybuilder';
import { AntDActionElement } from './AntDActionElement';
import { AntDDragHandle } from './AntDDragHandle';
import { AntDNotToggle } from './AntDNotToggle';
import { AntDShiftActions } from './AntDShiftActions';
import { AntDValueEditor } from './antd-value-editor';
import { AntDValueSelector } from './AntDValueSelector';
import { AntDAddGroupAction, AntdAddRuleAction } from './component';
import { AntDFieldSelector } from './component/field-selector';

export * from './AntDActionElement';
export * from './AntDDragHandle';
export * from './AntDNotToggle';
export * from './AntDShiftActions';
export * from './antd-value-editor/AntDValueEditor';
export * from './AntDValueSelector';

export const antdControlElements = {
  actionElement: AntDActionElement,
  addGroupAction: AntDAddGroupAction,
  addRuleAction: AntdAddRuleAction,
  dragHandle: AntDDragHandle,
  notToggle: AntDNotToggle,
  shiftActions: AntDShiftActions,
  valueEditor: AntDValueEditor,
  valueSelector: AntDValueSelector,
  fieldSelector: AntDFieldSelector,
} as Partial<Controls<FullField, string>>;

export const antdTranslations = {
  removeGroup: { label: <CloseOutlined /> },
  removeRule: { label: <CloseOutlined /> },
  cloneRule: { label: <CopyOutlined /> },
  cloneRuleGroup: { label: <CopyOutlined /> },
  lockGroup: { label: <UnlockOutlined /> },
  lockRule: { label: <UnlockOutlined /> },
  lockGroupDisabled: { label: <LockOutlined /> },
  lockRuleDisabled: { label: <LockOutlined /> },
  shiftActionUp: { label: <UpOutlined /> },
  shiftActionDown: { label: <DownOutlined /> },
} as Partial<Translations>;

export const QueryBuilderAntD = getCompatContextProvider({
  key: 'antd',
  controlElements: antdControlElements,
  translations: antdTranslations,
});

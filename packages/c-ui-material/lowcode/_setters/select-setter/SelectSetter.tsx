import React, { FC } from 'react';
import { Select } from 'antd';
import { SetterHoc } from '../../common';
import { useReRenderEvent } from '../../_hooks';

const formateOptions = (options: any[]) => {
  return options.map((item: any) => {
    if (item.children) {
      const children = item.children.map((child: any) => {
        return {
          label: child.title || child.label || '-',
          value: child.value,
          disabled: child.disabled || false,
        };
      });
      return {
        label: item.title || item.label || '-',
        children,
      };
    } else {
      return {
        label: item.title || item.label || '-',
        value: item.value,
        disabled: item.disabled || false,
      };
    }
  });
};

export interface ISelectSetterProps {
  onChange: (value: string) => void;
  // 值变化后惊醒的事件通信
  onChangeEvent?: (value: string) => void;

  // 值变化后是否触发ReRender事件
  changeReRenderEvent?: boolean;
  value?: any;
  mode?: 'single' | 'multiple' | 'tag';
  defaultValue?: any;
  options: any[];
  /**
   * 展开后是否能搜索
   */
  showSearch?: boolean;

  placeholder?: string;
}

export const SelectSetterFun: FC<ISelectSetterProps> = (props) => {
  const {
    options = [],
    onChange,
    mode,
    value,
    showSearch,
    onChangeEvent,
    changeReRenderEvent = false,
  } = props;

  const dataSource = formateOptions(options);

  const { sendReRenderEvent } = useReRenderEvent({ isBindEvent: false });
  return (
    <Select
      style={{ width: '100%' }}
      value={value}
      size={'small'}
      options={dataSource}
      onChange={(val) => {
        onChange?.(val);
        onChangeEvent?.(val);
        changeReRenderEvent && sendReRenderEvent();
      }}
      placeholder={props.placeholder || '请选择'}
      showSearch={showSearch}
    />
  );
};

export const SelectSetter = SetterHoc(SelectSetterFun);

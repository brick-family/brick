import React, { FC } from 'react';
import { Switch } from 'antd';
import { SetterHoc } from '../../../common';
import { useNumberSetterDisabled } from '../hooks';

export interface IThousandsHooksSetterProps {
  value: boolean;
  disabled: boolean;
  defaultValue: any;
  onChange: (val: number) => void;
}

// 千分位设置
const ThousandsHooksSetterFun: FC<IThousandsHooksSetterProps> = (props) => {
  const { onChange, value } = props;
  const { isDisabled } = useNumberSetterDisabled(props);
  return (
    <Switch
      className="switch-style"
      disabled={isDisabled}
      checked={isDisabled ? false : value}
      size="small"
      onChange={(checked: boolean) => onChange(checked ? 1 : 0)}
    />
  );
};

export const ThousandsBoolSetter = SetterHoc(ThousandsHooksSetterFun);

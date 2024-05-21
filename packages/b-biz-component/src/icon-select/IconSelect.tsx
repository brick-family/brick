import { BIcon, getColor } from '@brick/component';
import { useMemoizedFn } from 'ahooks';
import { Dropdown, Tabs, TabsProps, theme } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import s from './iconSelect.less';
import { SystemPanel } from './components/SystemPanel';
import { CustomerPanel } from './components/CustomerPanel';
import classNames from 'classnames';
import { isWhite } from '@brick/utils';

const { useToken } = theme;

export interface IIconData {
  type: 'icon' | 'customer';
  color?: string;
  value: string;
}
export interface IIconSelectProps {
  type: 'app' | 'normal';
  data?: IIconData;
  /**
   * 是否只读
   */
  readonly?: boolean;
  onChange?: (value: IIconData) => void;
  defaultSelectFirst?: boolean;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const IconSelect: FC<IIconSelectProps> = ({
  data,
  type,
  readonly,
  onChange,
  defaultSelectFirst = true,
  size = 46,
  style,
  className,
  ...otherProps
}) => {
  const { token } = useToken();

  const [value, setValue] = useState<IIconData>(
    data || { type: 'icon', value: 'jurassic_admin', color: 'rgb(255, 255, 255)' }
  );

  useEffect(() => {
    if (data) {
      setValue(data);
    }
  }, [data]);

  const onChangeBySystemPanel = useMemoizedFn((data) => {
    const newValue = {
      ...value,
      ...data,
    };
    setValue(newValue);
    onChange?.(newValue);
  });

  useEffect(() => {
    if (defaultSelectFirst) {
      onChangeBySystemPanel({ type: 'icon', value: 'jurassic_admin', color: 'rgb(255, 255, 255)' });
    }
  }, [defaultSelectFirst]);

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const onTabChange = useMemoizedFn(() => {});

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `系统图标`,
      children: <SystemPanel data={value} onChange={onChangeBySystemPanel} />,
    },
    {
      key: '2',
      label: `自定义`,
      children: <CustomerPanel />,
    },
  ];

  const dropdownRender = () => {
    return (
      <div style={contentStyle} className={s.iconSelect}>
        <Tabs
          tabBarStyle={{ margin: 0 }}
          centered
          size="small"
          defaultActiveKey="1"
          items={items}
          onChange={onTabChange}
        />
      </div>
    );
  };

  const labelJsx = () => {
    return <BIcon style={{ fontSize: 20 }} type={`icon-${value?.value}`} />;
  };

  const appLabelJsx = () => {
    const currIsWhite = isWhite(value.color!);
    return (
      <div
        className={classNames(s.appLabel, className, {
          [s.border]: currIsWhite,
        })}
        style={
          {
            background: getColor(value?.color!) || 'unset',
            width: size,
            height: size,
            ...style,
          } as any
        }
      >
        <BIcon
          style={{ fontSize: size - 10, color: !currIsWhite ? '#fff' : 'unset' }}
          type={`icon-${value?.value}`}
        />
      </div>
    );
  };

  const label = type === 'app' ? appLabelJsx() : labelJsx();

  if (readonly) {
    return label;
  }
  return (
    <Dropdown
      // open={true}
      trigger={['click']}
      dropdownRender={dropdownRender}
    >
      {label}
    </Dropdown>
  );
};

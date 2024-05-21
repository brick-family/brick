import { BColorSelect, BIcon } from '@brick/component';
import { useMemoizedFn } from 'ahooks';
import { Empty, Tooltip } from 'antd';
import React, { useState } from 'react';
import jsonList from '../icon.json';
import s from '../iconSelect.less';
import { ProCard } from '@ant-design/pro-components';
import classNames from 'classnames';
import { IIconData } from '../IconSelect';

export interface ISystemPanel {
  onChange: (data: Partial<IIconData>) => void;
  data: Partial<IIconData>;
}
export const SystemPanel = ({ onChange, data }: ISystemPanel) => {
  const [searchList, setSearchList] = useState(jsonList.glyphs);

  const handleSearch = useMemoizedFn((val: string) => {
    if (!val.trim()) {
      setSearchList(jsonList.glyphs);
      return;
    }
    const result = jsonList.glyphs.filter((f) => f.name.includes(val));
    setSearchList(result);
  });

  const handleClick = useMemoizedFn((item) => {
    onChange?.({
      value: item.font_class,
    });
  });

  const handleColorClick = useMemoizedFn((item) => {
    onChange?.({
      color: item,
    });
  });

  return (
    <ProCard
      className={s.system}
      // title={<ColorSelect color={data.color} onSelect={handleColorClick} />}
      title={<BColorSelect.Recommand hasReset color={data.color} onSelect={handleColorClick} />}
    >
      {searchList.length === 0 && <Empty description="暂无图标" />}
      <div className={s.icon}>
        {searchList?.map((item) => {
          return (
            <Tooltip title={item.name}>
              <div
                className={classNames(s.item, {
                  [s.select]: item.font_class === data.value,
                })}
                onClick={() => handleClick(item)}
              >
                <BIcon style={{ fontSize: 20 }} type={`icon-${item.font_class}`} />
              </div>
            </Tooltip>
          );
        })}
      </div>
    </ProCard>
  );
};

import React, { FC, useEffect, useState } from 'react';
import { SetterHoc } from '../../common';
import { BColorSelect, BSortableList, ISortableBaseItem } from '@brick/component';
import { Button, Checkbox, Input, Radio, Space } from 'antd';
import { IColumnCommonOptions } from '@brick/types';
import { useMemoizedFn, useUpdate } from 'ahooks';
import { DeleteOutlined } from '@ant-design/icons';
import s from './optionsSetter.module.less';
import { uuid } from '@brick/core';
import { usePropsValue } from '../../_hooks';
import { ColorSetting, hasColorKey } from './commponents';
import { colorList } from '@brick/component/src/color-select/utils';

export type TOptionItem = ISortableBaseItem & IColumnCommonOptions;

export interface IOptionsSetterProps {
  onChange: (value: Array<TOptionItem>) => undefined;
  value: Array<TOptionItem>;
  initialValue: Array<TOptionItem>;
  options: Array<TOptionItem>;
  type: 'radio' | 'checkbox';
}

const OptionsSetterFun: FC<IOptionsSetterProps> = (props) => {
  const { value, type, options, onChange, initialValue } = props;

  const update = useUpdate();
  const convertItems = useMemoizedFn((data: Array<TOptionItem>) => {
    console.log('q=>convertItems', data, value, initialValue);
    return data?.map((item) => {
      return {
        ...item,
        id: item.value, //item.value,
      };
    });
  });

  const [items, _set] = useState(convertItems(value || initialValue));
  // const [items, setItems] = useState<ISortableBaseItem[]>([{ id: '1' }, { id: '2' }, { id: '3' }]);
  const { getPropValue, setPropsValue } = usePropsValue(props);
  const defaultValue = getPropValue('columnConfig.defaultValue');
  const hasColor = getPropValue(hasColorKey);

  console.log('q=>init-value', initialValue);
  useEffect(() => {
    if (hasColor) {
      const newItems = items.map((item, index) => {
        return {
          ...item,
          color: item.color || colorList[index % colorList.length],
        };
      });
      setItems(newItems);
    }
  }, [hasColor]);

  const setItems = (values: any) => {
    _set(values);
    onChange?.(values);
  };

  const changeItems = (value: string, changeKey: string, currItem: TOptionItem) => {
    const newItems = items.map((f) => {
      if (f.id == currItem.id) {
        if (changeKey == 'value') {
          return { ...f, [changeKey]: value, label: value };
        }
        return { ...f, [changeKey]: value };
      }
      return f;
    });
    setItems(newItems);
  };

  const handleNameChange = (value: string, item: TOptionItem) => {
    changeItems(value, 'label', item);
  };

  const handleSelect = (checked: boolean, item: TOptionItem) => {
    console.log('q=>checked', checked);
    if (type === 'radio') {
      setPropsValue('columnConfig.defaultValue', checked ? [item.value] : []);
    } else if (type === 'checkbox') {
      // 复选操作
      let newDefaultValue = defaultValue ? [...defaultValue] : [];
      if (checked) {
        newDefaultValue.push(item.value);
      } else {
        newDefaultValue = newDefaultValue.filter((f) => f != item.value);
      }
      setPropsValue('columnConfig.defaultValue', newDefaultValue);
    }

    update();
  };

  const handleColorSelect = (color: string, item: TOptionItem) => {
    changeItems(color, 'color', item);
  };

  const handleDelete = (item: TOptionItem) => {
    const newItems = items.filter((f) => f.id !== item.id);
    setItems(newItems);
  };
  const handleAdd = () => {
    const newColorIndex = items.length % colorList?.length;
    const currId = uuid();
    const newValues = [
      ...items,
      {
        id: currId,
        value: currId,
        label: '新选项',
        color: colorList?.[newColorIndex],
      },
    ];
    setItems(newValues);
  };

  const onSort = (items: any) => {
    console.log('q=>onSort', items);
    setItems(items);
  };

  const ItemComponent = type === 'radio' ? Radio : Checkbox;

  return (
    <div className={s.test}>
      <ColorSetting parentProps={props} update={update} />
      <BSortableList
        items={items}
        onSort={onSort}
        renderItem={(item) => {
          return (
            <BSortableList.Item key={item.id} className={s.sortItem} id={item.id}>
              <Space size={2} className={s.space} style={{ display: 'flex' }}>
                <BSortableList.DragHandle />
                <ItemComponent
                  style={{ marginRight: 2, marginLeft: 6 }}
                  checked={defaultValue?.includes(item.value)}
                  key={item.value}
                  onChange={(e) => handleSelect(e.target.checked, item)}
                ></ItemComponent>
                <Input
                  style={{ flex: 1, width: '100%' }}
                  value={item.label}
                  size={'small'}
                  onChange={(e: any) => handleNameChange(e.target?.value, item)}
                />
                {hasColor && (
                  <BColorSelect
                    style={{ display: 'flex' }}
                    color={item?.color}
                    size={'small'}
                    onSelect={(color) => handleColorSelect(color, item)}
                  />
                )}
                <DeleteOutlined
                  style={{ fontSize: 16, marginLeft: hasColor ? 0 : 6 }}
                  onClick={() => handleDelete(item)}
                />
              </Space>
            </BSortableList.Item>
          );
        }}
      />
      <Button style={{ marginTop: 4, marginLeft: 10 }} size={'small'} onClick={handleAdd}>
        添加选项
      </Button>
    </div>
  );
};

export const OptionsSetter = SetterHoc(OptionsSetterFun);

import React, { FC, useEffect, useState } from 'react';
import { Button, DatePicker, DatePickerProps, Input, InputNumber } from 'antd';
import { event } from '@alilc/lowcode-engine';
import { EFieldType, TFieldType } from '@brick/types';
import { SetterHoc } from '../../common';
import { usePropsValue, useReRenderEvent } from '../../_hooks';
import { DateFormatConstant } from '@brick/utils';
import dayjs from 'dayjs';
import { BaseFieldUserSelect } from '@brick/biz-component';

/**
 * 发送事件名称
 */
export enum EDefaultValueSetterEventName {
  ValueChange = 'ValueChange',
  ShowDialog = 'ShowDialog',
}

export interface IDefaultValueSetterProps {
  fieldType: TFieldType;
  field: any;
  onChange: (value: any) => void;
  value: string;
}

export const DefaultValueSetterFun: FC<IDefaultValueSetterProps> = ({
  onChange,
  value,
  fieldType,
  ...otherProps
}) => {
  const { getPropValue } = usePropsValue(otherProps);
  const format = getPropValue('columnConfig.format');
  const selectType = getPropValue('columnConfig.selectType');

  useEffect(() => {
    if (fieldType == EFieldType.USER) {
      if (format == 1) {
        onChange(undefined);
      } else {
        onChange([]);
      }
    }
  }, [JSON.stringify(format)]);

  useReRenderEvent();

  const handleValueChange = (e: any) => {
    onChange?.(e?.target?.value);
  };

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    // date.get().console.log(date, dateString);
    const currUnix = date?.valueOf();
    onChange(currUnix);
  };

  const getCustomItem = () => {
    switch (fieldType) {
      case EFieldType.STRING:
        return <Input value={value} onChange={handleValueChange} />;

      case EFieldType.TEXT:
        return <Input.TextArea value={value} onChange={handleValueChange} />;

      case EFieldType.DECIMAL:
        const formatCode = format == 2 ? '%' : '';
        console.log('q=>formatCode111', formatCode, format, value);
        return (
          <InputNumber
            size={'small'}
            style={{ width: '100%' }}
            value={value}
            formatter={(value) => `${value}${formatCode}`}
            parser={(value) => value!.replace(`${formatCode}`, '')}
            onChange={onChange}
          />
        );
      case EFieldType.DATE:
        const currFormat = DateFormatConstant.find((f) => f.value == format);
        console.log('q=>currFormat', currFormat);
        return (
          <DatePicker
            size={'small'}
            style={{ width: '100%' }}
            defaultValue={value ? dayjs(value) : undefined}
            // value={value ? dayjs(value) : null}
            // format={currFormat?.label}
            format={currFormat?.label || 'YYYY-MM-DD'}
            showTime={currFormat?.showTime}
            onChange={onDateChange}
          />
        );
      case EFieldType.USER:
        return (
          <BaseFieldUserSelect
            columnConfig={{
              selectType: selectType,
              status: 1,
              description: '',
              defaultValue: undefined,
              defaultValueType: '1',
            }}
            value={value}
            onChange={onChange}
          />
        );

      default:
        break;
    }
  };

  const handleEditFormula = () => {
    console.log('value', value);
    // 打开公式Dialog
    event.emit(EDefaultValueSetterEventName.ShowDialog, value);
  };

  const getFormulaItem = () => {
    return (
      <Button size="small" style={{ width: '100%' }} onClick={handleEditFormula}>
        编辑公式
      </Button>
    );
  };

  const getRelationItem = () => {
    return (
      <Button size="small" style={{ width: '100%' }} onClick={handleEditFormula}>
        数据联动
      </Button>
    );
  };

  const getItem = () => {
    const defaultValueType = getPropValue('columnConfig.defaultValueType');
    switch (defaultValueType) {
      // 自定义
      case '1':
        return getCustomItem();

      // 公式
      case '2':
        return getFormulaItem();

      // 数据联动
      case '3':
        return getRelationItem();

      // 填写当时
      case '4':
        return <></>;
      default:
        break;
    }
  };
  return <>{getItem()}</>;
};

export const DefaultValueSetterNew = SetterHoc(DefaultValueSetterFun);

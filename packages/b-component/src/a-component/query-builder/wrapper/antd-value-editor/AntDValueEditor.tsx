import { Checkbox, Input, InputNumber, Radio, Switch } from 'antd';
import generatePicker from 'antd/es/date-picker/generatePicker/index.js';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import * as React from 'react';
import type { ValueEditorProps } from 'react-querybuilder';
import { getFirstOption, joinWith, standardClassnames, useValueEditor } from 'react-querybuilder';
import dayjsGenerateConfig from '../dayjs';
import { IColumnEntity } from '@brick/types';
import classNames from 'classnames';
import s from './AntdValueEditor.module.less';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AntDValueEditorProps = ValueEditorProps & { extraProps?: Record<string, any> };

const DatePicker = generatePicker(dayjsGenerateConfig);

/**
 * PopupContainer容器
 * @param trigger
 */
const getPopupContainer = (trigger: HTMLElement) => {
  return (trigger?.parentNode?.parentNode || document.body) as any;
};

export const AntDValueEditor = (allProps: AntDValueEditorProps) => {
  const {
    fieldData = {},
    operator,
    value,
    handleOnChange,
    title,
    className,
    type,
    inputType,
    values = [],
    listsAsArrays,
    parseNumbers,
    separator,
    valueSource: _vs,
    disabled,
    testID,
    selectorComponent: SelectorComponent = allProps.schema.controls.valueSelector,
    extraProps,
    ...props
  } = allProps;

  // 字段类型
  const fieldType = (fieldData as IColumnEntity)?.fieldType;

  const cls = classNames(s.item, className);

  const { valueAsArray, multiValueHandler } = useValueEditor({
    handleOnChange,
    inputType,
    operator,
    value,
    type,
    listsAsArrays,
    parseNumbers,
    values,
  });

  console.log('q=>operator', operator, allProps, type);

  if (operator === 'null' || operator === 'notNull') {
    return <div className={cls}></div>;
  }

  const placeHolderText = '请输入';
  const inputTypeCoerced = ['in', 'notIn'].includes(operator) ? 'text' : inputType || 'text';

  if (
    (operator === 'between' || operator === 'notBetween') &&
    (type === 'select' || type === 'text') &&
    // Date ranges are handled differently in AntD--see below
    inputTypeCoerced !== 'date' &&
    inputTypeCoerced !== 'datetime-local'
  ) {
    const editors = ['from', 'to'].map((key, i) => {
      if (type === 'text') {
        if (inputTypeCoerced === 'time') {
          console.log('111222333');

          return (
            <DatePicker.TimePicker
              key={key}
              value={valueAsArray[i] ? dayjs(valueAsArray[i], 'HH:mm:ss') : null}
              className={standardClassnames.valueListItem}
              disabled={disabled}
              placeholder={placeHolderText}
              onChange={(d) => {
                multiValueHandler(d?.format('HH:mm:ss') ?? '', i);
              }}
              {...extraProps}
              getPopupContainer={getPopupContainer}
            />
          );
        } else if (inputTypeCoerced === 'number') {
          return (
            <InputNumber
              key={key}
              type={inputTypeCoerced}
              value={valueAsArray[i] ?? ''}
              className={cls}
              disabled={disabled}
              placeholder={placeHolderText}
              onChange={(v) => multiValueHandler(v, i)}
              {...extraProps}
            />
          );
        }
        return (
          <Input
            key={key}
            type={inputTypeCoerced}
            value={valueAsArray[i] ?? ''}
            className={standardClassnames.valueListItem}
            disabled={disabled}
            placeholder={placeHolderText}
            onChange={(e) => multiValueHandler(e.target.value, i)}
            {...extraProps}
          />
        );
      }
      return (
        <SelectorComponent
          {...props}
          key={key}
          className={standardClassnames.valueListItem}
          handleOnChange={(v) => multiValueHandler(v, i)}
          disabled={disabled}
          value={valueAsArray[i] ?? getFirstOption(values)}
          options={values}
          listsAsArrays={listsAsArrays}
        />
      );
    });
    return (
      <span data-testid={testID} className={className} title={title}>
        {editors[0]}
        {separator}
        {editors[1]}
      </span>
    );
  }

  switch (type) {
    case 'select':
    case 'multiselect':
      console.log('select111', values);

      return (
        <SelectorComponent
          {...props}
          className={className}
          handleOnChange={handleOnChange}
          options={values}
          value={value}
          title={title}
          disabled={disabled}
          multiple={type === 'multiselect'}
          listsAsArrays={listsAsArrays}
          {...extraProps}
        />
      );

    case 'textarea':
      return (
        <Input.TextArea
          value={value}
          title={title}
          className={className}
          disabled={disabled}
          placeholder={placeHolderText}
          onChange={(e) => handleOnChange(e.target.value)}
          {...extraProps}
        />
      );

    case 'switch':
      return (
        <Switch
          checked={!!value}
          title={title}
          className={className}
          disabled={disabled}
          onChange={(v) => handleOnChange(v)}
          {...extraProps}
        />
      );

    case 'checkbox':
      return (
        <span title={title} className={className}>
          <Checkbox
            type="checkbox"
            disabled={disabled}
            onChange={(e) => handleOnChange(e.target.checked)}
            checked={!!value}
            {...extraProps}
          />
        </span>
      );

    case 'radio':
      console.log('valueseeee', values);

      return (
        <span className={className} title={title}>
          {values.map((v) => (
            <Radio
              key={v.name}
              value={v.name}
              checked={value === v.name}
              disabled={disabled}
              onChange={(e) => handleOnChange(e.target.value)}
              {...extraProps}
            >
              {v.label}
            </Radio>
          ))}
        </span>
      );
  }
  console.log('inputTypeCoerced', inputTypeCoerced);

  switch (inputTypeCoerced) {
    case 'date':
    case 'datetime-local': {
      if (operator === 'between' || operator === 'notBetween') {
        const dayjsArray = valueAsArray.slice(0, 2).map(dayjs) as [Dayjs, Dayjs];
        return (
          <DatePicker.RangePicker
            value={dayjsArray.every((d) => d.isValid()) ? dayjsArray : undefined}
            showTime={inputTypeCoerced === 'datetime-local'}
            className={cls}
            disabled={disabled}
            getPopupContainer={() => document.getElementById('filterDropdown@1')!}
            placeholder={[placeHolderText, placeHolderText]}
            // TODO: the function below is currently untested (see the
            // "should render a date range picker" test in ./AntD.test.tsx)
            onChange={
              /* istanbul ignore next */
              (dates) => {
                const timeFormat = inputTypeCoerced === 'datetime-local' ? 'THH:mm:ss' : '';
                const format = `YYYY-MM-DD${timeFormat}`;
                const dateArray = dates?.map((d) => (d?.isValid() ? d.format(format) : undefined));
                handleOnChange(
                  dateArray ? (listsAsArrays ? dateArray : joinWith(dateArray, ',')) : dates
                );
              }
            }
            {...extraProps}
          />
        );
      }

      const dateValue = dayjs(value);
      return (
        <DatePicker
          value={dateValue.isValid() ? dateValue : undefined}
          showTime={inputTypeCoerced === 'datetime-local'}
          className={cls}
          disabled={disabled}
          placeholder={placeHolderText}
          onChange={(_d, dateString) => handleOnChange(dateString)}
          {...extraProps}
          getPopupContainer={getPopupContainer}
        />
      );
    }

    case 'dateRange': {
      const dayjsArray = valueAsArray.slice(0, 2).map(dayjs) as [Dayjs, Dayjs];
      return (
        <DatePicker.RangePicker
          value={dayjsArray.every((d) => d.isValid()) ? dayjsArray : undefined}
          showTime={inputTypeCoerced === 'datetime-local'}
          className={cls}
          disabled={disabled}
          getPopupContainer={() => document.getElementById('filterDropdown@1')!}
          placeholder={[placeHolderText, placeHolderText]}
          onChange={
            /* istanbul ignore next */
            (dates) => {
              const timeFormat = inputTypeCoerced === 'datetime-local' ? 'THH:mm:ss' : '';
              const format = `YYYY-MM-DD${timeFormat}`;
              const dateArray = dates?.map((d) => (d?.isValid() ? d.format(format) : undefined));
              handleOnChange(
                dateArray ? (listsAsArrays ? dateArray : joinWith(dateArray, ',')) : dates
              );
            }
          }
          {...extraProps}
        />
      );
    }

    case 'time': {
      const dateValue = dayjs(value, 'HH:mm:ss');
      return (
        <DatePicker.TimePicker
          value={dateValue.isValid() ? dateValue : undefined}
          className={cls}
          disabled={disabled}
          placeholder={placeHolderText}
          onChange={(d) => {
            console.log('date', d);
            handleOnChange(d?.format('HH:mm:ss') ?? '');
          }}
          {...extraProps}
          getPopupContainer={getPopupContainer}
        />
      );
    }

    case 'number': {
      return (
        <InputNumber
          type={inputTypeCoerced}
          value={value}
          title={title}
          className={cls}
          disabled={disabled}
          placeholder={placeHolderText}
          onChange={handleOnChange}
          {...extraProps}
        />
      );
    }
  }

  return (
    <Input
      type={inputTypeCoerced}
      value={value}
      title={title}
      className={cls}
      disabled={disabled}
      placeholder={placeHolderText}
      onChange={(e) => handleOnChange(e.target.value)}
      {...extraProps}
    />
  );
};

AntDValueEditor.displayName = 'AntDValueEditor';

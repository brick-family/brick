import React, { FC, useEffect, useRef } from 'react';

import { ProFieldFC, ProFormItem, useIntl } from '@ant-design/pro-components';
import { IconSelect } from '../icon-select';
//------------

import { createField } from '@ant-design/pro-form/lib/BaseForm';
/**
 *
 * @param
 */
const ProFormIconSelect: ProFieldFC<{
  text: string;
  emptyText?: React.ReactNode;
}> = ({ text, mode, render, renderFormItem, fieldProps, emptyText = '-' }, ref) => {
  const { value } = fieldProps || {};
  const inputRef = useRef<HTMLInputElement>();
  return <IconSelect ref={inputRef} data={value} {...fieldProps} />;
  // console.log('q=>sdfsfasdfasdfs', mode);
  // const intl = useIntl();
  // const inputRef = useRef<HTMLInputElement>();
  // // useImperativeHandle(ref, () => inputRef.current);
  // useEffect(() => {
  //   if (autoFocus) {
  //     inputRef.current?.focus();
  //   }
  // }, [autoFocus]);

  // if (mode === 'read') {
  //   const dom = (
  //     <>
  //       {prefix}
  //       {text ?? emptyText}
  //       {suffix}
  //     </>
  //   );

  //   if (render) {
  //     return render(text, { mode, ...fieldProps }, dom) ?? emptyText;
  //   }
  //   return dom;
  // }
  // if (mode === 'edit' || mode === 'update') {
  //   const placeholder = intl.getMessage('tableForm.inputPlaceholder', '请输入');
  //   console.log('q=>edit=>',);
  //   const dom = (
  //     <IconSelect

  //       ref={inputRef}
  //       {...fieldProps}
  //     />
  //     // <Input
  //     //   ref={inputRef}
  //     //   placeholder={placeholder}
  //     //   allowClear
  //     //   {...fieldProps}
  //     // />
  //   );

  //   if (renderFormItem) {
  //     return renderFormItem(text, { mode, ...fieldProps }, dom);
  //   }
  //   return dom;
  // }
  // return null;
};

export default createField<any>(ProFormIconSelect, {});

// const ProFormIconSelect: React.FC<FieldProps> = (props) => {
//   const {
//     proFieldProps, label, renderFormItem, mode, value, formItemProps, rules,
//     readonly: propsReadonly, fieldProps, ...restProps

//   } = props;
//   const readonly = mode === 'read' || propsReadonly;

//   console.log('q=>ProFormIconSelect', props);

//   // 将组件包裹在Col标签中
//   const node = <IconSelect {...fieldProps} {...restProps} />;
//   const colProps = { xxl: 6, lg: 8, md: 12, sm: 24, ...proFieldProps };
//   return (
//     <ProFormItem
//       {...formItemProps}
//       label={label}
//       rules={rules}
//       readonly={readonly}
//       fieldProps={{ ...restProps, ...formItemProps?.fieldProps }}
//       isDefaultRender={false}
//       render={renderFormItem}
//     >
//       {node}
//       {/* <Col {...colProps}>{node}</Col> */}
//     </ProFormItem>
//   );
// };

// export default ProFormIconSelect

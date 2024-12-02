// export type { IFormContainerProps } from './components/form-container';

export { FormContainer } from './components/form-container';

export type { IFieldInputProps } from './components/fields';
export { FieldInput } from './components/fields';

export type { IFieldTextareaProps } from './components/fields';
export { FieldTextarea } from './components/fields';

export type { IFieldInputNumberProps } from './components/fields';
export { FieldInputNumber } from './components/fields';

export type { IFieldSelectProps } from './components/fields';

export { FieldSelect } from './components/fields';

export type { IFieldRichProps } from './components/fields';
export { FieldRich } from './components/fields';

export type { IFieldDateProps } from './components/fields';
export { FieldDate } from './components/fields';

export type { IFieldRadioGroupProps } from './components/fields';
export { FieldRadioGroup } from './components/fields';

export type { IFieldCheckGroupProps } from './components/fields';
export { FieldCheckboxGroup } from './components/fields';

export type { IFieldImageProps } from './components/fields';
export { FieldImage } from './components/fields';

export type { IFieldFileProps } from './components/fields';
export { FieldFile } from './components/fields';

export type { IFieldRelationProps } from './components/fields';
export { FieldRelation } from './components/fields';

export type { IFieldLayoutProps } from './components/fields';
export { FieldLayout } from './components/fields';

// export type { IFieldSubTableProps } from './components/fields';
// export { FieldSubTable } from './components/fields';

export type { IColProps } from './components/fields';
export { FieldLayoutCol } from './components/fields';

export type { IFieldSelectGroupProps } from './components/fields';
export { FieldSelectGroup } from './components/fields';

export type { IFieldUserProps } from './components/fields';
export { FieldUserSelect } from './components/fields';

// 测试引擎一些问题的时候用。
// export type { TestProps } from './components/test/test';
// export { default as Tset } from './components/test/test';

const bizCssPrefix = 'bizpack';

export { bizCssPrefix };

declare namespace JSX {
  interface IntrinsicElements {
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  }
}

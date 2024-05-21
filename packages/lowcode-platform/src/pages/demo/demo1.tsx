import { Button } from 'antd';
import React, { FC } from 'react';
import { getColumnDataBySchema } from '@brick/lowcode-editor';

const testSchema = {
  children: [
    {
      componentName: 'FormContainer',
      id: 'node_oclcdgs7nr1',
      props: {
        cols: 2,
      },
      hidden: false,
      title: '',
      isLocked: false,
      condition: true,
      conditionGroup: '',
      children: [
        {
          componentName: 'STRING',
          id: 'node_oclti3pdet1',
          props: {
            title: '单行文本',
            columnConfig: {
              placeholder: '请输入',
              description: '',
              status: '1',
              format: 1,
              defaultValueType: '1',
              defaultValue: '22323',
            },
            cols: 1,
          },
          hidden: false,
          title: '',
          isLocked: false,
          condition: true,
          conditionGroup: '',
        },
      ],
    },
  ],
};

const testColumns = [
  {
    id: 'node_oclti3pdet1',
    title: '单行文本',
    fieldType: 'STRING',
    df_: 'sfsdf',
    columnConfig: {
      placeholder: '请输入',
      description: '',
      status: '1',
      format: 1,
      defaultValueType: '1',
      defaultValue: '22323',
    },
  },
];

export interface IDemo1Props {}
// schema: TSchema,

export const Demo1: FC<IDemo1Props> = (props) => {
  const test = () => {
    const result = getColumnDataBySchema(testSchema.children, []);
    console.log('q=>result', result);
  };
  return (
    <div>
      <Button onClick={test}>测试</Button>
    </div>
  );
};

export default Demo1;

import React, { FC, useState } from 'react';
import { UserSelect } from '@brick/biz-component';

export interface ITestUserSelectProps {}
export type IValue = string | null | string[];
const TestUserSelect: FC<ITestUserSelectProps> = (props) => {
  const [value, setValue] = useState(null as IValue);
  const onChange = (curValue: string | null | string[]) => {
    setValue(curValue);
  };

  return (
    <div>
      <UserSelect
        columnConfig={{
          selectType: 1,
          defaultValue: undefined,
          defaultValueType: '1',
          description: '',
          status: 0,
        }}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TestUserSelect;

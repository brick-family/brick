import { Picker } from 'antd-mobile';
import React, { FC, useState } from 'react';

export interface IFieldSelectMobileProps {}

export const basicColumns = [
  [
    { label: '周一', value: 'Mon' },
    { label: '周二', value: 'Tues' },
    { label: '周三', value: 'Wed' },
    { label: '周四', value: 'Thur' },
    { label: '周五', value: 'Fri' },
  ],
];

export const FieldSelectMobile: FC<IFieldSelectMobileProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<(string | null)[]>(['M']);
  return (
    <div>
      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={value}
        onConfirm={(v) => {
          // setValue(v);
        }}
      />
    </div>
  );
};

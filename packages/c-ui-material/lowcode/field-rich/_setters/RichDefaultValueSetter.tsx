import React, { FC, useState } from 'react';
import { Button, Modal } from 'antd';
import { SetterHoc } from '../../common';
import { BRichEditor } from '@brick/component';

export interface IRichDefaultValueSetterProps {
  onChange: (value: any) => void;
  value: string;
}

const RichDefaultValueSetterFun: FC<IRichDefaultValueSetterProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [richValue, setRicheValue] = useState<string>(value);
  const handleOk = () => {
    onChange?.(richValue);
    setOpen(false);
  };
  return (
    <>
      <Modal title="设置默认值" open={open} onOk={handleOk} onCancel={() => setOpen(false)}>
        <BRichEditor initialValue={value} onChange={setRicheValue} />
      </Modal>
      <Button onClick={() => setOpen(true)}>设置默认值</Button>
    </>
  );
};

export const RichDefaultValueSetter = SetterHoc(RichDefaultValueSetterFun);

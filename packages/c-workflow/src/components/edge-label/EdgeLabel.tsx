import { PlusCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import React, { FC, memo, useState } from 'react';
import { EdgeLabelContent, ILabelContentProps } from './EdgeLabelContent';
import s from './lable.less';

export interface ILabelProps extends ILabelContentProps {}

export const EdgeLabel: FC<ILabelProps> = memo((props) => {
  const { ...otherProps } = props;

  const [open, setOpen] = useState(false);

  const onOpenChange = (currOpen: boolean) => {
    setOpen(currOpen);
  };
  return (
    <>
      <Popover
        open={open}
        placement="rightTop"
        trigger={'click'}
        onOpenChange={onOpenChange}
        content={<EdgeLabelContent {...otherProps} setOpen={setOpen} />}
        arrow={false}
      >
        <div className={s.icon}>
          <PlusCircleOutlined style={{ fontSize: 18 }} />
        </div>
      </Popover>
    </>
  );
});

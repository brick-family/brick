import { PlusCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import React, { FC, memo } from 'react';
import { EdgeLabelContent, ILabelContentProps } from './EdgeLabelContent';
import s from './lable.less';

export interface ILabelProps extends ILabelContentProps {}

export const EdgeLabel: FC<ILabelProps> = memo((props) => {
  const { ...otherProps } = props;
  return (
    <>
      <Popover
        placement="rightTop"
        trigger={'click'}
        content={<EdgeLabelContent {...otherProps} />}
        arrow={false}
      >
        <div className={s.icon}>
          <PlusCircleOutlined style={{ fontSize: 18 }} />
        </div>
      </Popover>
    </>
  );
});

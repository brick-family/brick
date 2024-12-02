import { PlusCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import React, { FC, useState } from 'react';
import { INodeAddContentProps, NodeAddContent } from './NodeAddContent';
import s from './nodeAdd.module.less';
import classNames from 'classnames';

export interface INodeAddProps extends INodeAddContentProps {
  /**
   * 是否显示箭头
   */
  showArrow?: boolean;

  className?: string;
}

export const NodeAdd: FC<INodeAddProps> = (props) => {
  const { showArrow, className, ...otherProps } = props;
  const [open, setOpen] = useState(false);

  const onOpenChange = (currOpen: boolean) => {
    setOpen(currOpen);
  };

  return (
    <Popover
      open={open}
      placement="rightTop"
      trigger={'click'}
      onOpenChange={onOpenChange}
      content={<NodeAddContent {...otherProps} setOpen={setOpen} />}
      arrow={false}
    >
      <div
        className={classNames(s.nodeAdd, className, {
          [s.hideArrow]: !showArrow,
        })}
      >
        <div className={s.icon}>
          <PlusCircleOutlined style={{ fontSize: 18 }} />
        </div>
      </div>
    </Popover>
  );
};

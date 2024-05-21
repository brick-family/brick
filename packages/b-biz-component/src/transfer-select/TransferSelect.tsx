import React, { FC, memo, useRef, useState } from 'react';
import { Modal } from 'antd';
import { IDeptEntity, IUserEntity, TMenuData } from '@brick/types';
import { DeptSelect } from './dept-select/DeptSelect';
import { RoleSelect } from './role-select';
import { ITransferSelectProviderRef, TransferSelectProvider } from './transfer-select-processor';
import { TTransferSelectType } from './types';
import { UserSelect } from './user-select';
import { AppSelect } from './app-select';
import { ModelBodyStyle } from '@brick/component';

export interface ITransferSelectProps extends ITransferSelectContentProps {
  type: TTransferSelectType;
}

export interface ITransferSelectContentProps {
  style?: React.CSSProperties;
  className?: string;

  /**
   * 标题
   */
  title?: string;

  /**
   * 子元素
   */
  children?: React.ReactNode;

  type: TTransferSelectType;

  targetKeys?: string[];

  deptTreeData?: Array<TMenuData<IDeptEntity>>;

  userTargetData?: Array<IUserEntity>;

  onOk?: (value: string[], type: TTransferSelectType) => Promise<boolean>;
}

const TransferSelectContent: FC<ITransferSelectContentProps> = memo(
  ({ style, className, children, type, title, targetKeys, userTargetData, onOk: onSave }) => {
    const [open, setOpen] = useState(false);
    const processorRef = useRef<ITransferSelectProviderRef>(null);
    const handleClick = () => {
      setOpen(true);
    };
    const onCancel = () => {
      setOpen(false);
      console.log('close', open);
    };
    const onOk = async () => {
      const processor = processorRef.current?.processor;
      const keys: string[] = processor?.targetKeys?.peek?.() || [];
      // @ts-ignore TODO 需要处理类型
      console.log('keys', keys);

      console.log('q=>processorRef', processor);

      if (keys!?.length <= 0) {
        setOpen(!open);
      }
      const result = await onSave?.(keys!, type);
      if (result) {
        setOpen(!open);
      }
      // 调用接口
      // processor?.
      //
    };

    return (
      <>
        <div onClick={handleClick} className={className} style={style}>
          {children}
        </div>
        <Modal
          title={title}
          destroyOnClose
          open={open}
          onCancel={onCancel}
          styles={{
            body: ModelBodyStyle,
          }}
          onOk={onOk}
        >
          <TransferSelectProvider
            ref={processorRef}
            type={type}
            userTargetData={userTargetData}
            targetKeys={targetKeys || []}
          >
            <>
              {type == 'role' && <RoleSelect />}
              {type == 'user' && <UserSelect />}
              {type == 'dept' && <DeptSelect />}
              {type == 'app' && <AppSelect />}
            </>
          </TransferSelectProvider>
        </Modal>
      </>
    );
  }
);

export const TransferSelect: FC<ITransferSelectProps> = memo((props) => {
  return <TransferSelectContent {...props}></TransferSelectContent>;
});

import { Modal } from 'antd';
import React, { FC, useEffect } from 'react';
import { useItemDetailSelector } from '../../processor';

import s from './itemModel.module.less';
import { Title } from '../title';
import { Footer } from '../footer';
import { FormContainer } from '../form-container';

export interface IItemModalProps {}

export const ItemModal: FC<IItemModalProps> = (props) => {
  const [open, close] = useItemDetailSelector((s) => [s.openProps.open, s.close]);

  // 清除itemid
  useEffect(() => {}, []);
  return (
    <Modal
      width={1200}
      style={{ top: 0 }}
      bodyStyle={{
        height: 'calc(100vh - 156px)',
        overflow: 'auto',
        // minHeight: '400px'
      }}
      title={<Title />}
      open={open}
      onCancel={close}
      destroyOnClose={true}
      wrapClassName={s.itemModal}
      // footer={<Submit formRef={formRef} table={table.data!} />}
      footer={<Footer />}
      // {...modelProps}
    >
      <FormContainer />
    </Modal>
  );
};

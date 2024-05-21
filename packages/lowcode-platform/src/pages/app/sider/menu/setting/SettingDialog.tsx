import React, { FC } from 'react';
import { ReName } from '@/pages/app/sider/menu/setting/ReName';
import { Move } from '@/pages/app/sider/menu/setting/Move';
import { useSliderSelector } from '@/pages/app/sider/processor';

export interface IDialogProps {}

export const SettingDialog: FC<IDialogProps> = (props) => {
  const [modalData, setModalData] = useSliderSelector((s) => [
    s.modalProcessor.modalData,
    s.modalProcessor.setModalData,
    s.setResourceId,
  ]);

  const onOpenChange = (open: boolean) => {
    setModalData({
      ...modalData,
      open: open,
    });
  };
  return (
    <>
      <ReName
        data={modalData.data!}
        open={modalData?.type === 'rename' && modalData.open}
        onOpenChange={onOpenChange}
      />
      <Move
        data={modalData.data as any}
        open={modalData?.type === 'move' && modalData.open}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

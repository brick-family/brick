import React, { FC } from 'react';
import { Modal } from 'antd';
import { FormulaEditorProvider, useFormulaEditorSelector } from './formula-editor-processor';
import { useLowcodeEvent } from './hooks';

export interface IFormulaEditorContentProps {}

export const FormulaEditorContent: FC<IFormulaEditorContentProps> = (props) => {
  const [modalData, setModalDataObservable] = useFormulaEditorSelector((s) => [
    s.modelProcessor.modalData,
    s.modelProcessor.setModalDataObservable,
  ]);

  // 注册lowcode事件
  const { sendData } = useLowcodeEvent();

  const handleCancel = () => {
    setModalDataObservable((draft) => {
      draft.open.set(false);
    });
  };

  const handleOk = () => {
    // TODO 还需要内容发送给setter事件
    handleCancel();
    sendData('data-data');
  };

  return (
    <Modal title="公式编辑器" open={modalData.open} onOk={handleOk} onCancel={handleCancel}>
      编辑器内容
    </Modal>
  );
};

export interface IFormulaEditorProps {}

export const FormulaEditor: FC<IFormulaEditorProps> = (props) => {
  return (
    <FormulaEditorProvider>
      <FormulaEditorContent />
    </FormulaEditorProvider>
  );
};

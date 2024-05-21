import React, { FC, memo } from 'react';
import { EMode, useItemDetailSelector } from '../..';
import { Button } from 'antd';
import { Submit } from '../submit';

export interface IFooterProps {}

const CreateFooter = memo(() => {
  return <Submit />;
});

const DetailFooter = memo(() => {
  const [changeMode, deleteData, deleteDataResponse] = useItemDetailSelector((s) => [
    s.changeMode,
    s.deleteData,
    s.dataProcessor.deleteDataResponse,
  ]);

  return (
    <>
      <Button type="primary" onClick={() => changeMode(EMode.edit)}>
        编辑
      </Button>
      <Button danger loading={deleteDataResponse.loading} onClick={deleteData}>
        删除
      </Button>
    </>
  );
});

const EditFooter = memo(() => {
  const [changeMode, saveData, submitLoading] = useItemDetailSelector((s) => [
    s.changeMode,
    s.saveData,
    s.submitLoading,
  ]);

  const save = async () => {
    await saveData({ isRefreshTableList: true });
    changeMode(EMode.detail);
  };

  return (
    <>
      <Button onClick={() => changeMode(EMode.detail)}>取消</Button>
      <Button loading={submitLoading} onClick={save} type="primary">
        保存
      </Button>
    </>
  );
});

export const Footer: FC<IFooterProps> = memo((props) => {
  const [mode] = useItemDetailSelector((s) => [s.mode]);

  return (
    <div>
      {mode === EMode.create && <CreateFooter />}
      {mode === EMode.detail && <DetailFooter />}
      {mode === EMode.edit && <EditFooter />}
    </div>
  );
});

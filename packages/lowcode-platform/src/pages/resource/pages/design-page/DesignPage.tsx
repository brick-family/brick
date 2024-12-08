import { BSpin } from '@brick/component';
import { ILowcodeEditorInstance, LowcodeEditor } from '@brick/lowcode-editor';
import React, { FC, useRef } from 'react';
import { useResourcePageSelector } from '../../resource-page-processor';
import { DesignOperation } from './design-operation/DesignOpertion';
import s from './designPage.less';

export interface IDesignPageProps {}

export const DesignPage: FC<IDesignPageProps> = (props) => {
  const [resourceData, loading, OperationRightPortal] = useResourcePageSelector((s) => [
    s.resourceData,
    s.loading,
    s.portalProcessor.OperationRightPortal,
  ]);

  const lowcodeRef = useRef<ILowcodeEditorInstance>(null);

  const onSaveSchema = async () => {
    await lowcodeRef.current?.saveSchema();
  };

  const getTableData = () => {
    return lowcodeRef.current?.getTableData()!;
  };

  return (
    <>
      <OperationRightPortal.Portal>
        <DesignOperation onSave={onSaveSchema} getTableData={getTableData} />
      </OperationRightPortal.Portal>
      <div className={s.container}>
        {loading ? <BSpin /> : <LowcodeEditor ref={lowcodeRef} resourceData={resourceData} />}
      </div>
    </>
  );
};

export default DesignPage;

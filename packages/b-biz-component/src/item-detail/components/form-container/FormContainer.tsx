import { IPreviewRef, SamplePreview } from '@brick/lowcode-editor';
import React, { FC, memo, useEffect, useRef } from 'react';
import { EMode, useItemDetailSelector } from '../../processor';
import { BLoading } from '@brick/component';
import { useAsyncEffect } from 'ahooks';
import { convertItemDataToFormValues } from '../../utils';

export interface IFormContainerProps {}

export const FormContainer: FC<IFormContainerProps> = memo((props) => {
  const formRef = useRef<IPreviewRef>({} as IPreviewRef);
  const [mode, table, itemData, defaultItemDate, bindFormRef] = useItemDetailSelector((s) => [
    s.mode,
    s.table,
    s.itemData,
    s.defaultItemDate,
    s.bindFormRef,
  ]);

  const columns = table?.data?.columns;

  useEffect(() => {
    bindFormRef(formRef);
  }, []);
  useEffect(() => {
    if (!table.loading) {
      formRef.current?.changeReadonly?.(mode === EMode.detail);
    }
  }, [mode, table.loading]);

  useAsyncEffect(async () => {
    console.log('q=>mode', mode);
    let currData = null;
    // 详情页
    if (mode !== EMode.create && !itemData.loading && Object.keys(itemData.data).length > 0) {
      currData = itemData.data;
    }

    // 创建页
    if (
      mode === EMode.create &&
      !defaultItemDate.loading &&
      Object.keys(defaultItemDate.data).length > 0
    ) {
      currData = defaultItemDate.data;
    }

    if (currData && columns?.length) {
      const formInstance = await formRef.current?.getFormInstance?.();
      const formValues = convertItemDataToFormValues(currData, columns);
      formInstance?.setFieldsValue?.(formValues);
    }
  }, [itemData.data, itemData.loading, defaultItemDate.loading, defaultItemDate.data, columns]);

  return <>{!table.loading ? <SamplePreview table={table.data!} ref={formRef} /> : <BLoading />}</>;
});

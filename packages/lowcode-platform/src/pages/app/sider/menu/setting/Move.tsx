import React, { FC, useEffect, useRef, useState } from 'react';
import { useAsyncEffect, useCreation, useMemoizedFn } from 'ahooks';
import { message, Modal, Tree } from 'antd';
import { Key } from 'antd/es/table/interface';
import { DataNode } from 'antd/es/tree';

import { useSliderSelector } from '@/pages/app/sider/processor';
import { getApplication, queryResourceGroup } from '@brick/services';
import { arrayToTree } from '@brick/utils';
import { DownOutlined } from '@ant-design/icons';
import { useParams } from '@umijs/max';
import { ModalFormProps } from '@ant-design/pro-components';
import { IResourceEntity, TMenuData } from '@brick/types';

export interface IMoveProps extends Pick<ModalFormProps, 'open' | 'onOpenChange'> {
  data: TMenuData<IResourceEntity>;
}

export const Move: FC<IMoveProps> = (props) => {
  const { onOpenChange, open, data } = props;

  const [treeData, setTreeData] = useState<DataNode[] | null>(null);

  const selectIdRef = useRef<Key>();

  const [refresh, updateResource, updateResourceResponse] = useSliderSelector((s) => [
    s.resourceProcessor.refresh,
    s.resourceProcessor.updateResource,
    s.resourceProcessor.updateResourceResponse,
  ]);

  const { aId } = useParams();

  const onSuccess = useMemoizedFn(async () => {
    refresh();
    onOpenChange?.(false);
    message.success('移动成功');
  });

  useEffect(() => {
    return () => {
      setTreeData(null);
    };
  }, []);

  useAsyncEffect(async () => {
    if (open) {
      // 获取应用名称
      const appId = aId;
      const [app, tableGroup] = await Promise.all([
        getApplication(appId!),
        queryResourceGroup({ pageSize: 1000, currentPage: 1 }),
      ]);

      const tree = arrayToTree(tableGroup, 'id', 'parentId');
      const res = [
        {
          id: '',
          title: app.name,
          children: tree,
        },
      ];
      setTreeData(res as unknown as DataNode[]);
    }
  }, [open]);

  const onSelect = useMemoizedFn((selectedKeys: Key[]) => {
    if (selectedKeys?.length) {
      selectIdRef.current = selectedKeys[0];
    }
  });

  const onOk = useMemoizedFn(() => {
    if (selectIdRef.current === undefined) {
      message.warning('请选择数据');
      return;
    }

    updateResource(
      {
        title: data.title,
        id: data.id as unknown as string,
        resourceType: data.resourceType,
        applicationId: aId,
        parentId: selectIdRef.current as string,
      },
      {
        onSuccess: onSuccess,
        onError: (err: any) => {
          message.error('移动失败');
        },
      }
    );
  });

  const onCancel = useMemoizedFn(() => {
    onOpenChange?.(false);
  });

  const fieldNames = useCreation(() => {
    return {
      title: 'title',
      key: 'id',
    };
  }, []);

  return (
    <Modal
      title="移动到"
      confirmLoading={updateResourceResponse.loading}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <div>请选择目标文件夹</div>

      <div>
        {treeData && (
          <Tree
            // checkable
            showIcon
            onSelect={onSelect}
            defaultExpandAll
            switcherIcon={<DownOutlined />}
            treeData={treeData}
            fieldNames={fieldNames}
          />
        )}
      </div>
    </Modal>
  );
};

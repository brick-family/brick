import React, { FC, memo, useEffect } from 'react';
import { useMemoizedFn } from 'ahooks';

import { BSearch, BSpin } from '@brick/component';

import { MenuList } from '@/components';
import { EResourceType } from '@brick/types';
import { usePermSelector } from '../perm-processor';

import s from './resource.less';
import { getFirstMenu } from '@brick/utils';

export interface IResourceProps {}

export const Resource: FC<IResourceProps> = memo((props) => {
  const [
    requestResourceAll,
    resourcesTree,
    resources,
    setSearchTreeKeyWords,
    setCurrResource,
    currSelectResource,
  ] = usePermSelector((s) => [
    s.requestResourceAll,
    s.resourceTree,
    s.resourceProcessor.resources,
    s.resourceProcessor.setSearchTreeKeyWords,
    s.setCurrResource,
    s.currSelectResource,
  ]);

  useEffect(() => {
    requestResourceAll();
  }, []);

  useEffect(() => {
    if (resourcesTree?.length > 0) {
      const first = getFirstMenu(resourcesTree);
      if (first) {
        setCurrResource(first);
      }
    }
  }, [resourcesTree]);

  const onSelect = useMemoizedFn((_, { node }) => {
    console.log('q=>onSelect');
    if (!node.isLeaf) {
      // 叶子节点，代表是资源，不是分组
      return;
    }

    if (node.resourceType === EResourceType.TABLE) {
      setCurrResource(node);
    }
  });

  const handleSearch = (value: string) => {
    setSearchTreeKeyWords(value);
  };

  return (
    <div className={s.resource}>
      <div className={s.title}>1. 选择资源</div>
      <div className={s.content}>
        <BSearch size={'small'} style={{ marginBottom: 8 }} onSearch={handleSearch} />
        {resources.loading && <BSpin />}

        {!resources.loading && (
          <MenuList
            selectedKeys={[currSelectResource?.id!]}
            data={resourcesTree as any}
            isDraggable={false}
            onSelect={onSelect}
          />
        )}
      </div>
    </div>
  );
});

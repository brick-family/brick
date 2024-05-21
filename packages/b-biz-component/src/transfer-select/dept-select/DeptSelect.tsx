import { theme, Transfer, Tree } from 'antd';
import type { TransferDirection, TransferItem } from 'antd/es/transfer';
import type { DataNode } from 'antd/es/tree';
import React, { useEffect, useMemo, useState, Key } from 'react';
import { TMenuData, IDeptEntity } from '@brick/types';
import { useTransferSelectSelector } from '../transfer-select-processor';
import {
  cleanConductor,
  fillConductor,
  getTargetKeys,
  keyToLeLevelEntities,
  treeToKeyEntities,
} from '@brick/utils';
import _ from 'lodash';
import { TreeProps } from 'antd/lib';

interface TreeTransferProps {
  dataSource: DataNode[];
  targetKeys: string[];
  onChange: (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void;
}
type TreeNode = TransferItem & DataNode;

// Customize Table Transfer
const isChecked = (selectedKeys: React.Key[], eventKey: React.Key) =>
  selectedKeys.includes(eventKey);

const TreeTransfer: React.FC<TreeTransferProps> = ({ dataSource, targetKeys, ...restProps }) => {
  const [
    setSearchTreeKeyWords,
    searchTreeKeyWords,
    searchTargetKeyWords,
    setSearchTargetKeyWords,
    treeSelectKeys,
    setTreeSelectKeys,
    targetSelectKeys,
    setTargetSelectKeys,
    transferSelectKeys,
    setTransferSelectKeys,
    deptTree,
    deptTreeCache,
  ] = useTransferSelectSelector((s) => [
    s.deptProcessor.setSearchTreeKeyWords,
    s.deptProcessor.searchTreeKeyWords,
    s.deptProcessor.searchTargetKeyWords,
    s.deptProcessor.setSearchTargetKeyWords,
    s.treeSelectKeys,
    s.setTreeSelectKeys,
    s.targetSelectKeys,
    s.setTargetSelectKeys,
    s.transferSelectKeys,
    s.setTransferSelectKeys,
    s.deptProcessor.deptTree,
    s.deptProcessor.deptTreeCache,
  ]);
  const { token } = theme.useToken();

  const filterOption = (inputValue: any, option: any, direction: any) => {
    console.log('filterOption', inputValue, option);

    if (direction == 'left') {
      return true;
    } else {
      return option?.title?.indexOf(inputValue) > -1 || option?.name?.indexOf(inputValue) > -1;
    }
  };

  //为下面的Tree组件保存变量
  const [expandKeys, setExpandKeys] = useState([] as Key[]);
  useEffect(() => {
    const keys: Key[] = [];
    const getKeys = (treeData: TMenuData<IDeptEntity>[]) => {
      treeData.forEach((item) => {
        keys.push(item.id);
        if (item?.children?.length > 0) {
          getKeys(item.children);
        }
      });
    };
    getKeys(deptTree);
    setExpandKeys(keys);
  }, [JSON.stringify(deptTree)]);

  const transferDataSource: TransferItem[] = [];
  function flatten(list: DataNode[] = []) {
    list?.forEach?.((item) => {
      transferDataSource.push(item as TransferItem);
      if (Array.isArray(item.children)) {
        flatten(item.children);
      }
    });
  }
  console.log('datasource111', dataSource);

  flatten(dataSource);

  const renderItem = (item: any) => {
    return <span title={item.name}>{item?.name}</span>;
  };

  console.log('transferDataSource111', transferDataSource);

  const handleSearch = (direction: TransferDirection, value: string) => {
    if (direction === 'left') {
      setSearchTreeKeyWords(value);
    }
  };

  const generateTree = (treeNodes: DataNode[] = [], checkedKeys: string[] = []): DataNode[] =>
    treeNodes?.map?.(({ children, ...props }) => ({
      ...props,
      disabled: checkedKeys.includes(props.key as string),
      children: generateTree(children, checkedKeys),
    }));

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectKeys: string[]) => {
    console.log('onSetledd', targetSelectKeys, treeSelectKeys);

    setTransferSelectKeys([...targetSelectKeys]);
  };
  console.log('transferSelectKeys', transferSelectKeys, targetKeys);

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      style={{ width: '100%', height: '100%' }}
      className="tree-transfer"
      render={renderItem}
      selectedKeys={transferSelectKeys}
      // selectedKeys={selectedKeys}
      onSelectChange={onSelectChange}
      filterOption={filterOption}
      showSearch
      onSearch={_.debounce(handleSearch, 500)}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          // const allSelectedKeys = getAllKeys(deptTreeCache, treeSelectKeys);
          // const checkedKeys = Array.from(new Set([...allSelectedKeys, ...targetKeys]));
          // console.log('checkedKeys000', checkedKeys);
          // const resKeys = getAllKeys(transferDataSource, checkedKeys);
          // console.log('checkedKeys', checkedKeys, resKeys);

          const onCheck: TreeProps['onCheck'] = (_, info) => {
            const {
              checked,
              node: { key },
            } = info;
            if (checked) {
              console.log('deptTr111', deptTree);

              // TODO 需要处理类型
              const { keyEntities, maxLevel } = treeToKeyEntities(deptTree);
              console.log('keyEnti', keyEntities);

              const levelEntities = keyToLeLevelEntities(keyEntities);
              const { allCheckedKeys } = fillConductor(
                String(key),
                [...treeSelectKeys, ...targetKeys],
                levelEntities,
                maxLevel,
                keyEntities
              );
              // console.log('allCheckedKeys1111', allCheckedKeys);

              const newTransferSelectKeys = allCheckedKeys.filter(
                (item: string) => targetKeys.indexOf(item) == -1
              );
              setTreeSelectKeys(allCheckedKeys as string[]);
              setTransferSelectKeys(newTransferSelectKeys);
              // allCheckedKeys.forEach((item) => {
              //   onItemSelect(item as string, true);
              // });
            } else {
              console.log('deptTr111', deptTree);

              const { keyEntities, maxLevel } = treeToKeyEntities(deptTree);
              console.log('keyEnti', keyEntities);

              const levelEntities = keyToLeLevelEntities(keyEntities);
              const { allCheckedKeys, cleanKeys } = cleanConductor(
                String(key),
                [...treeSelectKeys, ...targetKeys],
                levelEntities,
                maxLevel,
                keyEntities
              );
              console.log('allCheckedKeys1111', allCheckedKeys);

              setTreeSelectKeys(allCheckedKeys as string[]);
              setTransferSelectKeys(allCheckedKeys as string[]);
              // cleanKeys.forEach((item) => {
              //   onItemSelect(item as string, false);
              // });
            }
          };

          const { keyEntities } = treeToKeyEntities(deptTree);

          const levelEntities = keyToLeLevelEntities(keyEntities);

          console.log('deptTree1111', keyEntities, levelEntities);

          return (
            <div style={{ padding: token.paddingXS }}>
              <Tree
                blockNode
                checkable
                checkStrictly
                expandedKeys={expandKeys}
                onExpand={(keys) => {
                  setExpandKeys(keys as Key[]);
                }}
                checkedKeys={treeSelectKeys}
                treeData={generateTree(deptTree, targetKeys)}
                onCheck={onCheck}
                // onCheck={(_, { node: { key } }) => {
                //   onItemSelect(key as string, !isChecked(checkedKeys, key));
                // }}
                // onSelect={(_, { node: { key } }) => {
                //   onItemSelect(key as string, !isChecked(checkedKeys, key));
                // }}
              />
            </div>
          );
        }
      }}
    </Transfer>
  );
};

export const DeptSelect: React.FC = () => {
  const [
    treeSelectKeys,
    setTreeSelectKeys,
    targetSelectKeys,
    setTargetSelectKeys,
    targetKeys,
    setTargetKeys,
    treeData,
    queryTreeData,
    setTransferSelectKeys,
  ] = useTransferSelectSelector((s) => [
    s.treeSelectKeys,
    s.setTreeSelectKeys,
    s.targetSelectKeys,
    s.setTargetSelectKeys,
    s.targetKeys,
    s.setTargetKeys,
    s.deptProcessor.deptTreeCache,
    s.deptProcessor.queryDeptAll,
    s.setTransferSelectKeys,
  ]);
  useEffect(() => {
    queryTreeData();
    console.log('effect');
  }, []);

  const onChange = (keys: string[], direction: 'left' | 'right', moveKeys: string[]) => {
    if (direction == 'right') {
      setTreeSelectKeys(keys);
      setTargetKeys(keys);
    } else {
      const newKeys = [...keys];
      moveKeys.forEach((moveKey) => {
        getTargetKeys(treeData as any, newKeys, moveKey);
      });
      console.log('newKeys', newKeys);
      setTargetKeys(newKeys);
      setTreeSelectKeys(newKeys);
    }
    setTransferSelectKeys([]);
  };

  return <TreeTransfer dataSource={treeData as any} targetKeys={targetKeys!} onChange={onChange} />;
};

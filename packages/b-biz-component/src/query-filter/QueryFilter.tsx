import { QueryBuilder } from '@brick/component';
import { ITableEntity } from '@brick/types';
import { FilterOutlined } from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import { Button, Dropdown, theme } from 'antd';
import React, { FC, useRef, useState } from 'react';
import { RuleGroupType, RuleType } from 'react-querybuilder';

const { useToken } = theme;
export interface IQueryFilterProps {
  tableConfig: ITableEntity;
  onChange?: (value: RuleType[]) => void;
}

export const QueryFilter: FC<IQueryFilterProps> = ({ tableConfig, onChange }) => {
  const { token } = useToken();

  const [open, setOpen] = useState(false);

  const currValueRef = useRef<RuleGroupType>();

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const onChangeQuery = useMemoizedFn((value: RuleGroupType) => {
    currValueRef.current = value;
  });

  const onOk = (value: RuleGroupType) => {
    const rules = value?.rules as RuleType[];
    if (rules) {
      onChange?.(rules);
    }
    setOpen(false);
  };

  const dropdownRender = useMemoizedFn(() => {
    return (
      <div style={contentStyle}>
        <QueryBuilder onOk={onOk} onChange={onChangeQuery} tableConfig={tableConfig!} />
      </div>
    );
  });

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      // const rules = currValueRef.current?.rules as RuleType[];
      // if (rules) {
      //   onChange?.(rules);
      // }
    }
  };

  return (
    <Dropdown
      trigger={['click']}
      open={open}
      dropdownRender={dropdownRender}
      onOpenChange={onOpenChange}
    >
      <Button className="icon-button" icon={<FilterOutlined />}>
        {/*筛选*/}
      </Button>
    </Dropdown>
  );
};

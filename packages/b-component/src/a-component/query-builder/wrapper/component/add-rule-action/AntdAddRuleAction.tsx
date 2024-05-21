import React, { FC } from 'react';
import { Button, Flex, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ReactDOM from 'react-dom';
import { ActionWithRulesAndAddersProps } from 'react-querybuilder';
import { useQueryBuilderSelector } from '../../../processor';
import s from './AntdAddRuleAction.module.less';

export interface IAntdAddRuleActionProps extends ActionWithRulesAndAddersProps {}

export const AntdAddRuleAction: FC<IAntdAddRuleActionProps> = ({
  handleOnClick,
  ruleOrGroup,
  ...otherProps
}) => {
  const [footerRef, resetQuery, query, executeQueryFun] = useQueryBuilderSelector((s) => [
    s.footerRef,
    s.resetQuery,
    s.query,
    s.executeQueryFun,
  ]);

  if (!footerRef?.current) {
    return <></>;
  }

  const add = (e: React.MouseEvent) => {
    console.log('q=>ruleOrGroup', ruleOrGroup, otherProps);
    handleOnClick(e);
    // (e) => handleOnClick(e)
  };
  return ReactDOM.createPortal(
    <div className={s.content}>
      <Flex justify={'space-between'}>
        <Button {...otherProps} type="text" icon={<PlusOutlined />} onClick={add}>
          条件
        </Button>
        <div className={s.op}>
          <Space>
            <Button onClick={resetQuery}>清空值</Button>
            <Button
              type={'primary'}
              onClick={() => {
                executeQueryFun?.(query);
              }}
            >
              筛选
            </Button>
          </Space>
        </div>
      </Flex>
    </div>,
    footerRef?.current!
  );
};

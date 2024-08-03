import { BaseProcessor } from '@brick/core';
import React from 'react';
import { RuleGroupType, generateID } from 'react-querybuilder';
import { observable, Observable } from '@legendapp/state';

const initialQuery: RuleGroupType = {
  id: generateID(),
  combinator: 'and',
  not: true,
  rules: [{ id: generateID(), field: 'column_gosanf', operator: '=', value: 111 }],
};

export class QueryBuilderProcessor extends BaseProcessor {
  footerRef: React.RefObject<HTMLDivElement>;

  query: Observable<RuleGroupType>; //

  reload: Observable<boolean>;

  executeQueryFun: (value: RuleGroupType) => void;

  constructor() {
    super();
    // this.appList = createDefaultResponseQuery();
    this.footerRef = React.createRef();
    this.reload = observable(true);
    this.query = observable(initialQuery);
    this.executeQueryFun = () => {};
    this.init();
  }

  setQuery = (value: RuleGroupType) => {
    this.query.set(value);
  };

  /**
   * 设置执行查询的函数
   * @param execFun
   */
  setExecuteQueryFun = (execFun: (value: RuleGroupType) => void) => {
    this.executeQueryFun = execFun;
  };

  /**
   * 重置查询
   */
  resetQuery = () => {
    this.query.set(initialQuery);
  };

  setReload = () => {
    this.reload.set(!this.reload);
  };

  private init = async () => {
    this.listeners();
  };
  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createQueryBuilderProcessor = () => {
  let processor: null | QueryBuilderProcessor = new QueryBuilderProcessor();

  const getRoot = () => {
    return processor;
  };
  const destroy = () => {
    processor = null;
  };

  return {
    processor,
    getRoot,
    destroy,
  };
};

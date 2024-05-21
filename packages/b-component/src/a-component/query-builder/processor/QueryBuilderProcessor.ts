import { BaseProcessor } from '@brick/core';
import React from 'react';
import { RuleGroupType } from 'react-querybuilder';
import { observable, Observable } from '@legendapp/state';

const initialQuery: RuleGroupType = {
  combinator: 'and',
  rules: [{ field: '', operator: '=', value: undefined }],
  not: true,
};

export class QueryBuilderProcessor extends BaseProcessor {
  footerRef: React.RefObject<HTMLDivElement>;

  query: Observable<RuleGroupType>; //

  executeQueryFun: (value: RuleGroupType) => void;

  constructor() {
    super();
    // this.appList = createDefaultResponseQuery();
    this.footerRef = React.createRef();
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

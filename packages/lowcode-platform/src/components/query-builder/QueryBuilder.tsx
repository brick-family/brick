import React, { FC, useState } from 'react';
import { Field, QueryBuilder as ReactQueryBuilder, RuleGroupType } from 'react-querybuilder';
import { QueryBuilderAntD, antdControlElements, combinators, operators } from './wrapper';
import 'react-querybuilder/dist/query-builder.css';
import { ITableEntity } from '@brick/types';
import { useCreation } from 'ahooks';
import s from './queryBuilder.less';

const controlClassnames = {
  ruleGroup: s.ruleGroup,
};

export interface IQueryBuilderProps {
  tableConfig: ITableEntity;
}

const initialQuery: RuleGroupType = {
  combinator: 'and',
  rules: [
    { field: '', operator: '=', value: '' },
    // { field: 'lastName', operator: '=', value: 'Vai,Vaughan' },
  ],
  not: true,
};

export const QueryBuilder: FC<IQueryBuilderProps> = ({ tableConfig }) => {
  const fields: Field[] = useCreation(() => {
    return (
      tableConfig?.columns?.map((item) => {
        return {
          name: item.dbFieldName!,
          label: item.title,
        };
      }) || []
    );
  }, [tableConfig?.columns]);

  const [query, setQuery] = useState(initialQuery);

  console.log('q=>query', query);

  return (
    <div>
      <ReactQueryBuilder
        controlClassnames={controlClassnames}
        controlElements={antdControlElements}
        combinators={combinators}
        operators={operators}
        query={query}
        onQueryChange={(q) => setQuery(q)}
        fields={fields}
      />
    </div>
  );
};

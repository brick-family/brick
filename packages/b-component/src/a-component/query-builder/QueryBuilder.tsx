import React, { FC, useEffect } from 'react';
import { Field, QueryBuilder as ReactQueryBuilder, RuleGroupType } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import { IColumnEntity, ITableEntity } from '@brick/types';
import { useCreation, useMemoizedFn } from 'ahooks';
import s from './queryBuilder.less';
import { QueryBuilderAntD } from './wrapper';
import { combinators, FieldInputType, FieldOperations, operators } from './wrapper/utils';
import { QueryBuilderProvider, useQueryBuilderSelector } from './processor';
import { Footer } from './footer';

const controlClassnames = {
  ruleGroup: s.ruleGroup,
  queryBuilder: s.queryBuilder,
  // valueSelector: s.valueSelector,
  // valueSource: s.valueSource,
  operators: s.operators,
};

export interface IQueryBuilderContentProps {
  tableConfig: ITableEntity;
  onChange: (value: RuleGroupType) => void;
  value?: RuleGroupType;
  onOk?: (value: RuleGroupType) => void;
}

const QueryBuilderContent: FC<IQueryBuilderContentProps> = ({
  tableConfig,
  value,
  onChange,
  onOk,
}) => {
  const fields = useCreation(() => {
    return (
      tableConfig?.columns?.map((item) => {
        return {
          name: item.dbFieldName!,
          label: item.title,
          value: item.dbFieldName!,
          ...item,
        };
      }) || []
    );
  }, [tableConfig?.columns]);

  const [query, setQuery, setExecuteQueryFun] = useQueryBuilderSelector((s) => [
    s.query,
    s.setQuery,
    s.setExecuteQueryFun,
  ]);

  useEffect(() => {
    if (onOk) {
      setExecuteQueryFun(onOk);
    }
  }, [onOk]);
  // const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (value) {
      setQuery(value);
    }
  }, [value]);

  const getOperators = useMemoizedFn((field: string, msic: { fieldData: Field }) => {
    // console.log('q=>abc', field, msic);
    const columnEntity = msic.fieldData as unknown as IColumnEntity;
    const fieldType = columnEntity?.fieldType;
    return FieldOperations[fieldType] || operators;
  });

  const getInputType = useMemoizedFn(
    (field: string, operator: string, msic: { fieldData: Field }) => {
      // console.log('q=>inputType', field, operator, msic);
      const columnEntity = msic.fieldData as unknown as IColumnEntity;
      const fieldType = columnEntity?.fieldType;
      return FieldInputType[fieldType] || 'text';
    }
  );

  const getValueSources = useMemoizedFn(() => {});

  // 获取默认的field
  const getDefaultField = useMemoizedFn((fieldsData: IColumnEntity[]) => {
    if (fieldsData?.length <= 0) {
      return '';
    }

    let currIndex = 0;
    for (let i = 0; i < fieldsData.length; i++) {
      const currFiled = fieldsData[i] as unknown as any;
      if (!query.rules.find((f: any) => f.field === currFiled.dbFieldName)) {
        currIndex = i;
        break;
      }
    }
    return fieldsData[currIndex]?.dbFieldName;
  });

  const onQueryChange = useMemoizedFn((queryValue) => {
    onChange && onChange(queryValue);
    setQuery(queryValue);
  });

  console.log('q=>query', query);

  return (
    <div className={s.container}>
      <div>筛选</div>
      <QueryBuilderAntD>
        <ReactQueryBuilder
          // 控制className
          controlClassnames={controlClassnames}
          // controlElements={antdControlElements}
          combinators={combinators}
          // operators={operators}
          // getValueSources={getValueSources}

          // @ts-ignore
          getDefaultField={getDefaultField}
          getInputType={getInputType}
          getOperators={getOperators}
          query={query}
          onQueryChange={onQueryChange}
          // onQueryChange={(q) => setQuery(q)}
          fields={fields as Field[]}
        />
      </QueryBuilderAntD>
      <Footer />
    </div>
  );
};

export interface IQueryBuilderProps extends IQueryBuilderContentProps {}

export const QueryBuilder: FC<IQueryBuilderProps> = (props) => {
  return (
    <QueryBuilderProvider>
      <QueryBuilderContent {...props} />
    </QueryBuilderProvider>
  );
};

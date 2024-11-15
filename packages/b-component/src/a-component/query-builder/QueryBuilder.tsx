import React, { FC, useEffect } from 'react';
import {
  Field,
  QueryBuilder as ReactQueryBuilder,
  RuleGroupType,
  generateID,
} from 'react-querybuilder';
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
  onChange?: (value: RuleGroupType) => void;
  value?: RuleGroupType;
  onOk?: (value: RuleGroupType) => void;
  hasClear?: boolean;
  hideFilter?: boolean;
}

const QueryBuilderContent: FC<IQueryBuilderContentProps> = ({
  tableConfig,
  value,
  onChange,
  onOk,
  hasClear,
  hideFilter,
}) => {
  console.log('tableConfig?.columns?', tableConfig?.columns);

  const [
    query,
    setQuery,
    setExecuteQueryFun,
    footerRef,
    setReload,
    setHasClear,
    setDisableAddRule,
  ] = useQueryBuilderSelector((s) => [
    s.query,
    s.setQuery,
    s.setExecuteQueryFun,
    s.footerRef,
    s.setReload,
    s.setHasClear,
    s.setDisableAddRule,
  ]);

  const queryNameArr = useCreation(() => {
    if (query?.rules?.length === tableConfig?.columns?.length) {
      setDisableAddRule(true);
    } else {
      setDisableAddRule(false);
    }
    return query?.rules?.map((item) => item.field);
  }, [JSON.stringify(query?.rules)]);
  console.log('queryNameArr', queryNameArr);
  const fields = useCreation(() => {
    return (
      tableConfig?.columns?.map((item) => {
        console.log('dbFieldName', item.dbFieldName, queryNameArr);
        const disabled = queryNameArr.includes(item.dbFieldName);
        if (item.fieldType == 'RADIO') {
          return {
            name: item.dbFieldName!,
            label: item.title,
            valueEditorType: 'radio',
            // defaultValue: item.columnConfig?.options[0]?.value,
            // values: item.columnConfig?.options?.map((item: any) => ({
            //   name: item.value,
            //   label: item.label,
            // })),
            disabled: disabled,
            ...item,
          };
        } else if (item.fieldType == 'CHECKBOX') {
          return {
            name: item.dbFieldName!,
            label: item.title,
            valueEditorType: 'checkbox',
            // defaultValue: item.columnConfig?.options[0]?.value,
            // values: item.columnConfig?.options?.map((item: any) => ({
            //   name: item.value,
            //   label: item.label,
            // })),
            disabled: disabled,
            ...item,
          };
        } else if (item.dbFieldName == 'update_user') {
          return {
            name: item.dbFieldName!,
            label: item.title,
            inputType: 'date',
            disabled: disabled,
            ...item,
          };
        }
        return {
          name: item.dbFieldName!,
          label: item.title,
          // defaultValue: item.dbFieldName!,
          // disabled:  queryNameArr.includes(item.dbFieldName),
          disabled: disabled,
          ...item,
        };
      }) || []
    );
  }, [JSON.stringify(tableConfig?.columns), JSON.stringify(query?.rules)]);

  useEffect(() => {
    if (fields?.length > 0) {
      setQuery({
        id: generateID(),
        combinator: 'and',
        not: true,
        rules: [
          {
            id: generateID(),
            field: fields[0].name,
            value: '',
            operator: '',
          },
        ],
      });
    }
  }, [fields.length]);

  console.log('fields111', fields);

  console.log('query222', query);
  useEffect(() => {
    if (hasClear) {
      setHasClear(hasClear);
    } else {
      setHasClear(false);
    }
    setReload();
  }, [footerRef.current, hasClear]);

  console.log('footerref', footerRef);

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

  const isRangeOperator = (operator: string) => {
    return operator === ' BETWEEN ';
  };

  const getInputType = useMemoizedFn(
    (field: string, operator: string, msic: { fieldData: Field }) => {
      // console.log('q=>inputType', field, operator, msic);
      const columnEntity = msic.fieldData as unknown as IColumnEntity;
      const fieldType = columnEntity?.fieldType;
      console.log(
        'fieldType',
        FieldInputType[fieldType],
        fieldType,
        operator,
        isRangeOperator(operator)
      );
      if (FieldInputType[fieldType] == 'date') {
        return isRangeOperator(operator) ? 'dateRange' : 'date';
      }
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
    console.log('q=>onQueryChange', queryValue);
    onChange && onChange(queryValue);
    setQuery(queryValue);
  });

  console.log('q=>query', query);

  return (
    <div className={s.container} id="filterDropdown@1">
      <div style={{ display: hideFilter ? 'none' : 'block' }}>筛选</div>
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

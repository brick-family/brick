import { RuleType } from 'react-querybuilder';
import { IDataFilterExpression } from '@brick/services';

/**
 * Convert rules to DataFilterExpression
 * @param rules
 */
export const convertDataFilterByRuleType = (rules: RuleType[]) => {
  const newValue = rules?.map((item) => {
    return {
      field: item.field,
      op: item.operator,
      value: item.value,
      logicOp: 'AND',
    } as IDataFilterExpression;
  });

  return newValue || [];
};

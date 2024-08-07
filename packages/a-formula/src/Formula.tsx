import React, { FC } from 'react';
import classNames from 'classnames';
import s from './Formula.module.less';
import { FormulaProvider } from './formula-processor';
import { BaseFormula } from './BaseFormula';

export interface IFormulaContentProps {
  style?: React.CSSProperties;
  className?: string;
}

export const FormulaContent: FC<IFormulaContentProps> = (props) => {
  const { className } = props;

  const cls = classNames(s.formula, className);
  return (
    <div className={cls}>
      <BaseFormula label={'test'} />
    </div>
  );
};

export interface IFormulaProps {
  label?: string;
}

export const Formula: FC<IFormulaProps> = (props) => {
  return (
    <FormulaProvider>
      <FormulaContent />
    </FormulaProvider>
  );
};

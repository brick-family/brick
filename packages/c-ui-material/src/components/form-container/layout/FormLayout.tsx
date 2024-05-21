import * as React from 'react';
import { createElement } from 'react';
import { groupArray, generatorClass } from '../utils';
import classNames from 'classnames';
import './formContainer.less';

export interface FormContainerProps {
  cols: number;
}

export const FormLayout: React.FC<FormContainerProps> = function FormContainer({ cols, children }) {
  const rootClassNames = classNames(generatorClass('form-container'));
  return <div style={{ width: '100%', height: '100%' }} className={rootClassNames}></div>;
};

// export default FormContainer;

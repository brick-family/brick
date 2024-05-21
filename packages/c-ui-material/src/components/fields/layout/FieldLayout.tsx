import React, { FC, useMemo } from 'react';
import { useFormContainerSelector } from '../../form-container';
import { LayoutSpace } from '../../../../lowcode/common';
import { Col, Row } from 'antd';

export interface IProportion {
  colNumber: number;
  proportion: string;
}
export interface IFieldLayoutProps {
  /**
   * 布局规则
   */
  height: number;
  colNumber: number;
  proportion: IProportion;
  rowSpace: number;
  children: React.ReactNode[];
}
export const FieldLayout: FC<IFieldLayoutProps> = (props) => {
  // const { columnConfig, onChange, value, ...otherProps } = props;
  const { proportion: proportionObj, rowSpace, height, children } = props;
  const { colNumber, proportion } = proportionObj;
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);
  const currRowSpace = LayoutSpace.find((f) => props.rowSpace == f.value);
  console.log('q=>props', props, currRowSpace, props.rowSpace);

  const colArr: number[] = useMemo(() => {
    const colArr = [];
    for (let colIndex = 0; colIndex < colNumber; colIndex++) {
      colArr.push(colIndex);
    }
    return colArr;
  }, [colNumber]);

  const proportionArr: number[] = useMemo(() => {
    console.log('444444', proportion);
    if (proportion && typeof proportion == 'string') {
      const newProportionArr: string[] = proportion.split(':');
      console.log('23333322', newProportionArr);
      if (newProportionArr.length != colNumber) {
        return Array(colNumber).map((_, index) => index);
      } else {
        if (newProportionArr.some((item) => isNaN(Number(item)))) {
          return Array(colNumber).map((_, index) => index);
        } else {
          console.log('222', newProportionArr);

          return newProportionArr.map((item) => Number(item) * 2);
        }
      }
    }
    return Array(colNumber).map((_, index) => index);
  }, [proportion, colNumber]);

  console.log('111', colArr, proportionArr);

  return (
    <>
      <Row gutter={rowSpace} style={{ height: '100%', width: '100%' }}>
        {colArr.map((item, index) => {
          return (
            <Col key={index} span={proportionArr[item]}>
              {children?.[index]}
            </Col>
          );
        })}
      </Row>
    </>
  );
};

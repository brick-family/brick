import React, { FC, useEffect, useRef } from 'react';
import { useResourcePageSelector } from '../../../resource-page-processor';

export interface IRightProps {}

export const Right: FC<IRightProps> = (props) => {
  const rightRef = useRef<HTMLDivElement>(null);

  const [setTopBarRightRef] = useResourcePageSelector((s) => [s.portalProcessor.setTopBarRightRef]);

  useEffect(() => {
    setTopBarRightRef(rightRef);
  }, [rightRef]);

  return (
    <>
      1-<div ref={rightRef}></div>
    </>
  );
};

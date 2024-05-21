import React, { FC, memo } from 'react';

export interface IExternalProps {}

export const External: FC<IExternalProps> = memo((props) => {
  return <div>外部组织</div>;
});

export default External;

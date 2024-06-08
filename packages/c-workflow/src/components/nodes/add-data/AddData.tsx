import React, { FC } from 'react';

export interface IAddDataProps {}

const AddData: FC<IAddDataProps> = React.memo((props) => {
  console.log('q=>add-data-render');
  return <div>1add</div>;
});
export default AddData;

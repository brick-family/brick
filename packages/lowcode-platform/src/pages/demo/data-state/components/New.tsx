import React, { FC, useContext } from 'react';
import { Context } from '../service/DataStateProvider';
import { enableLegendStateReact, useSelector } from '@legendapp/state/react';

// enableLegendStateReact();
export interface INewProps {}

export const New: FC<INewProps> = (props) => {
  const d = useContext(Context);
  console.log('q=>RenderNew122', d);
  return (
    <div>
      <h1>New</h1>
      {!d.state.visible.get() && <div>display</div>}
      <div>{d.state.visible.get()}</div>
    </div>
  );
};

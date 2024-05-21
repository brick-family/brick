import { observable } from '@legendapp/state';
import { useObservable, useSelector } from '@legendapp/state/react';
import { Button } from 'antd';
import React, { FC } from 'react';

export interface ITestProps {}

const state1 = observable({ selected: 232, num: 2, list: [] });
export const Test: FC<ITestProps> = (props) => {
  const state = useObservable({ selected: 1, num: 2 });
  const test = () => {
    console.log('q=>onclik test');
    state1.selected.set(Math.random);
  };

  console.log('q=>Testrender');
  const ttt = useSelector(state1);
  return (
    <div>
      <div>test</div>
      <div>{state.selected.get()}</div>
      <div>
        {ttt.selected}---{ttt.num}
      </div>
      <div>{JSON.stringify(ttt.list)}</div>
      <Button onClick={test}>test</Button>
    </div>
  );
};

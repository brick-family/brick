import React, { FC } from 'react';
import { useDataStateSelector } from '../service/DataStateProvider';
import { Button } from 'antd';

export interface IListProps {}

const Item = React.memo(({ title }: any) => {
  console.log('q=>Item-render', title);
  return <div>{title.d}</div>;
});

export const List: FC<IListProps> = (props) => {
  // const [list, addList] = useDataStateSelector(s => [s.state.list, s.addList])

  const { list, addList, visible, state } = useDataStateSelector((s) => ({
    list: s.state.list,
    visible: s.state.visible,
    state: s.state,
    addList: s.addList,
  }));

  console.log('q=>list-render', list);
  return (
    <div>
      <div>
        {list.map((item) => {
          return <Item key={item.d} title={item} />;
        })}
      </div>

      <Button onClick={addList}>add</Button>
    </div>
  );
};

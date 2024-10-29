import React, { FC } from 'react';
import InfiniteViewer from 'react-infinite-viewer';
import s from './infiniteViewerContainer.module.less';

export interface IInfiniteViewerContainerProps {
  children?: React.ReactNode;
}

export const InfiniteViewerContainer: FC<IInfiniteViewerContainerProps> = (props) => {
  const { children } = props;
  return (
    <InfiniteViewer
      className="viewer"
      margin={0}
      threshold={0}
      rangeX={[0, 0]}
      rangeY={[0, 0]}
      onScroll={(e) => {
        console.log(e);
      }}
    >
      {children}
    </InfiniteViewer>
  );
};

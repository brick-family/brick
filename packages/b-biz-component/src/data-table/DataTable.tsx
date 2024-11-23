import React, { FC } from 'react';
import { Table } from './Table';
import { DataTableProvider, IDataTableProviderProps, useDataTableSelector } from './processor';
import { ItemDetail } from '../item-detail';
import classNames from 'classnames';
import s from './dataTable.less';

export interface IDataTableProps extends Omit<IDataTableProviderProps, 'children'> {
  style?: React.CSSProperties;
  className?: string;
}

export interface IDataTableContentProps {}

export const DataTableContent: FC<IDataTableContentProps> = (props) => {
  const [itemDetailProcessor, feature] = useDataTableSelector((s) => [
    s.itemDetailProcessor,
    s.feature,
  ]);
  return (
    <>
      {feature.hasDetail && <ItemDetail itemDetailProcessor={itemDetailProcessor} />}
      <Table />
    </>
  );
};

export const DataTable: FC<IDataTableProps> = ({ style, className, ...otherProps }) => {
  return (
    <DataTableProvider {...otherProps}>
      <div style={style} className={classNames(s.container, className)}>
        <DataTableContent />
      </div>
    </DataTableProvider>
  );
};

export default DataTable;

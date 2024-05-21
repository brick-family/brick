import { createColumnHelper } from '@tanstack/react-table';
import React, { FC } from 'react';

export interface IBaseTableProps {
  // columns?: IColumnEntity[],
  // data?: [],
  tableId: string;
}

const columnHelper = createColumnHelper<any>();

export const Table: FC<IBaseTableProps> = ({ tableId }) => {
  // const newColumns = [
  // columnHelper.accessor('firstName', {
  //   cell: info => info.getValue(),
  //   footer: info => info.column.id,
  // }),
  // columnHelper.accessor(row => row.lastName, {
  //   id: 'lastName',
  //   cell: info => <i>{info.getValue()}</i>,
  //   header: () => <span>Last Name</span>,
  //   footer: info => info.column.id,
  // }),
  // columnHelper.accessor('age', {
  //   header: () => 'Age',
  //   cell: info => info.renderValue(),
  //   footer: info => info.column.id,
  // }),
  // columnHelper.accessor('visits', {
  //   header: () => <span>Visits</span>,
  //   footer: info => info.column.id,
  // }),
  // columnHelper.accessor('status', {
  //   header: 'Status',
  //   footer: info => info.column.id,
  // }),
  // columnHelper.accessor('progress', {
  //   header: 'Profile Progress',
  //   footer: info => info.column.id,
  // }),
  // ]

  return <div></div>;
};

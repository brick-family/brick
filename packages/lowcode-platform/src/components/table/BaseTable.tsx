import { IColumnEntity } from '@brick/types';
import {
  ColumnDef,
  ColumnHelper,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { FC } from 'react';
import { TextTable } from './test';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

// const defaultData: Person[] = [
//   {
//     firstName: 'tanner',
//     lastName: 'linsley',
//     age: 24,
//     visits: 100,
//     status: 'In Relationship',
//     progress: 50,
//   },
//   {
//     firstName: 'tandy',
//     lastName: 'miller',
//     age: 40,
//     visits: 40,
//     status: 'Single',
//     progress: 80,
//   },
//   {
//     firstName: 'joe',
//     lastName: 'dirte',
//     age: 45,
//     visits: 20,
//     status: 'Complicated',
//     progress: 10,
//   },
// ]

// const columnHelper = createColumnHelper<Person>()

// columnHelper.accessor('firstName')

export interface IBaseTableProps {
  columns: ColumnDef<any, any>[];
  data: [];
}

export const BaseTable: FC<IBaseTableProps> = ({ columns }) => {
  const [data, setData] = React.useState([]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="ant-table-wrapper">
      <div className="ant-table">
        <TextTable />
        <div className="ant-table-content">
          <table>
            <thead className="ant-table-thead">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="ant-table-cell" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="ant-table-tbody">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="ant-table-row ant-table-row-level-0">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="ant-table-cell">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.footer, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </div>

        <div className="h-4" />
        <button onClick={() => rerender()} className="border p-2">
          Rerender11
        </button>
      </div>
    </div>
  );
};

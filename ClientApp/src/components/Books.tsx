import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Book } from '../types';

const Books = () => {
  const columnHelper = createColumnHelper<Book>();
  const fetchBooks = async () => {
    const response = await fetch('book');
    const data = await response.json();
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  console.log(data);

  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('authorID', {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor('createdDateTime', {
      header: () => 'Created At',
      cell: (info) => info.renderValue()?.toLocaleString(),
    }),
    columnHelper.accessor('id', {
      header: () => 'Edit',
      cell: (info) => <a href={`/edit/books/${info.renderValue()}`}>Edit</a>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderTable = (books) => (
    <table className="table table-striped" aria-labelledby="tableLabel">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h1 id="tableLabel">Books</h1>
      <p>This page demonstrates fetching data from the server.</p>
      <div>
        {isLoading ? (
          <p>
            <em>Loading...</em>
          </p>
        ) : (
          renderTable(data)
        )}
      </div>
    </div>
  );
};

export default Books;

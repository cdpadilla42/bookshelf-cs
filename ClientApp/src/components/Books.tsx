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
    const response = await fetch('api/book');
    const data = await response.json();
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const handleDeleteBook = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm(
      `Are you sure you want to delete book of id ${id}?`
    );
    if (!confirmed) return;
    const response = await fetch(`api/book/delete/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    return response;
  };

  console.log(data);

  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('authorID', {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Author ID</span>,
    }),
    columnHelper.accessor('createdDateTime', {
      header: () => 'Created At',
      cell: (info) => info.renderValue()?.toLocaleString(),
    }),
    columnHelper.display({
      id: 'edit',
      cell: (props) => (
        <a href={`/admin/book/edit/${props.row.original.id}`}>Edit</a>
      ),
    }),
    columnHelper.display({
      id: 'delete',
      cell: (props) => (
        <a onClick={() => handleDeleteBook(props.row.original.id)}>Delete</a>
      ),
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
      <div className="container">
        <div className="row">
          <div className="col">
            <p>This page demonstrates fetching data from the server.</p>
          </div>
          <div className="col-2">
            <a href={`/admin/book/edit`}>
              <button type="submit" className="btn btn-primary">
                Add Book
              </button>
            </a>
          </div>
        </div>
      </div>
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

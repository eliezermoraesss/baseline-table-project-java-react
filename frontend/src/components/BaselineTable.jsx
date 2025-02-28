import React from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';
import { Table, Button, Form } from 'react-bootstrap';

const BaselineTable = ({ 
  data, 
  onPageChange, 
  onPageSizeChange, 
  currentPage, 
  pageSize 
}) => {
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Código QP',
      accessorKey: 'codQp',
    },
    {
      header: 'Equipamento',
      accessorKey: 'equipamento',
    },
    {
      header: 'Grupo',
      accessorKey: 'grupo',
    },
    {
      header: 'Nível',
      accessorKey: 'nivel',
    },
    {
      header: 'Código',
      accessorKey: 'codigo',
    },
    {
      header: 'Código Pai',
      accessorKey: 'codigoPai',
    },
    {
      header: 'Descrição',
      accessorKey: 'descricao',
    },
    {
      header: 'Tipo',
      accessorKey: 'tipo',
    },
    {
      header: 'Qtde BL',
      accessorKey: 'qtdeBl',
      cell: ({ getValue }) => Number(getValue()).toFixed(2),
    },
    {
      header: 'Unidade',
      accessorKey: 'unidMedida',
    },
    {
      header: 'Especificações',
      accessorKey: 'especificacoes',
    },
    {
      header: 'Qtde Projeto',
      accessorKey: 'qtdeProj',
      cell: ({ getValue }) => Number(getValue()).toFixed(2),
    },
    {
      header: 'Qtde Total',
      accessorKey: 'qtdeTotal',
      cell: ({ getValue }) => Number(getValue()).toFixed(2),
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
    {
      header: 'Status OP',
      accessorKey: 'statusOp',
    },
    {
      header: 'Data Criação',
      accessorKey: 'createdAt',
      cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
    },
  ];

  const tableData = data?.content || [];

  // Desative a paginação do TanStack Table, já que estamos usando paginação do servidor
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true, // Importante: indica que a paginação é manual (vinda do servidor)
    pageCount: data?.totalPages || 0,
  });

  if (!data || !data.content || data.content.length === 0) {
    return <div>Nenhum dado disponível.</div>;
  }

  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <span>
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼'
                    ) : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Button
            onClick={() => onPageChange(0)}
            disabled={currentPage === 0}
          >
            {'<<'}
          </Button>{' '}
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            {'<'}
          </Button>{' '}
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= data.totalPages - 1}
          >
            {'>'}
          </Button>{' '}
          <Button
            onClick={() => onPageChange(data.totalPages - 1)}
            disabled={currentPage >= data.totalPages - 1}
          >
            {'>>'}
          </Button>
        </div>
        <div>
          <span>
            Página{' '}
            <strong>
              {currentPage + 1} de {data.totalPages}
            </strong>{' '}
            | Total: {data.totalElements} registros
          </span>
          <span className="ms-3">
            Ir para página:{' '}
            <Form.Control
              type="number"
              min={1}
              max={data.totalPages}
              value={currentPage + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                if (page >= 0 && page < data.totalPages) {
                  onPageChange(page);
                }
              }}
              style={{ width: '70px', display: 'inline-block' }}
            />
          </span>{' '}
          <Form.Select
            value={pageSize}
            onChange={e => {
              onPageSizeChange(Number(e.target.value));
            }}
            style={{ width: '120px', display: 'inline-block', marginLeft: '10px' }}
          >
            {[10, 20, 30, 50, 100].map(size => (
              <option key={size} value={size}>
                Mostrar {size}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
    </div>
  );
};

export default BaselineTable;

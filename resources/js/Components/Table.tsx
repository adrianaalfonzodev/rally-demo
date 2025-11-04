import React from 'react'
import type { MRT_ColumnDef } from 'material-react-table'
import type { TableProps } from '@/types/table'


export default function Table({
  headers = [],
  data = [],
  renderActions
}: TableProps) {
  const columns: MRT_ColumnDef<any>[] = headers.map((h) => ({
    accessorKey: h.key,
    header: h.name
  }))

  const LazyMRT = React.lazy(async () => {
    const mod = await import('material-react-table')
    return { default: mod.MaterialReactTable } as any
  })

  return (
    <div>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"></div>
      <div className="overflow-hidden bg-white">
        <React.Suspense
          fallback={
            <div className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />

                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 rounded" />
                  <div className="h-8 bg-gray-200 rounded" />
                  <div className="h-8 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          }
        >
          <LazyMRT
            columns={columns}
            data={data}
            enableColumnActions={false}
            enablePinning={false}
            initialState={{
              density: 'compact',
              columnPinning: {
                left: ['mrt-row-expand', 'mrt-row-select'],
                right: ['mrt-row-actions']
              }
            }}
            enableColumnFilterModes={false}
            enableRowActions={true}
            renderRowActions={({ row }: { row: any }) =>
              renderActions ? (
                <div className="flex items-center">
                  {renderActions(row.original)}
                </div>
              ) : null
            }
            muiTablePaperProps={{ elevation: 0, sx: { boxShadow: 'none' } }}
            muiBottomToolbarProps={{ sx: { boxShadow: 'none' } }}
          />
        </React.Suspense>
      </div>
    </div>
  )
}

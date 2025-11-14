import React, { useState, useMemo, useCallback } from 'react'
import { Link } from '@inertiajs/react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import type { MRT_ColumnDef } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import type { TableProps } from '@/types/table'
import TextInput from './TextInput'

const LazyMRT = React.lazy(async () => {
  const mod = await import('material-react-table')
  return { default: mod.MaterialReactTable } as any
})

export default function Table({
  headers = [],
  data = [],
  renderActions,
  path
}: TableProps) {
  const columns: MRT_ColumnDef<any>[] = useMemo(
    () =>
      headers.map((h) => ({
        accessorKey: h.key,
        header: h.name
      })),
    [headers]
  )

  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [columnFilters, setColumnFilters] = useState<
    Array<{ id: string; value: any }>
  >([])

  const tableState = useMemo(
    () => ({ globalFilter, columnFilters }),
    [globalFilter, columnFilters]
  )

  const renderRowActions = useCallback(
    ({ row }: { row: any }) =>
      renderActions ? (
        <div className="flex items-center">{renderActions(row.original)}</div>
      ) : null,
    [renderActions]
  )

  return (
    <div>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"></div>
      <div className="p-4 mb-4">
        <div className="flex items-center justify-between gap-3 mb-4 pb-4 bg-white border-b border-gray-200">
          <TextInput
            placeholder="Buscar..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            icon={<MagnifyingGlassIcon />}
          />

          {route ? (
            <Link
              href={route(path)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-[#F2731A]"
            >
              <PlusIcon
                className="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              <span>Nuevo</span>
            </Link>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3">
          {headers.map((h) => {
            const current = columnFilters.find((cf) => cf.id === h.key)
            return (
              <TextInput
                id={`filter-${h.key}`}
                key={h.key}
                placeholder={`${h.name}`}
                value={current ? current.value : ''}
                onChange={(e) => {
                  const val = e.target.value
                  setColumnFilters((prev) => {
                    const others = prev.filter((pf) => pf.id !== h.key)
                    if (val === '') return others
                    return [...others, { id: h.key, value: val }]
                  })
                }}
              />
            )
          })}
        </div>
      </div>

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
            initialState={{
              density: 'compact',
              showColumnFilters: false,
              columnPinning: {
                left: ['mrt-row-expand', 'mrt-row-select'],
                right: ['mrt-row-actions']
              }
            }}
            columns={columns}
            data={data}
            state={tableState}
            onGlobalFilterChange={setGlobalFilter}
            onColumnFiltersChange={setColumnFilters}
            enableColumnActions={false}
            enablePinning={true}
            enableRowActions={true}
            enableFilters={false}
            enableHiding={false}
            enableGlobalFilter={false}
            renderRowActions={renderRowActions}
            localization={MRT_Localization_ES}
            muiTablePaperProps={{ elevation: 0, sx: { boxShadow: 'none' } }}
            muiBottomToolbarProps={{ sx: { boxShadow: 'none' } }}
          />
        </React.Suspense>
      </div>
    </div>
  )
}

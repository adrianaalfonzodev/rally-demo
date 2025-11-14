import Table from '@/Components/Table'
import { Link, useForm } from '@inertiajs/react'
import { User } from '@/types/users'
import React from 'react'
import notification from '@/utils/notification'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function List({ invoices = [] }: { invoices: any[] }) {
  const { post } = useForm({
    _method: 'delete'
  })

  const headers = [
    { name: 'ID', key: 'id' },
    { name: 'Nro Factura', key: 'number' },
    { name: 'Fecha Factura', key: 'datetime' },
    { name: 'Rif Cliente', key: 'id_number' },
    { name: 'Nombre Cliente', key: 'customer_name' },
    { name: 'Cantidad Items', key: 'items_count' },
    // { name: 'Subtotal', key: 'subtotal' },
    { name: 'Total', key: 'total' },
    { name: 'Creado Por', key: 'created_by' },
    { name: 'Fecha de Creación', key: 'created_at' },
  ]

  const deleteData = (dataId: number) => {
    notification.confirm(
      `¿Estás seguro de que deseas eliminar la factura ${dataId}? Esta acción no se puede deshacer.`,
      () => {
        post(route('billing.invoices.destroy', dataId), {
          onSuccess: () =>
            notification.success('Factura eliminada correctamente'),
          onError: () => notification.error('Error al eliminar la factura')
        })
      }
    )
  }

  /**
   * Render actions for a role
   *
   * @param role Role
   * @returns  React.ReactNode
   */
  const renderActions = (data: any) => {
    if (!data) return null
    return (
      <div className="flex space-x-4">
        <Link
          href={route('billing.invoices.edit', data.id)}
          className="text-blue-600 hover:underline"
        >
          Editar
        </Link>
        <Link
          onClick={() => deleteData(data.id)}
          className="text-red-600 hover:underline"
        >
          Eliminar
        </Link>
      </div>
    )
  }

  return (
    <div className="py-4">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"></div>
      <div className="overflow-hidden shadow sm:rounded-lg">
        <div className="p-3 bg-white border-b border-gray-200">
          <Table
            headers={headers}
            data={invoices}
            renderActions={renderActions}
            path={'billing.invoices.create'}
          />
        </div>
      </div>
    </div>
  )
}

import Table from '@/Components/Table'
import { Link, useForm } from '@inertiajs/react'
import { User } from '@/types/users'
import React from 'react'
import notification from '@/utils/notification'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function List({ products = [] }: { products: any[] }) {
  const { post } = useForm({
    _method: 'delete'
  })

  const headers = [
    { name: 'ID', key: 'id' },
    { name: 'SKU', key: 'sku' },
    { name: 'Nombre', key: 'name' },
    { name: 'Descripción', key: 'description' },
    { name: 'Ubicación', key: 'location' },
    { name: 'Costo', key: 'cost' },
    { name: 'Precio de Venta', key: 'sale_price' },
    { name: 'Precio unitario', key: 'price_unit' },
    { name: 'Cantidad minima', key: 'stock_min' },
    { name: 'Cantidad maxima', key: 'stock_max' },
    { name: 'Estado', key: 'is_active' },
    { name: 'Creado Por', key: 'created_by' }
  ]

  const deleteData = (dataId: number) => {
    notification.confirm(
      `¿Estás seguro de que deseas eliminar el producto ${dataId}? Esta acción no se puede deshacer.`,
      () => {
        post(route('inventory.products.destroy', dataId), {
          onSuccess: () =>
            notification.success('Producto eliminado correctamente'),
          onError: () => notification.error('Error al eliminar el producto')
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
          href={route('inventory.products.edit', data.id)}
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
            data={products}
            renderActions={renderActions}
            path={'inventory.products.create'}
          />
        </div>
      </div>
    </div>
  )
}

import Table from '@/Components/Table'
import { Link, useForm } from '@inertiajs/react'
import { Agent } from '@/types/agent'
import notification from '@/utils/notification'

export default function List({ agents = [] }: { agents: Agent[] }) {
  const { post } = useForm({
    _method: 'delete'
  })

  const headers = [
    { name: 'ID', key: 'id' },
    { name: 'Cedula o RIF', key: 'id_number' },
    { name: 'Nombre', key: 'fullname' },
    { name: 'Correo', key: 'email' },
    { name: 'Teléfono', key: 'phone' },
    { name: 'Estado', key: 'is_active' },
    { name: 'Creado', key: 'created_at' },
    { name: 'Actualizado', key: 'updated_at' }
  ]

  const deleteData = (dataId: number) => {
    notification.confirm(
      `¿Estás seguro de que deseas eliminar el proveedor ${dataId}? Esta acción no se puede deshacer.`,
      () => {
        post(route('administration.providers.destroy', dataId), {
          onSuccess: () =>
            notification.success('Proveedor eliminado correctamente'),
          onError: () => notification.error('Error al eliminar el proveedor')
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
  const renderActions = (data: Agent) => {
    if (!data) return null
    return (
      <div className="flex space-x-4">
        <Link
          href={route('administration.providers.edit', data.id)}
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
            data={agents}
            renderActions={renderActions}
            path={'administration.providers.create'}
          />
        </div>
      </div>
    </div>
  )
}

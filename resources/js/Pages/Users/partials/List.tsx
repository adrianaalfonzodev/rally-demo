import Table from '@/Components/Table'
import { Link, useForm } from '@inertiajs/react'
import { User } from '@/types/users'
import notification from '@/utils/notification'

export default function List({ users = [] }: { users: User[] }) {
  const { post } = useForm({
    _method: 'delete'
  })

  const headers = [
    { name: 'ID', key: 'id' },
    { name: 'Nombre', key: 'fullname' },
    { name: 'Rol', key: 'rol' },
    { name: 'Estado', key: 'is_active' },
    { name: 'Creado', key: 'created_at' },
    { name: 'Actualizado', key: 'updated_at' }
  ]

  const deleteData = (dataId: number) => {
    notification.confirm(
      `¿Estás seguro de que deseas eliminar el usuario ${dataId}? Esta acción no se puede deshacer.`,
      () => {
        post(route('administration.users.destroy', dataId), {
          onSuccess: () =>
            notification.success('Usuario eliminado correctamente'),
          onError: () => notification.error('Error al eliminar el usuario')
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
  const renderActions = (data: User) => {
    if (!data) return null
    if (data.rol?.toLowerCase().includes('admin'))
      return <span className="text-gray-500">Sin acciones</span>
    return (
      <div className="flex space-x-4">
        <Link
          href={route('administration.users.edit', data.id)}
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
            data={users}
            renderActions={renderActions}
            path={'administration.users.create'}
          />
        </div>
      </div>
    </div>
  )
}

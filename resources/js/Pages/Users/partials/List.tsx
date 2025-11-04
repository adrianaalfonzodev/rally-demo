import Table from '@/Components/Table'
import { Link, useForm } from '@inertiajs/react'
import { User } from '@/types/users'
import React from 'react'
import notification from '@/utils/notification'
import { PlusIcon } from '@heroicons/react/24/outline'

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

  const deleteUser = (userId: number) => {
    notification.confirm(
      `¿Estás seguro de que deseas eliminar el usuario ${userId}? Esta acción no se puede deshacer.`,
      () => {
        post(route('administration.users.destroy', userId), {
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
  const renderActions = (user: User) => {
    if (!user) return null
    if (user.rol?.toLowerCase().includes('admin'))
      return <span className="text-gray-500">Sin acciones</span>
    return (
      <div className="flex space-x-4">
        <Link
          href={route('administration.users.edit', user.id)}
          className="text-blue-600 hover:underline"
        >
          Editar
        </Link>
        <Link
          onClick={() => deleteUser(user.id)}
          className="text-red-600 hover:underline"
        >
          Eliminar
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"></div>
      <div className="overflow-hidden shadow sm:rounded-lg">
        <div className="flex justify-end p-3 bg-white border-b border-gray-200">
          <Link
            href={route('administration.users.create')}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-[#F2731A]"
          >
            <PlusIcon
              className="w-4 h-4 mr-2"
              aria-hidden="true"
            />
            <span>Nuevo</span>
          </Link>
        </div>
        <div className="p-3 bg-white border-b border-gray-200">
          <Table
            headers={headers}
            data={users}
            renderActions={renderActions}
          />
        </div>
      </div>
    </div>
  )
}

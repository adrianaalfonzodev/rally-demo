import Table from '@/Components/Table'
import { Link, useForm } from '@inertiajs/react'
import { Role } from '@/types/roles'
import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import notification from '@/utils/notification'

export default function List({ roles = [] }: { roles: Role[] }) {
  const { post } = useForm({
    _method: 'delete'
  })

  const headers = [
    { name: 'ID', key: 'id' },
    { name: 'Nombre', key: 'name' },
    { name: 'Descripción', key: 'description' },
    { name: 'Estado', key: 'is_active' }
  ]

  const deleteRole = (roleId: number) => {
    notification.confirm(
      `¿Estás seguro de que deseas eliminar el rol ${roleId}? Esta acción no se puede deshacer.`,
      () => {
        post(route('administration.roles.destroy', roleId), {
          onSuccess: () => notification.success('Rol eliminado correctamente'),
          onError: () => notification.error('Error al eliminar el rol')
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
  const renderActions = (role: Role) => {
    if (!role) return null
    if (role.name.toLowerCase().includes('admin'))
      return <span className="text-gray-500">Sin acciones</span>
    return (
      <div className="flex space-x-4">
        <Link
          href={route('administration.roles.edit', role.id)}
          className="text-blue-600 hover:underline"
        >
          Editar
        </Link>
        <Link
          onClick={() => deleteRole(role.id)}
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
            href={route('administration.roles.create')}
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
            data={roles}
            renderActions={renderActions}
          />
        </div>
      </div>
    </div>
  )
}

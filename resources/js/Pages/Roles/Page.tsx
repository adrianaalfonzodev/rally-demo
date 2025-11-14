import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Role } from '@/types/roles'
import { useForm } from '@inertiajs/react'
import Form from './partials/Form'

export default function Page({ role }: { role: Role }) {
  const form = useForm({
    id: role ? role.id : null,
    name: role ? role.name : '',
    description: role ? role.description : '',
    is_active: role ? role.is_active : true,
    permissions: role ? JSON.parse(role.permissions || '{}') || [] : []
  })

  return (
    <Authenticated title={role ? 'Editar Rol' : 'Crear rol de usuario'}>
      <div className="py-4">
        <div>
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <Form form={form} />
          </div>
        </div>
      </div>
    </Authenticated>
  )
}

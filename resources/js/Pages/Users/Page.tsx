import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Role } from '@/types/roles'
import { useForm } from '@inertiajs/react'
import Form from './partials/Form'
import { User } from '@/types'

export default function Page({
  user,
  roles = []
}: {
  user: any
  roles?: Role[]
}) {
  user = user ? user.data : null
  const dataRoles: Role[] = roles || []

  const form = useForm({
    id: user ? user.id : null,
    name: user ? user.name : '',
    last_name: user ? user.last_name : '',
    email: user ? user.email : '',
    password: '',
    password_confirmation: '',
    is_active: user ? user.is_active : true,
    role_id: user
      ? dataRoles.find((role: Role) => role.name === user.rol)?.id
      : null
  })

  return (
    <Authenticated title={user ? 'Editar Usuario' : 'Crear Usuario'}>
      <div className="py-4">
        <div>
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <Form
              form={form}
              roles={dataRoles}
            />
          </div>
        </div>
      </div>
    </Authenticated>
  )
}

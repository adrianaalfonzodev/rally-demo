import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Role } from '@/types/roles'
import { useForm } from '@inertiajs/react'
import Form from './partials/Form'
import { User } from '@/types'

export default function Page({
  agent,
  title
}: {
  agent: any
  title: string
}) {
  agent = agent ? agent.data : null

  const form = useForm({
    name: agent ? agent.name : '',
    lastname: agent ? agent.lastname : '',
    id_number: agent ? agent.id_number : '',
    email: agent ? agent.email : '',
    phone: agent ? agent.phone : '',
    address: agent ? agent.address : '',
    id: agent ? agent.id : null,
    is_active: agent ? agent.is_active : true
  })

  return (
    <Authenticated title={title}>
      <div className="py-4">
        <div>
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <Form
              form={form}
              text={title.includes('Cliente') ? 'Cliente' : 'Proveedor'}
            />
          </div>
        </div>
      </div>
    </Authenticated>
  )
}

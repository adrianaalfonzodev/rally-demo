import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { Transition } from '@headlessui/react'
import React from 'react'
import notification from '@/utils/notification'
import { Role } from '@/types/roles'
import Dropdown from '@/Components/Dropdown'
import {
  ChevronDownIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import Popover from '../../../Components/Popover'

export default function Form({
  form,
  roles = []
}: {
  form: any
  roles?: Role[]
}) {
  const { data, setData, patch, errors, processing, recentlySuccessful } = form

  const title =
    data.id !== null
      ? {
          title: 'Actualizar',
          titling: 'Actualizando...',
          title_end: 'Actualizado'
        }
      : {
          title: 'Crear',
          titling: 'Creando...',
          title_end: 'Creado'
        }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (data.id !== null) {
      patch(route('administration.users.update', data.id), {
        onSuccess: () =>
          notification.success('Usuario actualizado correctamente'),
        onError: () => notification.error('Error al actualizar el usuario')
      })
    } else {
      form.post(route('administration.users.store'), {
        onSuccess: () => notification.success('Usuario creado correctamente'),
        onError: () => notification.error('Error al crear el usuario')
      })
    }
  }

  return (
    <div>
      <header className="flex justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Configuración de usuario
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Modifica los detalles del usuario, incluyendo nombre, descripción y
            rol.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <InputLabel value="Estado" />
            <Popover
              trigger={<QuestionMarkCircleIcon className="h-4 w-4" />}
              triggerClassName="inline-flex ml-1 items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none"
              panelClassName="py-2 bg-white"
              align="right"
              triggerOnHover={true}
            >
              <div className="px-4 py-2 text-sm text-gray-700">
                <p className="text-xs">
                  Si el usuario está activo, podrá iniciar sesión en el sistema.
                </p>
              </div>
            </Popover>
          </div>
          <Dropdown>
            <Dropdown.Trigger>
              <button
                type="button"
                className={`inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium focus:outline-none ${
                  {
                    true: 'bg-green-600 text-white border-green-600 hover:bg-green-700',
                    false: 'bg-white text-gray-700 hover:bg-gray-50'
                  }[String(!!data.is_active)]
                }`}
              >
                {data.is_active ? 'Activo' : 'Inactivo'}
                <ChevronDownIcon className="ml-2 h-3 w-3" />
              </button>
            </Dropdown.Trigger>

            <Dropdown.Content
              align="right"
              width="48"
              contentClasses="py-1 bg-white"
            >
              <div className="py-1">
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100"
                  onClick={() => setData('is_active', true)}
                >
                  Activo
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100"
                  onClick={() => setData('is_active', false)}
                >
                  Inactivo
                </button>
              </div>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </header>
      <form
        className="mt-6"
        onSubmit={handleSubmit}
      >
        {/* Grid for main fields: role, name, last name, email, passwords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <InputLabel
              htmlFor="role_id"
              value="Rol"
            />
            <select
              id="role_id"
              name="role_id"
              value={data.role_id ? data.role_id : ''}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(event) => {
                const selectedRole = roles.find(
                  (role) => role.id === parseInt(event.target.value)
                )
                setData('role_id', selectedRole?.id || null)
              }}
            >
              <option
                value=""
                disabled
              >
                Seleccionar
              </option>
              {roles.map((role) => (
                <option
                  key={role.id}
                  value={role.id}
                >
                  {role.name}
                </option>
              ))}
            </select>
            <InputError
              className="mt-2"
              message={errors.role_id}
            />
          </div>

          <div>
            <InputLabel
              htmlFor="email"
              value="Correo electrónico"
            />
            <TextInput
              className="w-full"
              id="email"
              name="email"
              defaultValue={data.email ? data.email : ''}
              required
              autoComplete="email"
              onChange={(event) => setData('email', event.target.value)}
            />
            <InputError
              className="mt-2"
              message={errors.email}
            />
          </div>

          <div>
            <InputLabel
              htmlFor="name"
              value="Nombre"
            />
            <TextInput
              className="w-full"
              id="name"
              name="name"
              defaultValue={data.name ? data.name : ''}
              required
              isFocused
              autoComplete="name"
              onChange={(event) => setData('name', event.target.value)}
            />
            <InputError
              className="mt-2"
              message={errors.name}
            />
          </div>

          <div>
            <InputLabel
              htmlFor="last_name"
              value="Apellido"
            />
            <TextInput
              className="w-full"
              id="last_name"
              name="last_name"
              defaultValue={data.last_name ? data.last_name : ''}
              required
              autoComplete="last_name"
              onChange={(event) => setData('last_name', event.target.value)}
            />
            <InputError
              className="mt-2"
              message={errors.last_name}
            />
          </div>

          <div>
            <InputLabel
              htmlFor="password"
              value="Contraseña"
            />
            <TextInput
              className="w-full"
              id="password"
              name="password"
              type="password"
              required={!data.id}
              autoComplete="new-password"
              onChange={(event) => setData('password', event.target.value)}
            />
            <InputError
              className="mt-2"
              message={errors.password}
            />
          </div>

          <div>
            <InputLabel
              htmlFor="password_confirmation"
              value="Confirmar contraseña"
            />
            <TextInput
              className="w-full"
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              required={!data.id}
              autoComplete="new-password"
              onChange={(event) =>
                setData('password_confirmation', event.target.value)
              }
            />
            <InputError
              className="mt-2"
              message={errors.password_confirmation}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <PrimaryButton
            disabled={processing}
            type="submit"
          >
            {processing ? (
              <span>{title.titling}</span>
            ) : (
              <span>{title.title}</span>
            )}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{title.title_end}!</p>
          </Transition>
        </div>
      </form>
    </div>
  )
}

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
  text
}: {
  form: any
  text: string
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
      patch(route('administration.providers.update', data.id), {
        onSuccess: () =>
          notification.success(`${text} actualizado correctamente`),
        onError: () => notification.error(`Error al actualizar el ${text.toLocaleLowerCase()}`)
      })
    } else {
      form.post(route('administration.providers.store'), {
        onSuccess: () => notification.success(`${text} creado correctamente`),
        onError: () => notification.error(`Error al crear el ${text.toLocaleLowerCase()}`)
      })
    }
  }

  return (
    <div>
      <header className="flex justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Configuración de {text}
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Modifica los detalles del {text.toLocaleLowerCase()}, incluyendo nombre, correo electrónico y cedula o rif.
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
                  Si el {text.toLocaleLowerCase()} está activo, podra asociarlo a transacciones y operaciones dentro del sistema.
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
              name="lastname"
              defaultValue={data.lastname ? data.lastname : ''}
              required
              autoComplete="last_name"
              onChange={(event) => setData('lastname', event.target.value)}
            />
            <InputError
              className="mt-2"
              message={errors.lastname}
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
              htmlFor="phone"
              value="Teléfono"
            />
            <TextInput
              className="w-full"
              id="phone"
              name="phone"
              defaultValue={data.phone ? data.phone : ''}
              required
              autoComplete="phone"
              onChange={(event) => setData('phone', event.target.value)}
            />
            <InputError
              className="mt-2"
              message={errors.phone}
            />
          </div>

          <div>
            <InputLabel
              htmlFor="id_number"
              value="Cedula o Rif"
            />
            <TextInput
              className="w-full"
              id="id_number"
              name="id_number"
              defaultValue={data.id_number ? data.id_number : ''}
              required
              autoComplete="id_number"
              onChange={(event) => setData('id_number', event.target.value)}
            />
            <InputError
              className="mt-2"
              message={errors.id_number}
            />
          </div>

          <div>
            <InputLabel
              htmlFor="address"
              value="Dirección"
            />
            <TextInput
              className="w-full"
              id="address"
              name="address"
              defaultValue={data.address ? data.address : ''}
              required
              autoComplete="address"
              onChange={(event) => setData('address', event.target.value)}
            />
            <InputError
              className="mt-2"
              message={errors.address}
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

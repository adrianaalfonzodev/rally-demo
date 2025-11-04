import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { Transition } from '@headlessui/react'
import React from 'react'
import notification from '@/utils/notification'
import { Menu } from '@/Components/Menu'


export default function Form({ form }: { form: any }) {
  const { data, setData, patch, errors, processing, recentlySuccessful } = form

  const crud = [
    { key: 'create', label: 'Agregar' },
    { key: 'update', label: 'Editar' },
    { key: 'read', label: 'Ver' },
    { key: 'delete', label: 'Eliminar' }
  ]

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
      patch(route('administration.roles.update', data.id), {
        onSuccess: () => notification.success('Rol actualizado correctamente'),
        onError: () => notification.error('Error al actualizar el rol')
      })
    } else {
      form.post(route('administration.roles.store'), {
        onSuccess: () => notification.success('Rol creado correctamente'),
        onError: () => notification.error('Error al crear el rol')
      })
    }
  }

  return (
    <div>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Configuración del rol
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Modifica los detalles del rol, incluyendo nombre, descripción y
          estatus.
        </p>
      </header>
      <form className="mt-6" onSubmit={handleSubmit}>
        {/* Grid for main fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <InputLabel htmlFor="name" value="Nombre" />
            <TextInput
              className='w-full'
              id="name"
              name="name"
              defaultValue={data.name ? data.name : ''}
              required
              isFocused
              autoComplete="name"
              onChange={(event) => setData('name', event.target.value)}
            />
            <InputError className="mt-2" message={errors.name} />
          </div>

          <div>
            <InputLabel htmlFor="description" value="Descripción" />
            <TextInput
            className='w-full'
              id="description"
              name="description"
              defaultValue={data.description ? data.description : ''}
              required
              onChange={(event) => setData('description', event.target.value)}
              autoComplete="description"
            />
            <InputError className="mt-2" message={errors.description} />
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center space-x-3">
            <Checkbox
              id="is_active"
              name="is_active"
              defaultChecked={data.is_active}
              onChange={(event) => setData('is_active', event.target.checked)}
            />
            <span className="text-sm text-gray-700">¿Está activo?</span>
          </label>
        </div>

        {/* Permissions Section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Permisos</h3>
          <div className="space-y-4">
            {Menu.map((item) => (
              <div key={item.name} className="bg-white shadow-sm rounded-lg p-4">
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-800">{item.name}</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {item.items.map((permission) => (
                    <div key={permission.name} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center">
                        <InputLabel htmlFor={permission.name} value={permission.name} className="mb-0" />
                      </div>

                      <div className="flex items-center space-x-4">
                        {crud.map((action) => (
                          <label key={action.key} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${permission.name}.${action.key}`}
                              name={`permissions[${permission.name}][${action.key}]`}
                              defaultChecked={
                                data.permissions &&
                                data.permissions[permission.name] &&
                                data.permissions[permission.name][action.key]
                                  ? true
                                  : false
                              }
                              onChange={(event) => {
                                setData('permissions', {
                                  ...data.permissions,
                                  [permission.name]: {
                                    ...((data.permissions && data.permissions[permission.name]) || {}),
                                    [action.key]: event.target.checked,
                                  },
                                })
                              }}
                            />
                            <span className="text-sm text-gray-700">{action.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <PrimaryButton disabled={processing} type="submit">
            {processing ? <span>{title.titling}</span> : <span>{title.title}</span>}
          </PrimaryButton>

          <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
            <p className="text-sm text-gray-600">{title.title_end}!</p>
          </Transition>
        </div>
      </form>
    </div>
  )
}

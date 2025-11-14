import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
// Checkbox removed — replaced by Dropdown-driven control
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { Transition } from '@headlessui/react'
import React from 'react'
import notification from '@/utils/notification'
import {
  PlusIcon,
  TrashIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import Dropdown from '@/Components/Dropdown'
import Popover from '@/Components/Popover'
import AddImage from '@/Components/AddImage'

export default function Form({ form }: { form: any }) {
  const fields = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
      autoComplete: 'name'
    },
    {
      name: 'purchase_description',
      label: 'Descripción de compra',
      type: 'text',
      required: true,
      autoComplete: 'purchase_description'
    },
    {
      name: 'sales_description',
      label: 'Descripción de ventas',
      type: 'text',
      required: true,
      autoComplete: 'sales_description'
    },
    {
      name: 'sku',
      label: 'Sku',
      type: 'text',
      required: true,
      autoComplete: 'sku'
    },

    {
      name: 'cost',
      label: 'Costo',
      type: 'number',
      required: true,
      autoComplete: 'cost'
    },
    {
      name: 'sale_price',
      label: 'Precio de venta',
      type: 'number',
      required: true,
      autoComplete: 'sale_price'
    },
    {
      name: 'price_unit',
      label: 'Precio unitario',
      type: 'number',
      required: true,
      autoComplete: 'price_unit'
    },
    {
      name: 'tax_rate',
      label: 'Tasa de impuesto',
      type: 'number',
      required: true,
      autoComplete: 'tax_rate'
    },
    {
      name: 'location',
      label: 'Ubicación',
      type: 'text',
      required: true,
      autoComplete: 'location'
    },
    {
      name: 'account_item',
      label: '¿A que cuenta se dirige?',
      type: 'text',
      required: true,
      autoComplete: 'account_item'
    },
    {
      name: 'stock_min',
      label: 'Stock mínimo',
      type: 'number',
      required: true,
      autoComplete: 'stock_min'
    },
    {
      name: 'stock_max',
      label: 'Stock máximo',
      type: 'number',
      required: true,
      autoComplete: 'stock_max'
    },
    {
      name: 'reorder_level',
      label: 'Nivel de reorden',
      type: 'number',
      required: true,
      autoComplete: 'reorder_level'
    }
  ]
  const { data, setData, patch, post, errors, processing, recentlySuccessful } =
    form

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
      setData('_method', 'PUT')

      post(route('inventory.products.update', data.id), {
        onSuccess: () =>
          notification.success('Producto actualizado correctamente'),
        onError: () => notification.error('Error al actualizar el producto')
      })
    } else {
      post(route('inventory.products.store'), {
        onSuccess: () => notification.success('Producto creado correctamente'),
        onError: () => notification.error('Error al crear el producto')
      })
    }
  }

  // Image handling moved to AddImage component.

  return (
    <div>
      <div className="flex justify-between">
        <h2>Información del producto</h2>
        <div className="flex items-center gap-3">
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
                  Si el producto está activo, estará disponible para ventas y
                  aparecerá en los listados de productos.
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
      </div>
      <form
        className="mt-6 space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Images */}
        <InputLabel
          htmlFor="images"
          value="Imágenes"
        />
        <AddImage
          images={data.images}
          onChange={(updated: any[]) => setData('images', updated)}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fields.map((field: any) => (
            <div key={field.name}>
              <InputLabel
                htmlFor={field.name}
                value={field.label}
              />
              <TextInput
                id={field.name}
                name={field.name}
                type={field.type}
                defaultValue={data[field.name] ? data[field.name] : ''}
                required={field.required}
                isFocused={field.isFocused ?? false}
                autoComplete={field.autoComplete}
                onChange={(event) => {
                  setData(field.name, (event.target as HTMLInputElement).value)
                }}
              />
              <InputError
                className="mt-2"
                message={errors[field.name]}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
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

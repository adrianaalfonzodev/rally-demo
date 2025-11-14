import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
// Checkbox removed — replaced by Dropdown-driven control
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { Transition } from '@headlessui/react'
import React, { useEffect } from 'react'
import notification from '@/utils/notification'
import { Link } from '@inertiajs/react'

export default function Form({ form, agents }: { form: any, agents: { [key: string]: any } }) {
  
  const { data, setData, patch, post, errors, processing, recentlySuccessful } = form

  // Obtiene el cliente/proveedor seleccionado por su ID
  const selectedAgent = Array.isArray(agents)
    ? agents.find((a: any) => String(a.id) === String(data.agent_id))
    : undefined

  // Agrega la descripción del ítem en la posición idx
  const handleItemDescriptionChange = (idx: number, value: string) => {
    const items = Array.isArray(data.items) ? [...data.items] : []
    items[idx] = { ...(items[idx] || {}), description: value }
    setData('items', items)
  }

  // Agrega la cantidad del ítem en la posición idx
  const handleItemQtyChange = (idx: number, raw: any) => {
    const items = Array.isArray(data.items) ? [...data.items] : []
    const newQty = raw === '' ? '' : Number(raw)
    const price = Number(items[idx]?.price || 0)
    const line = (isNaN(Number(newQty)) ? 0 : Number(newQty)) * (isNaN(price) ? 0 : price)
    items[idx] = { ...(items[idx] || {}), qty: raw, subtotal: Number(line.toFixed(2)) }
    setData('items', items)
  }

  // Agrega el precio del ítem en la posición idx
  const handleItemPriceChange = (idx: number, raw: any) => {
    const items = Array.isArray(data.items) ? [...data.items] : []
    const newPrice = raw === '' ? '' : Number(raw)
    const qty = Number(items[idx]?.qty || 0)
    const line = (isNaN(qty) ? 0 : qty) * (isNaN(Number(newPrice)) ? 0 : Number(newPrice))
    items[idx] = { ...(items[idx] || {}), price: raw, subtotal: Number(line.toFixed(2)) }
    setData('items', items)
  }

  // Elimina el ítem en la posición idx
  const handleItemRemove = (idx: number) => {
    const items = Array.isArray(data.items) ? [...data.items] : []
    items.splice(idx, 1)
    setData('items', items)
  }

  // Agrega una nueva línea de ítem vacía
  const handleAddItem = () => {
    const items = Array.isArray(data.items) ? [...data.items] : []
    items.push({ description: '', qty: 1, price: 0, subtotal: 0 })
    setData('items', items)
  }

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
      patch(route('billing.invoices.update', data.id), {
        onSuccess: () =>
          notification.success('Factura actualizada correctamente'),
        onError: () => notification.error('Error al actualizar la factura')
      })
    } else {
      patch(route('billing.invoices.store'), {
        onSuccess: () => notification.success('Factura creada correctamente'),
        onError: () => notification.error('Error al crear la factura')
      })
    }
  }

  // Recalcula subtotal, total y abonado_bcv cuando cambian los items o la tasa_bcv
  useEffect(() => {
    const items = Array.isArray(data.items) ? data.items : []
    // Prefer using pre-computed line subtotals when available for efficiency
    const subtotal = items.reduce((acc: number, it: any) => {
      if (it && typeof it.subtotal !== 'undefined') {
        return acc + Number(it.subtotal || 0)
      }
      const q = Number(it.qty || 0)
      const p = Number(it.price || 0)
      return acc + (isNaN(q) ? 0 : q) * (isNaN(p) ? 0 : p)
    }, 0)

    const roundedSubtotal = Number(subtotal.toFixed(2))
    // Abonado en BCV = tasa_bcv * subtotal (tasa es un número, por ejemplo 223.96)
    const tasa = Number(data.rate_bcv || 0)
    const abonado = Number((roundedSubtotal * (isNaN(tasa) ? 0 : tasa)).toFixed(2))

  // Only update form fields if they changed to avoid loops
    const currentSubtotal = Number(data.subtotal || 0)
    const currentTotal = Number(data.total || 0)
    const currentAbonado = Number(data.advanced_bcv || 0)

    const updates: Record<string, any> = {}
    if (currentSubtotal !== roundedSubtotal) updates.subtotal = roundedSubtotal
    if (currentTotal !== roundedSubtotal) updates.total = roundedSubtotal
    if (currentAbonado !== abonado) updates.advanced_bcv = abonado

    if (Object.keys(updates).length > 0) {
      // setData multiple fields in batch
      Object.keys(updates).forEach((key) => setData(key, (updates as any)[key]))
    }

    // initialize items array if undefined
    if (!Array.isArray(data.items)) {
      setData('items', [])
    }
  }, [JSON.stringify(data.items), data.rate_bcv])

  return (
    <div>
      <div className="flex justify-between">
        <h2>Información de la factura</h2>
        {/* <div className="flex items-center gap-3">
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
        </div> */}
      </div>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left: Cliente / Datos */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <InputLabel value="RIF / Cédula" />
                {/* Arreglo de agentes (clientes/proveedores) */}
                {Array.isArray(agents) && agents.length > 0 ? (
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                    value={data.agent_id ?? ''}
                    onChange={(e: any) => {
                      const id = e.target.value
                      // store only the agent id; the displayed fields read from `agents`
                      setData('agent_id', id)
                    }}
                  >
                    <option value="">Seleccionar cliente/proveedor</option>
                    {agents.map((c: any) => (
                      <option key={c.id} value={c.id}>
                        {c.id_number} - {c.fullname}
                      </option>
                    ))}
                  </select>
                ): (
                  <div>
                    <span>
                      Agregar Cliente <Link href={route('administration.customers.index')}>aquí</Link>
                    </span>
                    <span>
                      Agregar Proveedor <Link href={route('administration.providers.index')}>aquí</Link>
                    </span>
                  </div>
                )}
              </div>

              <div>
                <InputLabel value="Teléfono" />
                <TextInput
                  value={selectedAgent?.phone ?? data.customer?.phone ?? ''}
                  readOnly
                  disabled
                />
                <InputError message={errors?.['customer.phone']} />
              </div>
            </div>

            <div>
              <InputLabel value="Razón social / Nombre y Apellido" />
              <TextInput value={selectedAgent?.fullname ?? ''} readOnly disabled />
              <InputError message={errors?.['customer.name']} />
            </div>

            <div>
              <InputLabel value="Dirección o Domicilio fiscal" />
              <TextInput value={selectedAgent?.address ?? ''} readOnly disabled />
              <InputError message={errors?.['customer.address']} />
            </div>
          </div>

          {/* Right: Metadatos de la factura */}
          <div className="space-y-4">
            <div>
              <InputLabel value="Orden / Nro" />
              <TextInput
                value={data.number || ''}
                onChange={(e: any) => setData('number', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <InputLabel value="Fecha" />
                <TextInput
                  type="date"
                  value={data.date || ''}
                  onChange={(e: any) => setData('date', e.target.value)}
                />
              </div>
              <div>
                <InputLabel value="Hora" />
                <TextInput
                  type="time"
                  value={data.time || ''}
                  onChange={(e: any) => setData('time', e.target.value)}
                />
              </div>
            </div>

            <div>
              <InputLabel value="Observaciones" />
              <TextInput
                value={data.notes || ''}
                onChange={(e: any) => setData('notes', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Items table */}
        <div className="overflow-x-auto bg-white rounded shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Descripción del servicio o producto</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Cant.</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Precio unitario</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Sub total</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500"> </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {(data.items || []).map((item: any, idx: number) => {
                const qty = Number(item.qty || 0)
                const price = Number(item.price || 0)
                const line = (isNaN(qty) ? 0 : qty) * (isNaN(price) ? 0 : price)
                return (
                  <tr key={idx} className="align-top">
                    <td className="px-4 py-2">
                      <TextInput
                        value={item.description || ''}
                        onChange={(e: any) => handleItemDescriptionChange(idx, e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-2 w-28">
                      <input
                        type="number"
                        value={item.qty ?? ''}
                        min={0}
                        step={1}
                        onChange={(e: any) => handleItemQtyChange(idx, e.target.value)}
                        className="mx-auto block w-20 text-center text-lg font-medium rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:border-[#F2731A] focus:ring-[#F2731A]"
                      />
                    </td>
                    <td className="px-4 py-2 w-36">
                      <TextInput
                        value={item.price ?? ''}
                        type="number"
                        step="0.01"
                        onChange={(e: any) => handleItemPriceChange(idx, e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-2 text-right w-32">{(item.subtotal ?? line).toFixed(2)}</td>
                    <td className="px-4 py-2 text-center w-16">
                      <button
                        type="button"
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => handleItemRemove(idx)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} className="px-4 py-2">
                  <div className="flex items-center justify-between">
                    <button type="button" className="text-sm text-blue-600 hover:underline" onClick={handleAddItem}>
                      + Agregar línea
                    </button>
                    <div className="text-sm text-gray-500">Puedes agregar y eliminar líneas según necesidad</div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Totales y acciones */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="w-full md:w-2/3">
            {/* espacio para notas o condiciones adicionales + checkboxes */}
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm text-gray-600 mb-3">Términos</p>

              <div className="flex flex-col sm:gap-6">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={Boolean(data.is_delivery_note)}
                    onChange={(e: any) => setData('is_delivery_note', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Nota de entrega</span>
                </label>

                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={Boolean(data.is_invoice_tax)}
                    onChange={(e: any) => setData('is_invoice_tax', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Factura fiscal</span>
                </label>

                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={Boolean(data.is_tax_taxpayer)}
                    onChange={(e: any) => setData('is_tax_taxpayer', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Contribuyente especial</span>
                </label>
              </div>

              {/* Optional free-form terms/notes shown below */}
              {data.terms && (
                <p className="mt-3 text-sm text-gray-600">{data.terms}</p>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>{Number(data.subtotal || 0).toFixed(2)}</span>
              </div>

              <div className="mb-2">
                <InputLabel value="Tasa BCV" />
                <TextInput
                  value={data.rate_bcv ?? ''}
                  onChange={(e: any) => setData('rate_bcv', e.target.value)}
                />
              </div>

              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Abonado en BCV</span>
                <span>{Number(data.advanced_bcv || 0).toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-semibold text-gray-800 text-lg">
                <span>Monto Total</span>
                <span>{Number(data.total || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing} type="submit">
            {processing ? <span>{title.titling}</span> : <span>{title.title}</span>}
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

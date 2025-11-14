import Authenticated from '@/Layouts/AuthenticatedLayout'
import { useForm } from '@inertiajs/react'
import Form from './partials/Form'

export default function Page({ invoice, agents }: { invoice: { [key: string]: any }, agents: { [key: string]: any } }) {

  const form = useForm({
    id: invoice ? invoice.id : null,
    number: invoice ? invoice.number : '',
    agent_id: invoice ? invoice.agent_id : '',
    date: invoice ? invoice.date : '',
    time: invoice ? invoice.time : '',
    items: invoice ? invoice.items : [],
    total: invoice ? invoice.total : 0,
    subtotal: 0,
    rate_bcv: invoice ? invoice.rate_bcv : 0,
    advanced_bcv: invoice ? invoice.advanced_bcv : 0,
    notes: invoice ? invoice.notes : '',
    is_delivery_note: invoice ? invoice.is_delivery_note : false,
    is_invoice_tax: invoice ? invoice.is_invoice_tax : false,
    is_tax_taxpayer: invoice ? invoice.is_tax_taxpayer : false
  })


  return (
    <Authenticated title={invoice ? 'Editar Factura' : 'Crear Factura'}>
      <div className="py-4">
        <div>
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <Form form={form} agents={agents.data} />
          </div>
        </div>
      </div>
    </Authenticated>
  )
}

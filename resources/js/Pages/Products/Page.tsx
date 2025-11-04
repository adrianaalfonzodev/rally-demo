import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import Form from './partials/Form';


export default function Page({ product }: { product: { [key: string]: any } }) {

  const form = useForm({
    id: product ? product.id : null,
    sku: product ? product.sku : '',
    location : product ? product.location : '',
    name : product ? product.name : '',
    purchase_description : product ? product.purchase_description : '',
    sales_description : product ? product.sales_description : '',
    cost : product ? product.cost : 0,
    sale_price : product ? product.sale_price : 0,
    price_unit : product ? product.price_unit : 0,
    tax_rate : product ? product.tax_rate : 0,
    account_item : product ? product.account_item : '',
    stock_min : product ? product.stock_min : 0,
    stock_max : product ? product.stock_max : 0,
    reorder_level : product ? product.reorder_level : 0,
    is_active : product ? product.is_active : true,
    images : product ? product.images : [],
  })
  
  

  return (
    <Authenticated
      title={product ? 'Editar Producto' : 'Crear Producto'}
    >
          <div className='py-8'>
              <div>
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                  <Form form={form} />
                </div>
        </div>
          </div>
      </Authenticated>
  );
}

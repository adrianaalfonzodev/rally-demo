import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import React from "react";
import notification from "@/utils/notification";

export default function Form({ form }: { form: any }) {

    const { data, setData, patch, post, errors, processing, recentlySuccessful } = form;

    const title = data.id !== null ? {
        title: 'Actualizar',
        titling: 'Actualizando...',
        title_end: 'Actualizado'
    } : {
        title: 'Crear',
        titling: 'Creando...',
        title_end: 'Creado'
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (data.id !== null) {
            setData('_method', 'PUT');

            post(route('inventory.products.update', data.id), {
                onSuccess: () => notification.success('Producto actualizado correctamente'),
                onError: () => notification.error('Error al actualizar el producto'),
            });
        } else {
            post(route('inventory.products.store'), {
                onSuccess: () => notification.success('Producto creado correctamente'),
                onError: () => notification.error('Error al crear el producto'),
            });
        }
    };

    const addImage = () => {
        data.images.push('');
        setData('images', [...data.images]);

    };

    return (
        <div>
            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                <div>
                    <InputLabel htmlFor="sku" value="Sku" />
                    <TextInput
                        id="sku"
                        name="sku"
                        defaultValue={data.sku ? data.sku : ''}
                        required
                        isFocused
                        autoComplete="sku"
                        onChange={(event) => {setData('sku', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.sku} />
                </div>
                <div>
                    <InputLabel htmlFor="location" value="Ubicación" />
                    <TextInput
                        id="location"
                        name="location"
                        defaultValue={data.location ? data.location : ''}
                        required
                        isFocused
                        autoComplete="location"
                        onChange={(event) => {setData('location', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.location} />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        name="name"
                        defaultValue={data.name ? data.name : ''}
                        required
                        isFocused
                        autoComplete="name"
                        onChange={(event) => {setData('name', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div>
                    <InputLabel htmlFor="purchase_description" value="Descripción de compra" />
                    <TextInput
                        id="purchase_description"
                        name="purchase_description"
                        defaultValue={data.purchase_description ? data.purchase_description : ''}
                        required
                        isFocused
                        autoComplete="purchase_description"
                        onChange={(event) => {setData('purchase_description', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.purchase_description} />
                </div>
                <div>
                    <InputLabel htmlFor="sales_description" value="Descripción de ventas" />
                    <TextInput
                        id="sales_description"
                        name="sales_description"
                        defaultValue={data.sales_description ? data.sales_description : ''}
                        required
                        isFocused
                        autoComplete="sales_description"
                        onChange={(event) => {setData('sales_description', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.sales_description} />
                </div>
                <div>
                    <InputLabel htmlFor="cost" value="Costo" />
                    <TextInput
                        id="cost"
                        name="cost"
                        type="number"
                        defaultValue={data.cost ? data.cost : ''}
                        required
                        isFocused
                        autoComplete="cost"
                        onChange={(event) => {setData('cost', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.cost} />
                </div>
                <div>
                    <InputLabel htmlFor="sale_price" value="Precio de venta" />
                    <TextInput
                        id="sale_price"
                        name="sale_price"
                        type="number"
                        defaultValue={data.sale_price ? data.sale_price : ''}
                        required
                        isFocused
                        autoComplete="sale_price"
                        onChange={(event) => {setData('sale_price', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.sale_price} />
                </div>
                <div>
                    <InputLabel htmlFor="price_unit" value="Precio unitario" />
                    <TextInput
                        id="price_unit"
                        name="price_unit"
                        type="number"
                        defaultValue={data.price_unit ? data.price_unit : ''}
                        required
                        isFocused
                        autoComplete="price_unit"
                        onChange={(event) => {setData('price_unit', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.price_unit} />
                </div>
                <div>
                    <InputLabel htmlFor="tax_rate" value="Tasa de impuesto" />
                    <TextInput
                        id="tax_rate"
                        name="tax_rate"
                        type="number"
                        defaultValue={data.tax_rate ? data.tax_rate : ''}
                        required
                        isFocused
                        autoComplete="tax_rate"
                        onChange={(event) => {setData('tax_rate', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.tax_rate} />
                </div>
                <div>
                    <InputLabel htmlFor="account_item" value="¿A que cuenta se dirige?" />
                    <TextInput
                        id="account_item"
                        name="account_item"
                        defaultValue={data.account_item ? data.account_item : ''}
                        required
                        isFocused
                        autoComplete="account_item"
                        onChange={(event) => {setData('account_item', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.account_item} />
                </div>
                <div>
                    <InputLabel htmlFor="stock_min" value="Stock mínimo" />
                    <TextInput
                        id="stock_min"
                        name="stock_min"
                        type="number"
                        defaultValue={data.stock_min ? data.stock_min : ''}
                        required
                        isFocused
                        autoComplete="stock_min"
                        onChange={(event) => {setData('stock_min', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.stock_min} />
                </div>
                <div>
                    <InputLabel htmlFor="stock_max" value="Stock máximo" />
                    <TextInput
                        id="stock_max"
                        name="stock_max"
                        type="number"
                        defaultValue={data.stock_max ? data.stock_max : ''}
                        required
                        isFocused
                        autoComplete="stock_max"
                        onChange={(event) => {setData('stock_max', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.stock_max} />
                </div>
                <div>
                    <InputLabel htmlFor="reorder_level" value="Nivel de reorden" />
                    <TextInput
                        id="reorder_level"
                        name="reorder_level"
                        type="number"
                        defaultValue={data.reorder_level ? data.reorder_level : ''}
                        required
                        isFocused
                        autoComplete="reorder_level"
                        onChange={(event) => {setData('reorder_level', event.target.value);}}
                    />
                    <InputError className="mt-2" message={errors.reorder_level} />
                </div>

                <div>
                    <InputLabel htmlFor="is_active" value="¿Está activo?" />
                    <Checkbox
                        id="is_active"
                        name="is_active"
                        defaultChecked={data.is_active}
                        onChange={(event) => {setData('is_active', event.target.checked);}}
                    />
                </div>

                {/* Images */}
                <div>
                    <button type="button" onClick={addImage} className="mb-4 text-sm text-blue-600 hover:underline">Agregar Imagen</button>
                    {data.images.map((image: string, index: number) => (
                        <div key={index} className="mb-4">
                            <InputLabel htmlFor={`image_${index}`} value={`Imagen ${index + 1}`} />
                            <TextInput
                                id={`image_${index}`}
                                name={`images[${index}]`}
                                type="file"
                                defaultValue={image}
                                required
                                isFocused
                                autoComplete={`image_${index}`}
                                onChange={(event) => {
                                    const files = event.target.files;
                                    if (files && files[0]) {
                                        const updatedImages = [...data.images];
                                        updatedImages[index] = files[0];
                                        setData('images', updatedImages);
                                    }
                                }}
                            />
                            <InputError className="mt-2" message={errors[`images.${index}`]} />
                        </div>
                    ))} 
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
                        <p className="text-sm text-gray-600">
                            {title.title_end}!
                        </p>
                    </Transition>
                </div>
            </form>
        </div>
    );
}
export interface Product {
    id: number;
    sku: string;
    location: string;
    name: string;
    purchase_description: string;
    sales_description: string;
    cost: number;
    sale_price: number;
    price_unit: number;
    tax_rate: number;
    account_item: string;
    stock_min: number;
    stock_max: number;
    reorder_level: number;
    is_active: boolean;
    images: string[];
}

export type ProductsPageProps = {
    products: Product[];
};
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProdutsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->transform(function($product) {
                return [
                    'id' => $product->id,
                    'sku' => $product->sku,
                    'name' => $product->name,
                    'description' => $product->purchase_description,
                    'location' => $product->location,
                    'cost' => $product->cost,
                    'sale_price' => $product->sale_price,
                    'price_unit' => $product->price_unit,
                    'is_active' => $product->is_active ? 'Activo' : 'Inactivo',
                    'stock_min' => $product->stock_min,
                    'stock_max' => $product->stock_max, 
                    'created_by' => $product->creator ? $product->creator->name : 'N/A',
                ];
            })
        ];
    }
}

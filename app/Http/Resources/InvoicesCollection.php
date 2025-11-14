<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class InvoicesCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->transform(function ($invoice) {
                return [
                    'id' => $invoice->id,
                    'id_number' => $invoice->agent->id_number,
                    'customer_name' => $invoice->agent->name,
                    'number' => $invoice->number,
                    'datetime' => $invoice->date . ' ' . $invoice->time,
                    'items_count' => count($invoice->items),
                    'total' => $invoice->total,
                    'rate_bcv' => $invoice->rate_bcv,
                    'advanced_bcv' => $invoice->advanced_bcv,
                    'status' => $invoice->status,
                    'created_by' => $invoice->user->name,
                    'created_at' => $invoice->created_at->toDateTimeString(),
                ];
            }),
        ];
    }
}

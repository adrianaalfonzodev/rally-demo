<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AgentsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->transform(function ($agent) {
                return [
                    'id' => $agent->id,
                    'name' => $agent->name,
                    'lastname' => $agent->lastname,
                    'fullname' => $agent->full_name,
                    'id_number' => $agent->id_number,
                    'email' => $agent->email,
                    'phone' => $agent->phone,
                    'address' => $agent->address,
                    'is_active' => $agent->is_active,
                    'created_at' => $agent->created_at->toDateTimeString(),
                    'updated_at' => $agent->updated_at->toDateTimeString(),
                ];
            }),
        ];
    }
}

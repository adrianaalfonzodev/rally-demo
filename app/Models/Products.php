<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Products extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'sku',
        'location',
        'name',
        'purchase_description',
        'sales_description',
        'cost',
        'sale_price',
        'price_unit',
        'tax_rate',
        'account_item',
        'stock_min',
        'stock_max',
        'reorder_level',
        'is_active',
        'extra_data',
        'images',
        'created_by',
    ];

    protected $casts = [
        'extra_data' => 'array',
        'images' => 'array',
        'is_active' => 'boolean',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

}

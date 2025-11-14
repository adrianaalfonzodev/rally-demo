<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'agent_id',
        'number',
        'date',
        'time',
        'items',
        'total',
        'notes',
        'advanced',
        'remaining',
        'rate_bcv',
        'advanced_bcv',
        'is_delivery_note',
        'is_invoice_tax',
        'tax_taxpayer',
        'status',
    ];

    protected $casts = [
        'items' => 'array',
        'is_delivery_note' => 'boolean',
        'is_invoice_tax' => 'boolean',
        'tax_taxpayer' => 'boolean',
    ];

    protected $dates = ['deleted_at'];

    public function agent(): BelongsTo
    {
        return $this->belongsTo(Agents::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

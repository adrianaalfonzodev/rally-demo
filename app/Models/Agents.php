<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agents extends Model
{
    use SoftDeletes;

    protected $table = 'agents';

    protected $fillable = [
        'name',
        'user_id',
        'lastname',
        'id_number',
        'email',
        'phone',
        'is_active',
        'address',
        'is_provider',
    ];

    public function getFullNameAttribute()
    {
        return "{$this->name} {$this->lastname}";
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class, 'agent_id');
    }
}

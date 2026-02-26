<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Admin\Donor;

class Donation extends Model
{
    // If your table name is 'donations', Laravel finds it automatically.
    // We define the fillable fields based on your schema.
    protected $fillable = [
        'donor_id',
        'amount',
        'payment_month',
        'payment_year',
        'paid_at',
        'payment_method',
        'receipt_no',
    ];

    /**
     * Relationship back to the Donor
     */
    public function donor(): BelongsTo
    {
        return $this->belongsTo(Donor::class, 'donor_id', 'id');
    }
}
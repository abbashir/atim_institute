<?php

namespace App\Models\Admin;
use App\Models\Admin\Donation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Donor extends Model
{
    protected $guarded = ['id'];

    public function donations(): HasMany
    {
        // Since both are in App\Models\Admin, this should work.
        return $this->hasMany(Donation::class, 'donor_id', 'id');
    }
}
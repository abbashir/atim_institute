<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use App\Models\Admin\ExpenseCategory;

class Expense extends Model
{
    protected $guarded = ['id'];

    // Link to the category
    public function category()
    {
        return $this->belongsTo(ExpenseCategory::class, 'category_id');
    }

    // Link to the user who created it
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
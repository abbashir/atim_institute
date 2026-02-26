<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->unsignedBigInteger('donor_id');
            $table->decimal('amount', 12, 2);
            $table->string('payment_month'); // e.g., "March 2026"
            $table->string('payment_year');
            $table->date('paid_at');
            $table->string('payment_method')->default('Cash');
            $table->string('receipt_no')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};

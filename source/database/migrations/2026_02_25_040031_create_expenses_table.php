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
      Schema::create('expenses', function (Blueprint $table) {
        $table->id();

        $table->date('expense_date');

        $table->unsignedBigInteger('category_id');

        $table->decimal('amount', 12, 2);

        $table->enum('payment_method', [
          'Cash',
          'Bank',
          'Mobile Banking'
        ])->default('Cash');

        $table->string('paid_to')->nullable();
        $table->string('reference_no')->nullable();

        $table->text('description')->nullable();
        $table->string('attachment')->nullable();

        $table->unsignedBigInteger('created_by');

        $table->enum('status', [
          'Pending',
          'Approved',
          'Rejected'
        ])->default('Approved');

        $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};

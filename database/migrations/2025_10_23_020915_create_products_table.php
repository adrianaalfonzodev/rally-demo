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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('location')->nullable();
            $table->string('name');
            $table->text('purchase_description')->nullable();
            $table->text('sales_description')->nullable();
            $table->decimal('cost', 10, 2);
            $table->decimal('sale_price', 10, 2);
            $table->decimal('price_unit', 10, 2)->nullable();
            $table->string('tax_rate')->nullable();
            $table->string('account_item')->nullable();
            $table->integer('stock_min')->default(0);
            $table->integer('stock_max')->default(0);
            $table->integer('reorder_level')->default(0);
            $table->boolean('is_active')->default(true);
            $table->json('extra_data')->nullable();
            $table->json('images')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('agent_id')->constrained('agents')->onDelete('cascade');
            $table->string('number')->unique();
            $table->date('date');
            $table->time('time');
            $table->json('items');
            $table->decimal('total', 10, 2);
            $table->decimal('advanced', 10, 2)->default(0);
            $table->decimal('remaining', 10, 2)->default(0);
            $table->decimal('rate_bcv', 10, 2)->default(0);
            $table->decimal('advanced_bcv', 15, 2)->default(0);
            $table->text('notes')->nullable();
            $table->boolean('is_delivery_note')->default(false)->comment('Indica si es una nota de entrega');
            $table->boolean('is_invoice_tax')->default(false)->comment('Indica si la factura es fiscal');
            $table->boolean('is_tax_taxpayer')->default(false)->comment('Indica si es un contribuyente especial');
            $table->string('status')->default('pending');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};

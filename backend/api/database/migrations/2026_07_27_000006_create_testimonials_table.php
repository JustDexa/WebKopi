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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role')->default('');
            $table->text('quote');
            $table->unsignedTinyInteger('rating')->default(5);
            $table->integer('urutan_tampil')->default(0);
            $table->timestamps();
        });

        // Catatan: rating 1-5 divalidasi di level aplikasi (Form Request),
        // bukan di DB constraint, biar portable di SQLite/MySQL/Postgres.
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};

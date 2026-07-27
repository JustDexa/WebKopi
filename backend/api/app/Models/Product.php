<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category',
        'image_url',
        'process_steps',
    ];

    protected $casts = [
        'process_steps' => 'array',
    ];

    public function productVariants()
    {
        return $this->hasMany(ProductVariant::class);
    }
}

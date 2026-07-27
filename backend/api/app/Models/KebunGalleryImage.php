<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KebunGalleryImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_url',
        'caption',
        'urutan_tampil',
    ];

    protected $casts = [
        'urutan_tampil' => 'integer',
    ];
}

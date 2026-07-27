<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KebunInfo extends Model
{
    use HasFactory;

    // Nama tabel di-set manual karena Laravel bakal nebak "kebun_infos" (plural otomatis),
    // padahal tabel aslinya "kebun_info" (nyamain sama schema Supabase lama)
    protected $table = 'kebun_info';

    protected $fillable = [
        'nama_lokasi',
        'title',
        'description_1',
        'description_2',
        'luas_lahan',
        'jenis_kopi_count',
        'masa_budidaya',
        'description_bawah',
        'image_url',
        'urutan_tampil',
    ];

    protected $casts = [
        'jenis_kopi_count' => 'integer',
        'urutan_tampil' => 'integer',
    ];
}

<?php

namespace Database\Seeders;

use App\Models\GalleryImage;
use App\Models\KebunGalleryImage;
use App\Models\KebunInfo;
use App\Models\Product;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Admin user buat login ke /admin (gantiin Supabase Auth)
        User::firstOrCreate(
            ['email' => 'admin@kopimangir.test'],
            [
                'name' => 'Admin Kopi Mangir',
                'password' => bcrypt('password123'),
            ]
        );

        // Produk + varian
        $produk1 = Product::create([
            'name' => 'Kopi Robusta Mangir',
            'description' => 'Kopi robusta asli dari kebun sendiri, disangrai medium.',
            'category' => 'Robusta',
            'image_url' => 'https://placehold.co/600x600?text=Robusta',
            'process_steps' => [
                ['title' => 'Panen', 'description' => 'Dipetik manual biji merah pilihan'],
                ['title' => 'Sangrai', 'description' => 'Medium roast, konsisten tiap batch'],
            ],
        ]);
        $produk1->productVariants()->createMany([
            ['size' => '250g', 'price' => 45000, 'stock' => 20],
            ['size' => '500g', 'price' => 85000, 'stock' => 10],
        ]);

        $produk2 = Product::create([
            'name' => 'Kopi Arabika Mangir',
            'description' => 'Kopi arabika dataran tinggi, rasa asam citrus lembut.',
            'category' => 'Arabika',
            'image_url' => 'https://placehold.co/600x600?text=Arabika',
            'process_steps' => [
                ['title' => 'Panen', 'description' => 'Petik selektif buah matang'],
                ['title' => 'Fermentasi', 'description' => 'Proses full wash 24 jam'],
            ],
        ]);
        $produk2->productVariants()->createMany([
            ['size' => '200g', 'price' => 55000, 'stock' => 15],
        ]);

        // Info kebun
        KebunInfo::create([
            'nama_lokasi' => 'Kebun Mangir 1',
            'title' => 'Kebun Robusta 10 Hektar',
            'description_1' => 'Terletak di lereng bukit dengan ketinggian ideal.',
            'description_2' => 'Dikelola dengan metode organik tanpa pestisida kimia.',
            'luas_lahan' => '10 Hektar',
            'jenis_kopi_count' => 2,
            'masa_budidaya' => '15 Tahun',
            'description_bawah' => 'Menjadi sumber utama biji kopi robusta kami.',
            'image_url' => 'https://placehold.co/800x500?text=Kebun+Robusta',
            'urutan_tampil' => 1,
        ]);

        // Galeri umum
        GalleryImage::create([
            'image_url' => 'https://placehold.co/600x400?text=Galeri+1',
            'caption' => 'Proses penjemuran biji kopi',
            'urutan_tampil' => 1,
        ]);

        // Galeri kebun
        KebunGalleryImage::create([
            'image_url' => 'https://placehold.co/600x400?text=Kebun+Galeri+1',
            'caption' => 'Pemandangan kebun robusta',
            'urutan_tampil' => 1,
        ]);

        // Testimoni
        Testimonial::create([
            'name' => 'Budi Santoso',
            'role' => 'Pelanggan Cafe',
            'quote' => 'Kopinya enak banget, aroma khas dan nggak terlalu asam.',
            'rating' => 5,
            'urutan_tampil' => 1,
        ]);
    }
}

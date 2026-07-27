<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with('productVariants')->latest()->get();
    }

    public function show(Product $product)
    {
        return $product->load('productVariants');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
            'image_url' => ['nullable', 'string'],
            'process_steps' => ['nullable', 'array'],
            'variants' => ['nullable', 'array'],
            'variants.*.size' => ['required_with:variants', 'string'],
            'variants.*.price' => ['required_with:variants', 'integer', 'min:0'],
            'variants.*.stock' => ['nullable', 'integer', 'min:0'],
        ]);

        $product = Product::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'category' => $data['category'] ?? null,
            'image_url' => $data['image_url'] ?? null,
            'process_steps' => $data['process_steps'] ?? [],
        ]);

        if (! empty($data['variants'])) {
            $product->productVariants()->createMany($data['variants']);
        }

        return response()->json($product->load('productVariants'), 201);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
            'image_url' => ['nullable', 'string'],
            'process_steps' => ['nullable', 'array'],
            'variants' => ['nullable', 'array'],
            'variants.*.id' => ['nullable', 'integer', 'exists:product_variants,id'],
            'variants.*.size' => ['required_with:variants', 'string'],
            'variants.*.price' => ['required_with:variants', 'integer', 'min:0'],
            'variants.*.stock' => ['nullable', 'integer', 'min:0'],
        ]);

        $product->update(collect($data)->except('variants')->toArray());

        if (array_key_exists('variants', $data)) {
            // Sync sederhana: hapus semua variant lama, insert ulang yang baru.
            // Cukup buat kasus form admin yang selalu ngirim full list variant tiap submit.
            $product->productVariants()->delete();
            $product->productVariants()->createMany($data['variants']);
        }

        return $product->load('productVariants');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Produk dihapus']);
    }
}

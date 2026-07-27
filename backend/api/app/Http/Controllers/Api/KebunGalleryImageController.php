<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KebunGalleryImage;
use Illuminate\Http\Request;

class KebunGalleryImageController extends Controller
{
    public function index()
    {
        return KebunGalleryImage::orderBy('urutan_tampil')->get();
    }

    public function show(KebunGalleryImage $kebunGalleryImage)
    {
        return $kebunGalleryImage;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image_url' => ['required', 'string'],
            'caption' => ['nullable', 'string', 'max:255'],
            'urutan_tampil' => ['nullable', 'integer'],
        ]);

        return response()->json(KebunGalleryImage::create($data), 201);
    }

    public function update(Request $request, KebunGalleryImage $kebunGalleryImage)
    {
        $data = $request->validate([
            'image_url' => ['sometimes', 'required', 'string'],
            'caption' => ['nullable', 'string', 'max:255'],
            'urutan_tampil' => ['nullable', 'integer'],
        ]);

        $kebunGalleryImage->update($data);

        return $kebunGalleryImage;
    }

    public function destroy(KebunGalleryImage $kebunGalleryImage)
    {
        $kebunGalleryImage->delete();

        return response()->json(['message' => 'Gambar dihapus']);
    }
}

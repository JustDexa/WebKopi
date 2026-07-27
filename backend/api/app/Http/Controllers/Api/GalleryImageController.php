<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\Request;

class GalleryImageController extends Controller
{
    public function index()
    {
        return GalleryImage::orderBy('urutan_tampil')->get();
    }

    public function show(GalleryImage $galleryImage)
    {
        return $galleryImage;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image_url' => ['required', 'string'],
            'caption' => ['nullable', 'string', 'max:255'],
            'urutan_tampil' => ['nullable', 'integer'],
        ]);

        return response()->json(GalleryImage::create($data), 201);
    }

    public function update(Request $request, GalleryImage $galleryImage)
    {
        $data = $request->validate([
            'image_url' => ['sometimes', 'required', 'string'],
            'caption' => ['nullable', 'string', 'max:255'],
            'urutan_tampil' => ['nullable', 'integer'],
        ]);

        $galleryImage->update($data);

        return $galleryImage;
    }

    public function destroy(GalleryImage $galleryImage)
    {
        $galleryImage->delete();

        return response()->json(['message' => 'Gambar dihapus']);
    }
}

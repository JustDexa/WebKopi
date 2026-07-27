<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    /**
     * Upload satu gambar, balikin URL publiknya.
     * Gantiin supabase.storage.from('images').upload() + getPublicUrl()
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'max:5120'], // max 5MB
        ]);

        // Nama file unik biar nggak collision antar upload
        $filename = Str::uuid().'.'.$request->file('image')->extension();

        // Simpan ke storage/app/public/images, bisa diakses lewat /storage/images/...
        $path = $request->file('image')->storeAs('images', $filename, 'public');

        return response()->json([
            'path' => $path,
            'url' => asset('storage/'.$path),
        ], 201);
    }
}

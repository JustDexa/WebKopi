<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KebunInfo;
use Illuminate\Http\Request;

class KebunInfoController extends Controller
{
    public function index()
    {
        return KebunInfo::orderBy('urutan_tampil')->get();
    }

    public function show(KebunInfo $kebunInfo)
    {
        return $kebunInfo;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_lokasi' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'description_1' => ['nullable', 'string'],
            'description_2' => ['nullable', 'string'],
            'luas_lahan' => ['nullable', 'string', 'max:255'],
            'jenis_kopi_count' => ['nullable', 'integer'],
            'masa_budidaya' => ['nullable', 'string', 'max:255'],
            'description_bawah' => ['nullable', 'string'],
            'image_url' => ['nullable', 'string'],
            'urutan_tampil' => ['nullable', 'integer'],
        ]);

        return response()->json(KebunInfo::create($data), 201);
    }

    public function update(Request $request, KebunInfo $kebunInfo)
    {
        $data = $request->validate([
            'nama_lokasi' => ['sometimes', 'required', 'string', 'max:255'],
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description_1' => ['nullable', 'string'],
            'description_2' => ['nullable', 'string'],
            'luas_lahan' => ['nullable', 'string', 'max:255'],
            'jenis_kopi_count' => ['nullable', 'integer'],
            'masa_budidaya' => ['nullable', 'string', 'max:255'],
            'description_bawah' => ['nullable', 'string'],
            'image_url' => ['nullable', 'string'],
            'urutan_tampil' => ['nullable', 'integer'],
        ]);

        $kebunInfo->update($data);

        return $kebunInfo;
    }

    public function destroy(KebunInfo $kebunInfo)
    {
        $kebunInfo->delete();

        return response()->json(['message' => 'Info kebun dihapus']);
    }
}

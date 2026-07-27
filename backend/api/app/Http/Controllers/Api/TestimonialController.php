<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        return Testimonial::orderBy('urutan_tampil')->get();
    }

    public function show(Testimonial $testimonial)
    {
        return $testimonial;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'quote' => ['required', 'string'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'urutan_tampil' => ['nullable', 'integer'],
        ]);

        return response()->json(Testimonial::create($data), 201);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'quote' => ['sometimes', 'required', 'string'],
            'rating' => ['sometimes', 'required', 'integer', 'min:1', 'max:5'],
            'urutan_tampil' => ['nullable', 'integer'],
        ]);

        $testimonial->update($data);

        return $testimonial;
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return response()->json(['message' => 'Testimoni dihapus']);
    }
}

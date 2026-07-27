<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GalleryImageController;
use App\Http\Controllers\Api\KebunGalleryImageController;
use App\Http\Controllers\Api\KebunInfoController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

// Public read-only, gantiin query SELECT langsung ke Supabase dari halaman publik
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/kebun-info', [KebunInfoController::class, 'index']);
Route::get('/kebun-info/{kebunInfo}', [KebunInfoController::class, 'show']);
Route::get('/gallery-images', [GalleryImageController::class, 'index']);
Route::get('/kebun-gallery-images', [KebunGalleryImageController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);

// Protected, cuma admin yang login (Bearer token) yang bisa akses
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/upload', [UploadController::class, 'store']);

    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    Route::post('/kebun-info', [KebunInfoController::class, 'store']);
    Route::put('/kebun-info/{kebunInfo}', [KebunInfoController::class, 'update']);
    Route::delete('/kebun-info/{kebunInfo}', [KebunInfoController::class, 'destroy']);

    Route::post('/gallery-images', [GalleryImageController::class, 'store']);
    Route::put('/gallery-images/{galleryImage}', [GalleryImageController::class, 'update']);
    Route::delete('/gallery-images/{galleryImage}', [GalleryImageController::class, 'destroy']);

    Route::post('/kebun-gallery-images', [KebunGalleryImageController::class, 'store']);
    Route::put('/kebun-gallery-images/{kebunGalleryImage}', [KebunGalleryImageController::class, 'update']);
    Route::delete('/kebun-gallery-images/{kebunGalleryImage}', [KebunGalleryImageController::class, 'destroy']);

    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);
});

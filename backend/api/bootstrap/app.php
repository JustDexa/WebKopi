<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Backend ini API murni, jadi kalau ada middleware yang butuh
        // "redirect ke halaman login" pas guest, jangan coba bangun URL
        // ke route('login') yang emang nggak ada — biarin null, nanti
        // di-handle sebagai response JSON lewat withExceptions() di bawah.
        $middleware->redirectGuestsTo(fn () => null);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Backend ini API murni (tidak ada halaman login web). Bawaan Laravel,
        // AuthenticationException di-handle dengan redirect ke route('login')
        // kalau request dianggap nggak minta JSON (misal lupa kirim header
        // Accept) -> route itu nggak ada -> crash 500. Intercept di sini biar
        // SELALU balikin 401 JSON buat semua route /api/*, apapun headernya.
        $exceptions->render(function (AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json(['message' => $e->getMessage()], 401);
            }
        });

        $exceptions->shouldRenderJsonWhen(function ($request, $e) {
            return $request->is('api/*') || $request->expectsJson();
        });
    })->create();

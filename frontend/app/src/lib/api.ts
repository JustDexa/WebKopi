// Pengganti src/lib/supabase.ts.
// Satu tempat buat semua panggilan ke backend Laravel.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const TOKEN_KEY = 'kopi-tjap-mangir-token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  status: number
  errors?: Record<string, string[]>

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  }

  // Jangan set Content-Type kalau body-nya FormData (upload file),
  // biar browser yang otomatis set boundary multipart-nya.
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  // Response 204 (No Content) atau body kosong
  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    throw new ApiError(data?.message || 'Terjadi kesalahan', res.status, data?.errors)
  }

  return data as T
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),

  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    }),

  put: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(body ?? {}),
    }),

  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),

  // Upload file gambar, balikin { path, url }
  upload: (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    return request<{ path: string; url: string }>('/upload', {
      method: 'POST',
      body: formData,
    })
  },
}

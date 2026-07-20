-- ============================================================================
-- MIGRASI: Testimoni CRUD + Langkah Pengolahan per Produk
-- ============================================================================
-- Jalankan file ini SEKALI lewat Supabase Dashboard -> SQL Editor -> New query
-- -> paste semua isi file ini -> Run.
--
-- Kalau kebijakan RLS di project kalian berbeda dari asumsi di bawah
-- (semua tabel: publik boleh SELECT, hanya user authenticated/admin yang
-- boleh INSERT/UPDATE/DELETE), sesuaikan bagian POLICY di bawah supaya
-- konsisten dengan tabel-tabel lain (products, kebun_info, dll).
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. Kolom baru di tabel products: process_steps
--    Menyimpan langkah-langkah pengolahan yang tampil di panel Detail Produk
--    (sebelumnya di-hardcode di kode, sekarang diatur lewat Admin > Produk)
-- ----------------------------------------------------------------------------
alter table public.products
  add column if not exists process_steps jsonb not null default '[]'::jsonb;

comment on column public.products.process_steps is
  'Array langkah pengolahan produk, format: [{"title": "...", "description": "..."}, ...]. Ditampilkan di panel Detail Produk.';


-- ----------------------------------------------------------------------------
-- 2. Tabel baru: testimonials
--    Untuk section "Dipercaya Penikmat Kopi" di halaman Beranda
-- ----------------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  quote text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  urutan_tampil integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.testimonials is 'Testimoni pelanggan, ditampilkan di halaman Beranda.';

alter table public.testimonials enable row level security;

-- Siapa saja boleh membaca testimoni (tampil di website publik)
drop policy if exists "Public read testimonials" on public.testimonials;
create policy "Public read testimonials"
  on public.testimonials for select
  using (true);

-- Hanya user yang sudah login (admin) yang boleh tambah/ubah/hapus
drop policy if exists "Authenticated insert testimonials" on public.testimonials;
create policy "Authenticated insert testimonials"
  on public.testimonials for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update testimonials" on public.testimonials;
create policy "Authenticated update testimonials"
  on public.testimonials for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete testimonials" on public.testimonials;
create policy "Authenticated delete testimonials"
  on public.testimonials for delete
  to authenticated
  using (true);

-- ============================================================================
-- SELESAI. Setelah ini jalan, fitur berikut otomatis aktif tanpa perlu
-- deploy ulang apa pun selain kode React yang sudah disiapkan:
--   - Admin > Produk (Tambah/Edit): form "Langkah Pengolahan"
--   - Panel Detail Produk (customer): menampilkan langkah dari database
--   - Admin > Testimoni (menu baru di Dashboard): CRUD penuh
--   - Beranda: section testimoni otomatis ambil data dari tabel ini
-- ============================================================================

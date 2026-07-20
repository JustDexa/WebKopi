import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { supabase } from '../../lib/supabase'
import BackButton from '@/components/ui/BackButton'

export default function KebunForm() {
  const { id } = useParams()  // ada isinya kalau mode Edit, undefined kalau mode Tambah
  const isEditMode = Boolean(id)
  const navigate = useNavigate()

  const [namaLokasi, setNamaLokasi] = useState('')
  const [title, setTitle] = useState('')
  const [description1, setDescription1] = useState('')
  const [description2, setDescription2] = useState('')
  const [luasLahan, setLuasLahan] = useState('')
  const [jenisKopiCount, setJenisKopiCount] = useState('')
  const [masaBudidaya, setMasaBudidaya] = useState('')
  const [descriptionBawah, setDescriptionBawah] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [urutanTampil, setUrutanTampil] = useState('0')
  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditMode) return

    const fetchKebun = async () => {
      const { data, error } = await supabase
        .from('kebun_info')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data) {
        setError('Data kebun tidak ditemukan.')
        setLoading(false)
        return
      }

      setNamaLokasi(data.nama_lokasi)
      setTitle(data.title)
      setDescription1(data.description_1 || '')
      setDescription2(data.description_2 || '')
      setLuasLahan(data.luas_lahan || '')
      setJenisKopiCount(String(data.jenis_kopi_count || ''))
      setMasaBudidaya(data.masa_budidaya || '')
      setDescriptionBawah(data.description_bawah || '')
      setImageUrl(data.image_url || '')
      setUrutanTampil(String(data.urutan_tampil || 0))
      setLoading(false)
    }

    fetchKebun()
  }, [id, isEditMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      // Upload gambar baru kalau ada
      let finalImageUrl = imageUrl
      if (imageFile) {
        // Membersihkan nama file dari karakter aneh untuk menghindari error Vercel/Supabase
        const cleanFileName = imageFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '')
        const fileName = `${Date.now()}-${cleanFileName}`
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, imageFile)
        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
        finalImageUrl = urlData.publicUrl
      }

      const payload = {
        nama_lokasi: namaLokasi,
        title,
        description_1: description1,
        description_2: description2,
        luas_lahan: luasLahan,
        jenis_kopi_count: parseInt(jenisKopiCount) || 0,
        masa_budidaya: masaBudidaya,
        description_bawah: descriptionBawah,
        image_url: finalImageUrl,
        urutan_tampil: parseInt(urutanTampil) || 0,
      }

      if (isEditMode) {
        const { error: updateError } = await supabase
          .from('kebun_info')
          .update(payload)
          .eq('id', id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('kebun_info')
          .insert(payload)
        if (insertError) throw insertError
      }

      navigate('/admin/kebun', { replace: true })
    } catch (err) {
      console.error(err)
      setError('Gagal menyimpan data.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFAF8] flex justify-center items-center">
        <p className="text-[#6B5B4F] font-medium animate-pulse">Memuat data...</p>
      </div>
    )
  }

  const inputClass = "w-full bg-white border border-[#E1D7CE] text-[#3A261D] rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#5C3D2E]/20 focus:border-[#5C3D2E] transition-all placeholder:text-[#A99A8E]"
  const labelClass = "block text-sm font-semibold text-[#5C3D2E] mb-2"

  return (
    <div className="min-h-screen bg-[#FCFAF8] p-6 md:p-12 relative">
      <div className="max-w-[900px] mx-auto">
        <BackButton to="/admin/kebun" />
        
        <header className="mb-10 mt-2">
          <h1 className="font-['Playfair_Display'] text-[36px] font-bold text-[#3A261D]">
            {isEditMode ? 'Edit Data Kebun' : 'Tambah Kebun Baru'}
          </h1>
          <p className="text-[#7A6A5E] mt-2">
            Lengkapi form di bawah ini untuk mengatur informasi detail mengenai lokasi kebun kopi.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgba(44,24,16,0.04)] border border-[#F0EAE1] space-y-8">
          
          {/* Section 1: Info Dasar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Nama Lokasi</label>
              <input
                required
                value={namaLokasi}
                onChange={(e) => setNamaLokasi(e.target.value)}
                className={inputClass}
                placeholder="Contoh: Petani Bukit Mangir"
              />
            </div>
            <div>
              <label className={labelClass}>Judul Tampilan</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                placeholder="Contoh: Perkebunan Utama"
              />
            </div>
          </div>

          {/* Section 2: Spesifikasi */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F7F3EE]/50 p-6 rounded-2xl border border-[#E1D7CE]/50">
            <div>
              <label className={labelClass}>Luas Lahan</label>
              <input
                value={luasLahan}
                onChange={(e) => setLuasLahan(e.target.value)}
                className={inputClass}
                placeholder="Contoh: ±9 Ha"
              />
            </div>
            <div>
              <label className={labelClass}>Jumlah Jenis Kopi</label>
              <input
                type="number"
                value={jenisKopiCount}
                onChange={(e) => setJenisKopiCount(e.target.value)}
                className={inputClass}
                placeholder="Contoh: 3"
              />
            </div>
            <div>
              <label className={labelClass}>Masa Budidaya</label>
              <input
                value={masaBudidaya}
                onChange={(e) => setMasaBudidaya(e.target.value)}
                className={inputClass}
                placeholder="Contoh: ~1 Tahun"
              />
            </div>
          </div>

          {/* Section 3: Deskripsi */}
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Deskripsi Paragraf 1</label>
              <textarea
                value={description1}
                onChange={(e) => setDescription1(e.target.value)}
                rows={3}
                className={inputClass}
                placeholder="Tuliskan gambaran umum kebun..."
              />
            </div>
            <div>
              <label className={labelClass}>Deskripsi Paragraf 2</label>
              <textarea
                value={description2}
                onChange={(e) => setDescription2(e.target.value)}
                rows={3}
                className={inputClass}
                placeholder="Tuliskan aktivitas atau keunggulan spesifik..."
              />
            </div>
            <div>
              <label className={labelClass}>Deskripsi Bawah (Footer Section)</label>
              <textarea
                value={descriptionBawah}
                onChange={(e) => setDescriptionBawah(e.target.value)}
                rows={2}
                className={inputClass}
                placeholder="Informasi tambahan atau penutup..."
              />
            </div>
          </div>

          {/* Section 4: Gambar & Urutan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#F0EAE1]">
            <div>
              <label className={labelClass}>Foto Profil Kebun</label>
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#E1D7CE] rounded-2xl cursor-pointer bg-[#FCFAF8] hover:bg-[#F7F3EE] hover:border-[#5C3D2E] transition-all group overflow-hidden relative">
                {(imageUrl || imageFile) ? (
                  <>
                    <img 
                      src={imageFile ? URL.createObjectURL(imageFile) : imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-sm font-medium">Ganti Gambar</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    <svg className="w-8 h-8 mb-3 text-[#A99A8E] group-hover:text-[#5C3D2E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    <p className="text-sm text-[#7A6A5E] font-medium">Klik untuk memilih file</p>
                    <p className="text-xs text-[#A99A8E] mt-1">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className={labelClass}>Urutan Tampil (Prioritas)</label>
              <input
                type="number"
                value={urutanTampil}
                onChange={(e) => setUrutanTampil(e.target.value)}
                className={inputClass}
                placeholder="0"
              />
              <p className="text-xs text-[#8B7A6B] mt-2 leading-relaxed">
                Menentukan urutan kebun saat ditampilkan. Angka lebih kecil akan muncul lebih awal (contoh: 1 muncul sebelum 2).
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#3A261D] text-white text-[14px] font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-[#4A7C59] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.99]"
            >
              {saving ? 'Sedang Menyimpan...' : 'Simpan Data Kebun'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
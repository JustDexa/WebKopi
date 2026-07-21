import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../../lib/supabase'
import BackButton from '@/components/ui/BackButton'

interface VariantInput {
  size: string
  price: string
  stock: string
}

interface ProcessStepInput {
  title: string
  description: string
}

export default function ProdukForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [variants, setVariants] = useState<VariantInput[]>([
    { size: '', price: '', stock: '' },
  ])
  const [processSteps, setProcessSteps] = useState<ProcessStepInput[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const addVariantRow = () => {
    setVariants([...variants, { size: '', price: '', stock: '' }])
  }

  const removeVariantRow = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  const updateVariant = (index: number, field: keyof VariantInput, value: string) => {
    const updated = [...variants]
    updated[index][field] = value
    setVariants(updated)
  }

  const addStepRow = () => {
    setProcessSteps([...processSteps, { title: '', description: '' }])
  }

  const removeStepRow = (index: number) => {
    setProcessSteps(processSteps.filter((_, i) => i !== index))
  }

  const updateStep = (index: number, field: keyof ProcessStepInput, value: string) => {
    const updated = [...processSteps]
    updated[index][field] = value
    setProcessSteps(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      // 1. Upload gambar dulu (kalau ada)
      let imageUrl = ''
      if (imageFile) {
        // Membersihkan nama file dari karakter aneh
        const cleanFileName = imageFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '')
        const fileName = `${Date.now()}-${cleanFileName}`
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
        imageUrl = urlData.publicUrl
      }

      // 2. Insert produk, ambil ID yang baru dibuat
      const stepsToInsert = processSteps.filter((s) => s.title.trim() && s.description.trim())

      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({ name, description, category, image_url: imageUrl, process_steps: stepsToInsert })
        .select()
        .single()

      if (productError) throw productError

      // 3. Insert semua varian, pakai product_id dari langkah 2
      const variantsToInsert = variants
        .filter((v) => v.size && v.price) // buang baris kosong
        .map((v) => ({
          product_id: productData.id,
          size: v.size,
          price: parseInt(v.price),
          stock: parseInt(v.stock) || 0,
        }))

      const { error: variantError } = await supabase
        .from('product_variants')
        .insert(variantsToInsert)

      if (variantError) throw variantError

      navigate('/admin/produk', { replace: true })
    } catch (err) {
      console.error(err)
      setError('Gagal menyimpan produk. Cek console untuk detail.')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full bg-white border border-[#E1D7CE] text-[#3A261D] rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#5C3D2E]/20 focus:border-[#5C3D2E] transition-all placeholder:text-[#A99A8E]"
  const labelClass = "block text-sm font-semibold text-[#5C3D2E] mb-2"

  return (
    <div className="min-h-screen bg-[#FCFAF8] p-6 md:p-12 relative">
      <div className="max-w-[900px] mx-auto">
        <BackButton to="/admin/produk" />
        
        <header className="mb-10 mt-2">
          <h1 className="font-['Playfair_Display'] text-[36px] font-bold text-[#3A261D]">
            Tambah Produk Baru
          </h1>
          <p className="text-[#7A6A5E] mt-2">
            Tambahkan produk kopi baru ke dalam katalog beserta varian ukuran dan harganya.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgba(44,24,16,0.04)] border border-[#F0EAE1] space-y-8">
          
          {/* Section 1: Info Dasar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Nama Produk</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Contoh: Kopi Robusta"
              />
            </div>
            <div>
              <label className={labelClass}>Kategori</label>
              <input
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
                placeholder="Contoh: Roasted Bean"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Deskripsi Produk</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={inputClass}
              placeholder="Ceritakan profil rasa, asal biji kopi, atau proses roasting..."
            />
          </div>

          <div>
            <label className={labelClass}>Gambar Produk</label>
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#E1D7CE] rounded-2xl cursor-pointer bg-[#FCFAF8] hover:bg-[#F7F3EE] hover:border-[#5C3D2E] transition-all group overflow-hidden relative">
              {imageFile ? (
                <>
                  <img 
                    src={URL.createObjectURL(imageFile)} 
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
                  <p className="text-sm text-[#7A6A5E] font-medium">Klik untuk memilih foto produk</p>
                  <p className="text-xs text-[#A99A8E] mt-1">Format PNG atau JPG</p>
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

          {/* Section 2: Varian */}
          <div className="pt-4 border-t border-[#F0EAE1]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <label className="block text-[16px] font-bold text-[#3A261D]">Varian Produk</label>
                <p className="text-sm text-[#7A6A5E]">Atur ukuran kemasan, harga, dan ketersediaan stok.</p>
              </div>
            </div>

            <div className="bg-[#F7F3EE]/50 p-6 rounded-2xl border border-[#E1D7CE]/50 space-y-4">
              {variants.map((v, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 items-end bg-white p-4 rounded-xl border border-[#F0EAE1] shadow-sm">
                  <div className="w-full sm:flex-1">
                    <label className="block text-xs font-semibold text-[#7A6A5E] mb-1.5">Ukuran</label>
                    <input
                      required
                      placeholder="Contoh: 250gr"
                      value={v.size}
                      onChange={(e) => updateVariant(i, 'size', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="w-full sm:flex-1">
                    <label className="block text-xs font-semibold text-[#7A6A5E] mb-1.5">Harga (Rp)</label>
                    <input
                      required
                      type="number"
                      placeholder="50000"
                      value={v.price}
                      onChange={(e) => updateVariant(i, 'price', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="w-full sm:flex-1">
                    <label className="block text-xs font-semibold text-[#7A6A5E] mb-1.5">Stok</label>
                    <input
                      required
                      type="number"
                      placeholder="10"
                      value={v.stock}
                      onChange={(e) => updateVariant(i, 'stock', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariantRow(i)}
                      className="w-full sm:w-auto p-3 sm:mb-1 flex justify-center items-center text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                      title="Hapus Varian"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addVariantRow}
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#4A7C59] hover:text-[#3A261D] bg-white px-5 py-2.5 rounded-xl border border-[#E1D7CE] hover:border-[#4A7C59] transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                Tambah Varian Lain
              </button>
            </div>
          </div>

          {/* Section 3: Langkah Pengolahan */}
          <div className="pt-4 border-t border-[#F0EAE1]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <label className="block text-[16px] font-bold text-[#3A261D]">Langkah Pengolahan</label>
                <p className="text-sm text-[#7A6A5E]">
                  Ditampilkan di panel Detail Produk saat pelanggan klik produk ini. Boleh dikosongkan.
                </p>
              </div>
            </div>

            <div className="bg-[#F7F3EE]/50 p-6 rounded-2xl border border-[#E1D7CE]/50 space-y-4">
              {processSteps.length === 0 && (
                <p className="text-sm text-[#A99A8E] italic">Belum ada langkah. Klik "Tambah Langkah" di bawah.</p>
              )}
              {processSteps.map((s, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 items-start bg-white p-4 rounded-xl border border-[#F0EAE1] shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3A261D] text-white text-sm font-bold mt-1">
                    {i + 1}
                  </div>
                  <div className="w-full sm:flex-1 space-y-3">
                    <input
                      placeholder="Judul langkah, contoh: Sortasi & Pulping"
                      value={s.title}
                      onChange={(e) => updateStep(i, 'title', e.target.value)}
                      className={inputClass}
                    />
                    <textarea
                      placeholder="Deskripsi singkat langkah ini"
                      value={s.description}
                      onChange={(e) => updateStep(i, 'description', e.target.value)}
                      rows={2}
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStepRow(i)}
                    className="w-full sm:w-auto p-3 flex justify-center items-center text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    title="Hapus Langkah"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addStepRow}
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#4A7C59] hover:text-[#3A261D] bg-white px-5 py-2.5 rounded-xl border border-[#E1D7CE] hover:border-[#4A7C59] transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                Tambah Langkah
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#3A261D] text-white text-[14px] font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-[#4A7C59] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.99]"
            >
              {saving ? 'Sedang Menyimpan...' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { supabase } from '../../lib/supabase'
import BackButton from '@/components/ui/BackButton'

interface VariantInput {
  id?: string  // ada id kalau varian lama, kosong kalau baru ditambah
  size: string
  price: string
  stock: string
}

interface ProcessStepInput {
  title: string
  description: string
}

export default function ProdukEdit() {
  const { id } = useParams()  // ambil ID produk dari URL, misal /admin/produk/edit/abc123
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [variants, setVariants] = useState<VariantInput[]>([])
  const [processSteps, setProcessSteps] = useState<ProcessStepInput[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Load data produk yang mau diedit
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .eq('id', id)
        .single()

      if (error || !data) {
        setError('Produk tidak ditemukan.')
        setLoading(false)
        return
      }

      setName(data.name)
      setDescription(data.description || '')
      setCategory(data.category || '')
      setImageUrl(data.image_url || '')
      setVariants(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.product_variants.map((v: any) => ({
          id: v.id,
          size: v.size,
          price: String(v.price),
          stock: String(v.stock),
        }))
      )
      setProcessSteps(
        Array.isArray(data.process_steps)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.process_steps.map((s: any) => ({ title: s.title || '', description: s.description || '' }))
          : []
      )
      setLoading(false)
    }

    fetchProduct()
  }, [id])

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
      // 1. Upload gambar baru kalau user pilih file baru (kalau nggak, pakai imageUrl lama)
      let finalImageUrl = imageUrl
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, imageFile)
        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
        finalImageUrl = urlData.publicUrl
      }

      // 2. Update data produk
      const stepsToSave = processSteps.filter((s) => s.title.trim() && s.description.trim())

      const { error: updateError } = await supabase
        .from('products')
        .update({ name, description, category, image_url: finalImageUrl, process_steps: stepsToSave })
        .eq('id', id)
      if (updateError) throw updateError

      // 3. Hapus SEMUA varian lama, insert ulang yang baru
      //    (cara paling simpel buat handle edit/tambah/hapus varian sekaligus)
      await supabase.from('product_variants').delete().eq('product_id', id)

      const variantsToInsert = variants
        .filter((v) => v.size && v.price)
        .map((v) => ({
          product_id: id,
          size: v.size,
          price: parseInt(v.price),
          stock: parseInt(v.stock) || 0,
        }))

      if (variantsToInsert.length > 0) {
        const { error: variantError } = await supabase
          .from('product_variants')
          .insert(variantsToInsert)
        if (variantError) throw variantError
      }

      navigate('/admin/produk')
    } catch (err) {
      console.error(err)
      setError('Gagal menyimpan perubahan.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-10">Memuat...</div>

  return (
    <div className="min-h-screen bg-[#F7F3EE] p-10">
      <BackButton />
      <h1 className="font-['Playfair_Display'] text-[28px] font-bold text-[#5C3D2E] mb-6">
        Edit Produk
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow max-w-[700px] space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Produk</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border rounded-md px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gambar Saat Ini</label>
          {imageUrl && <img src={imageUrl} alt={name} className="w-32 h-32 object-cover rounded-md mb-2" />}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full"
          />
          <p className="text-xs text-[#6B5B4F] mt-1">Kosongkan kalau tidak mau ganti gambar</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Varian (Ukuran & Harga)</label>
          {variants.map((v, i) => (
            <div key={v.id || i} className="flex gap-2 mb-2">
              <input
                placeholder="250gr"
                value={v.size}
                onChange={(e) => updateVariant(i, 'size', e.target.value)}
                className="border rounded-md px-3 py-2 w-1/3"
              />
              <input
                type="number"
                placeholder="Harga"
                value={v.price}
                onChange={(e) => updateVariant(i, 'price', e.target.value)}
                className="border rounded-md px-3 py-2 w-1/3"
              />
              <input
                type="number"
                placeholder="Stok"
                value={v.stock}
                onChange={(e) => updateVariant(i, 'stock', e.target.value)}
                className="border rounded-md px-3 py-2 w-1/4"
              />
              <button type="button" onClick={() => removeVariantRow(i)} className="text-red-600 px-2">
                ✕
              </button>
            </div>
          ))}
          <button type="button" onClick={addVariantRow} className="text-sm text-[#4A7C59] hover:underline">
            + Tambah varian lain
          </button>
        </div>

        <div className="pt-2 border-t border-[#F0EAE1]">
          <label className="block text-sm font-medium mb-1 mt-4">Langkah Pengolahan</label>
          <p className="text-xs text-[#6B5B4F] mb-3">
            Ditampilkan di panel Detail Produk saat pelanggan klik produk ini. Boleh dikosongkan.
          </p>
          {processSteps.map((s, i) => (
            <div key={i} className="flex gap-2 mb-3 items-start">
              <span className="mt-2.5 text-xs font-bold text-[#5C3D2E] w-5 shrink-0">{i + 1}.</span>
              <div className="flex-1 space-y-2">
                <input
                  placeholder="Judul langkah"
                  value={s.title}
                  onChange={(e) => updateStep(i, 'title', e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
                <textarea
                  placeholder="Deskripsi langkah"
                  value={s.description}
                  onChange={(e) => updateStep(i, 'description', e.target.value)}
                  rows={2}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <button type="button" onClick={() => removeStepRow(i)} className="text-red-600 px-2 mt-2.5">
                ✕
              </button>
            </div>
          ))}
          <button type="button" onClick={addStepRow} className="text-sm text-[#4A7C59] hover:underline">
            + Tambah langkah lain
          </button>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-[#5C3D2E] text-white px-8 py-3 rounded-md hover:bg-[#4A7C59] disabled:opacity-50"
        >
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  )
}
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../../lib/supabase'

interface VariantInput {
  size: string
  price: string
  stock: string
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      // 1. Upload gambar dulu (kalau ada)
      let imageUrl = ''
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
        imageUrl = urlData.publicUrl
      }

      // 2. Insert produk, ambil ID yang baru dibuat
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({ name, description, category, image_url: imageUrl })
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

      navigate('/admin/produk')
    } catch (err) {
      console.error(err)
      setError('Gagal menyimpan produk. Cek console untuk detail.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] p-10">
      <h1 className="font-['Playfair_Display'] text-[28px] font-bold text-[#5C3D2E] mb-6">
        Tambah Produk
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow max-w-[700px] space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Produk</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-4 py-2.5"
            placeholder="Robusta"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md px-4 py-2.5"
            placeholder="Roasted Bean"
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
          <label className="block text-sm font-medium mb-1">Gambar Produk</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        {/* Varian */}
        <div>
          <label className="block text-sm font-medium mb-2">Varian (Ukuran & Harga)</label>
          {variants.map((v, i) => (
            <div key={i} className="flex gap-2 mb-2">
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
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariantRow(i)}
                  className="text-red-600 px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addVariantRow}
            className="text-sm text-[#4A7C59] hover:underline"
          >
            + Tambah varian lain
          </button>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-[#5C3D2E] text-white px-8 py-3 rounded-md hover:bg-[#4A7C59] disabled:opacity-50"
        >
          {saving ? 'Menyimpan...' : 'Simpan Produk'}
        </button>
      </form>
    </div>
  )
}
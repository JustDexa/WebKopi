import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { supabase } from '../../lib/supabase'

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

  // Kalau mode Edit, load data existing dulu
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
        const fileName = `${Date.now()}-${imageFile.name}`
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

      navigate('/admin/kebun')
    } catch (err) {
      console.error(err)
      setError('Gagal menyimpan data.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-10">Memuat...</div>

  return (
    <div className="min-h-screen bg-[#F7F3EE] p-10">
      <h1 className="font-['Playfair_Display'] text-[28px] font-bold text-[#5C3D2E] mb-6">
        {isEditMode ? 'Edit Kebun' : 'Tambah Kebun'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow max-w-[700px] space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Lokasi</label>
          <input
            required
            value={namaLokasi}
            onChange={(e) => setNamaLokasi(e.target.value)}
            className="w-full border rounded-md px-4 py-2.5"
            placeholder="Petani Bukit Mangir"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Judul Tampilan</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi Paragraf 1</label>
          <textarea
            value={description1}
            onChange={(e) => setDescription1(e.target.value)}
            rows={3}
            className="w-full border rounded-md px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi Paragraf 2</label>
          <textarea
            value={description2}
            onChange={(e) => setDescription2(e.target.value)}
            rows={3}
            className="w-full border rounded-md px-4 py-2.5"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Luas Lahan</label>
            <input
              value={luasLahan}
              onChange={(e) => setLuasLahan(e.target.value)}
              className="w-full border rounded-md px-4 py-2.5"
              placeholder="±9 Ha"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Jumlah Jenis Kopi</label>
            <input
              type="number"
              value={jenisKopiCount}
              onChange={(e) => setJenisKopiCount(e.target.value)}
              className="w-full border rounded-md px-4 py-2.5"
              placeholder="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Masa Budidaya</label>
            <input
              value={masaBudidaya}
              onChange={(e) => setMasaBudidaya(e.target.value)}
              className="w-full border rounded-md px-4 py-2.5"
              placeholder="~1 Tahun"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi Bawah</label>
          <textarea
            value={descriptionBawah}
            onChange={(e) => setDescriptionBawah(e.target.value)}
            rows={3}
            className="w-full border rounded-md px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gambar</label>
          {imageUrl && (
            <img src={imageUrl} alt={namaLokasi} className="w-32 h-32 object-cover rounded-md mb-2" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Urutan Tampil</label>
          <input
            type="number"
            value={urutanTampil}
            onChange={(e) => setUrutanTampil(e.target.value)}
            className="w-full border rounded-md px-4 py-2.5"
            placeholder="0"
          />
          <p className="text-xs text-[#6B5B4F] mt-1">Angka kecil tampil lebih dulu</p>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-[#5C3D2E] text-white px-8 py-3 rounded-md hover:bg-[#4A7C59] disabled:opacity-50"
        >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
    </div>
  )
}
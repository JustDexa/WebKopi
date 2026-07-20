import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { sanitizeFileName } from '../../lib/utils'
import BackButton from '@/components/ui/BackButton'

interface KebunGalleryImage {
  id: string
  image_url: string
  caption: string
  urutan_tampil: number
}

export default function KebunGaleriAdmin() {
  const [images, setImages] = useState<KebunGalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [caption, setCaption] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  
  // State untuk custom alert/modal hapus
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null)

  const fetchImages = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('kebun_gallery_images')
      .select('*')
      .order('urutan_tampil', { ascending: true })

    if (!error && data) setImages(data)
    setLoading(false)
  }

  useEffect(() => {
    const loadImages = async () => {
      await fetchImages()
    }

    loadImages()
  }, [])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) {
      setError('Silakan pilih gambar terlebih dahulu.')
      return
    }
    setUploading(true)
    setError('')

    try {
      const fileName = sanitizeFileName(imageFile.name)
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, imageFile)
      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)

      const { error: insertError } = await supabase.from('kebun_gallery_images').insert({
        image_url: urlData.publicUrl,
        caption,
        urutan_tampil: images.length,
      })
      if (insertError) throw insertError

      setCaption('')
      setImageFile(null)
      fetchImages()
    } catch (err) {
      console.error(err)
      setError('Gagal mengupload gambar. Coba lagi.')
    } finally {
      setUploading(false)
    }
  }

  const executeDelete = async () => {
    if (!deleteModalId) return
    await supabase.from('kebun_gallery_images').delete().eq('id', deleteModalId)
    setDeleteModalId(null)
    fetchImages()
  }

  return (
    <div className="min-h-screen bg-[#FCFAF8] p-6 md:p-12 relative">
      
      {/* Modal Konfirmasi Hapus */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-7 shadow-2xl max-w-sm w-full transform transition-all scale-100">
            <h3 className="text-xl font-bold text-[#3A261D] mb-2">Hapus Foto Kebun?</h3>
            <p className="text-[#7A6A5E] text-sm mb-6">
              Tindakan ini tidak bisa dibatalkan. Foto ini tidak akan muncul lagi di halaman galeri kebun Anda.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#7A6A5E] bg-[#F7F3EE] hover:bg-[#E8DFD5] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={executeDelete}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/20 transition-all"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto">
        <BackButton to="/admin/dashboard" />
        <header className="mb-10">
          <h1 className="font-['Playfair_Display'] text-[36px] font-bold text-[#3A261D] mb-3">
            Kelola Galeri Kebun
          </h1>
          <p className="text-[#7A6A5E] text-[15px] leading-relaxed max-w-3xl">
            Foto tambahan yang muncul di section <b>"Galeri Kebun"</b> pada halaman publik <span className="bg-[#E8DFD5] px-2 py-0.5 rounded text-[#5C3D2E] font-medium text-sm">/kebun</span>. Foto profil tiap kebun (dari menu Kelola Kebun) otomatis ikut muncul juga tanpa perlu di-upload ulang di sini.
          </p>
        </header>

        {/* Layout Utama: Kiri Form, Kanan Galeri */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sisi Kiri: Form Upload */}
          <div className="lg:col-span-4">
            <div className="bg-white p-7 rounded-2xl shadow-[0_8px_30px_rgba(44,24,16,0.04)] border border-[#F0EAE1] sticky top-8">
              <h2 className="text-lg font-bold text-[#3A261D] mb-5">Upload Foto Baru</h2>
              
              <form onSubmit={handleUpload} className="space-y-5">
                {/* Custom File Input */}
                <div>
                  <label className="block text-sm font-semibold text-[#5C3D2E] mb-2">Pilih Gambar</label>
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[#E1D7CE] rounded-xl cursor-pointer bg-[#FCFAF8] hover:bg-[#F7F3EE] hover:border-[#5C3D2E] transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <svg className="w-8 h-8 mb-3 text-[#A99A8E] group-hover:text-[#5C3D2E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                      </svg>
                      {imageFile ? (
                        <p className="text-sm text-[#4A7C59] font-medium truncate max-w-[200px]">{imageFile.name}</p>
                      ) : (
                        <p className="text-sm text-[#7A6A5E]">Klik untuk memilih file</p>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#5C3D2E] mb-2">Caption (Opsional)</label>
                  <input
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full bg-white border border-[#E1D7CE] text-[#3A261D] rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#5C3D2E]/20 focus:border-[#5C3D2E] transition-all"
                    placeholder="Contoh: Aktivitas panen kopi"
                  />
                </div>

                {error && <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">{error}</p>}
                
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-[#3A261D] text-white text-[13px] font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-[#4A7C59] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {uploading ? 'Sedang Mengupload...' : 'Upload ke Galeri'}
                </button>
              </form>
            </div>
          </div>

          {/* Sisi Kanan: Grid Foto */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="flex justify-center items-center h-60">
                <p className="text-[#6B5B4F] font-medium animate-pulse">Memuat galeri kebun...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="bg-white border border-dashed border-[#E1D7CE] rounded-2xl p-12 text-center">
                <p className="text-[#7A6A5E]">Belum ada foto di galeri kebun.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((img) => (
                  <div key={img.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="aspect-[4/3] relative overflow-hidden bg-[#E8DFD5]">
                      <img 
                        src={img.image_url} 
                        alt={img.caption || 'Foto Galeri Kebun'} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      
                      {/* Overlay & Delete Button on Hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => setDeleteModalId(img.id)}
                          className="bg-white/90 text-red-600 p-2.5 rounded-full hover:bg-red-600 hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                          title="Hapus foto"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {img.caption && (
                      <div className="p-4 border-t border-[#F0EAE1]">
                        <p className="text-sm text-[#5C3D2E] font-medium truncate">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
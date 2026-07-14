import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../../lib/supabase'

interface Kebun {
  id: string
  nama_lokasi: string
  title: string
  luas_lahan: string
  masa_budidaya: string
  image_url: string
  urutan_tampil: number
}

export default function KebunAdmin() {
  const [kebunList, setKebunList] = useState<Kebun[]>([])
  const [loading, setLoading] = useState(true)
  
  // State untuk custom alert/modal hapus
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null)

  const fetchKebun = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('kebun_info')
      .select('*')
      .order('urutan_tampil', { ascending: true })

    if (!error && data) setKebunList(data)
    setLoading(false)
  }

  useEffect(() => {
    const loadProducts = async () => {
        await fetchKebun()
    }

    loadProducts()
  }, [])

  const executeDelete = async () => {
    if (!deleteModalId) return
    await supabase.from('kebun_info').delete().eq('id', deleteModalId)
    setDeleteModalId(null)
    fetchKebun()
  }

  return (
    <div className="min-h-screen bg-[#FCFAF8] p-6 md:p-12 relative">
      
      {/* Modal Konfirmasi Hapus */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-7 shadow-2xl max-w-sm w-full transform transition-all scale-100">
            <h3 className="text-xl font-bold text-[#3A261D] mb-2">Hapus Data Kebun?</h3>
            <p className="text-[#7A6A5E] text-sm mb-6">
              Tindakan ini tidak bisa dibatalkan. Semua data terkait lokasi ini akan dihapus secara permanen.
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

      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="font-['Playfair_Display'] text-[36px] font-bold text-[#3A261D]">
              Kelola Kebun
            </h1>
            <p className="text-[#7A6A5E] mt-1 text-sm md:text-base">Atur informasi lokasi dan lahan kebun kopi.</p>
          </div>
          <Link
            to="/admin/kebun/tambah"
            className="inline-flex items-center gap-2 bg-[#3A261D] text-white px-6 py-3 rounded-xl text-[14px] font-bold uppercase tracking-wide hover:bg-[#4A7C59] hover:shadow-lg active:scale-[0.98] transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
            </svg>
            Tambah Kebun
          </Link>
        </div>

        {/* Konten Utama */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-[#6B5B4F] font-medium animate-pulse">Memuat data kebun...</p>
          </div>
        ) : kebunList.length === 0 ? (
          <div className="bg-white border border-dashed border-[#E1D7CE] rounded-2xl p-12 text-center shadow-sm">
            <p className="text-[#7A6A5E]">Belum ada data kebun. Silakan tambah data baru.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {kebunList.map((k) => (
              <div 
                key={k.id} 
                className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgba(44,24,16,0.03)] border border-[#F0EAE1] hover:shadow-[0_8px_30px_rgba(44,24,16,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  {k.image_url ? (
                    <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#E8DFD5]">
                      <img src={k.image_url} alt={k.nama_lokasi} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 shrink-0 rounded-xl bg-[#F7F3EE] border border-[#E1D7CE] flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#A99A8E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#3A261D] mb-1">
                      {k.nama_lokasi}
                    </h3>
                    {k.title && (
                      <p className="text-sm font-medium text-[#4A7C59] mb-1.5">{k.title}</p>
                    )}
                    <div className="flex items-center gap-2 text-[13px] text-[#7A6A5E]">
                      <span className="flex items-center gap-1 bg-[#F7F3EE] px-2.5 py-1 rounded-md">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                        </svg>
                        {k.luas_lahan}
                      </span>
                      <span className="flex items-center gap-1 bg-[#F7F3EE] px-2.5 py-1 rounded-md">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {k.masa_budidaya}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t border-[#F0EAE1] md:border-none">
                  <Link 
                    to={`/admin/kebun/edit/${k.id}`} 
                    className="flex-1 md:flex-none text-center px-4 py-2 text-sm font-medium text-[#4A7C59] bg-[#EAF2ED] hover:bg-[#D5E5DB] rounded-lg transition-colors"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => setDeleteModalId(k.id)} 
                    className="flex-1 md:flex-none text-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
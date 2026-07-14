import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../../lib/supabase'
import BackButton from '@/components/ui/backButton'

interface Variant {
  id: string
  size: string
  price: number
  stock: number
}

interface Product {
  id: string
  name: string
  description: string
  category: string
  image_url: string
  product_variants: Variant[]
}

export default function ProdukAdmin() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  // State untuk custom alert/modal hapus
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*, product_variants(*)')
      .order('created_at', { ascending: false })

    if (!error && data) setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    const loadProducts = async () => {
        await fetchProducts()
    }

    loadProducts()
  }, [])

  const executeDelete = async () => {
    if (!deleteModalId) return
    await supabase.from('products').delete().eq('id', deleteModalId)
    setDeleteModalId(null)
    fetchProducts() // refresh list
  }

  return (
    <div className="min-h-screen bg-[#FCFAF8] p-6 md:p-12 relative">
      
      {/* Modal Konfirmasi Hapus */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-7 shadow-2xl max-w-sm w-full transform transition-all scale-100">
            <h3 className="text-xl font-bold text-[#3A261D] mb-2">Hapus Produk?</h3>
            <p className="text-[#7A6A5E] text-sm mb-6">
              Tindakan ini tidak bisa dibatalkan. Produk beserta <b>semua varian ukurannya</b> akan terhapus permanen.
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
        <BackButton />
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="font-['Playfair_Display'] text-[36px] font-bold text-[#3A261D]">
              Kelola Produk
            </h1>
            <p className="text-[#7A6A5E] mt-1 text-sm md:text-base">Atur katalog kopi, varian kemasan, harga, dan stok.</p>
          </div>
          <Link
            to="/admin/produk/tambah"
            className="inline-flex items-center gap-2 bg-[#3A261D] text-white px-6 py-3 rounded-xl text-[14px] font-bold uppercase tracking-wide hover:bg-[#4A7C59] hover:shadow-lg active:scale-[0.98] transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
            </svg>
            Tambah Produk
          </Link>
        </div>

        {/* Konten Utama */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-[#6B5B4F] font-medium animate-pulse">Memuat katalog produk...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white border border-dashed border-[#E1D7CE] rounded-2xl p-12 text-center shadow-sm">
            <p className="text-[#7A6A5E]">Belum ada produk. Silakan tambah produk baru.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {products.map((p) => (
              <div 
                key={p.id} 
                className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgba(44,24,16,0.03)] border border-[#F0EAE1] hover:shadow-[0_8px_30px_rgba(44,24,16,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row justify-between items-start gap-6"
              >
                <div className="flex flex-col sm:flex-row items-start gap-5 w-full">
                  {/* Thumbnail Produk */}
                  {p.image_url ? (
                    <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-[#E8DFD5] hidden sm:block">
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 shrink-0 rounded-xl bg-[#F7F3EE] border border-[#E1D7CE] hidden sm:flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#A99A8E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                      </svg>
                    </div>
                  )}

                  {/* Info Produk & Varian */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#3A261D]">
                        {p.name}
                      </h3>
                      {p.category && (
                        <span className="bg-[#EAF2ED] text-[#4A7C59] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                          {p.category}
                        </span>
                      )}
                    </div>
                    
                    {/* Daftar Varian (Chips) */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.product_variants?.length > 0 ? (
                        p.product_variants.map((v) => (
                          <div key={v.id} className="flex items-center text-[13px] bg-[#FCFAF8] border border-[#E1D7CE] rounded-lg overflow-hidden group">
                            <div className="px-3 py-1.5 font-medium text-[#3A261D] bg-white">
                              {v.size}
                            </div>
                            <div className="px-3 py-1.5 font-semibold text-[#5C3D2E] border-l border-[#E1D7CE] bg-[#F7F3EE]">
                              Rp{v.price.toLocaleString('id-ID')}
                            </div>
                            <div className={`px-3 py-1.5 text-xs font-medium border-l border-[#E1D7CE] ${v.stock <= 5 ? 'text-red-600 bg-red-50' : 'text-[#7A6A5E]'}`}>
                              Stok: {v.stock}
                            </div>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-red-500 italic">Belum ada varian ukuran/harga</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex sm:flex-col items-center justify-end gap-2 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t border-[#F0EAE1] md:border-none shrink-0">
                  <Link 
                    to={`/admin/produk/edit/${p.id}`} 
                    className="flex-1 md:flex-none text-center md:w-full px-5 py-2.5 text-sm font-medium text-[#4A7C59] bg-[#EAF2ED] hover:bg-[#D5E5DB] rounded-xl transition-colors"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => setDeleteModalId(p.id)} 
                    className="flex-1 md:flex-none text-center md:w-full px-5 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
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
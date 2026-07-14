import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { supabase } from '../lib/supabase'
import { useCart } from '@/context/CartContext'

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

export default function Produk() {
  const contentRef = useScrollAnimation()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({})

  const handleAddToCart = (product: Product) => {
    const variantId = selectedVariant[product.id]
    const variant = product.product_variants.find((v) => v.id === variantId)

    if (!variant) {
      alert('Pilih ukuran dulu ya')
      return
    }

    addItem({
      productId: product.id,
      productName: product.name,
      variantId: variant.id,
      size: variant.size,
      price: variant.price,
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .order('created_at', { ascending: false })

      if (!error && data) setProducts(data)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const processSteps = [
    { num: '1', title: 'Sortasi & Pulping', desc: 'Pemilahan dan pengupasan kulit buah kopi.' },
    { num: '2', title: 'Fermentasi & Cuci', desc: 'Proses fermentasi dan pencucian biji kopi.' },
    { num: '3', title: 'Pengeringan', desc: 'Pengeringan di para-para hingga kadar air ideal.' },
    { num: '4', title: 'Roasting', desc: 'Pemanggangan biji kopi di Mangir Roastery.' },
  ]

  return (
    <div>
      <Navigation />
      <PageHero
        bgImage="/assets/biji-kopi.jpg"
        breadcrumb="Produk"
        title="Produk Kopi Tjap Mangir"
        subtitle="Arabica, Robusta, dan Liberika — Green Bean & Roasted Bean"
      />

      <div ref={contentRef}>
        {/* Overview */}
        <section className="bg-[#F7F3EE] py-24">
          <div className="max-w-[720px] mx-auto px-6 text-center" data-animate="fadeUp">
            <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] mb-4">
              Produk Kami
            </p>
            <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E] leading-tight">
              Tiga Jenis Kopi, Satu Kualitas
            </h2>
            <p className="mt-5 text-[19px] text-[#2C1810] leading-relaxed">
              Kopi Tjap Mangir mengembangkan tiga jenis kopi — Arabica, Robusta, dan Liberika. Masing-masing memiliki karakter rasa unik dan diproses menjadi green bean maupun roasted bean untuk memenuhi kebutuhan pasar yang beragam.
            </p>
          </div>
        </section>

        {/* Product Cards */}
        <section className="bg-white pb-24 pt-24">
          <div className="max-w-[1200px] mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-[#6B5B4F] text-lg font-medium animate-pulse">Memuat koleksi kopi...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#6B5B4F] text-lg">Belum ada koleksi kopi saat ini.</p>
            </div>
          ) : (
            <div data-animate="staggerFadeUp" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="group flex flex-col bg-[#FCFAF8] border border-[#F0EAE1] rounded-2xl overflow-hidden hover:shadow-[0_12px_40px_rgba(44,24,16,0.08)] hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Bagian Gambar */}
                  <div className="relative h-[280px] bg-[#E8DFD5] overflow-hidden">
                    <img
                      src={p.image_url}
                      alt={`Biji kopi ${p.name}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    
                    {/* Badge Kategori Melayang di atas gambar */}
                    {p.category && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-white/85 backdrop-blur-sm text-[#4A7C59] text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm">
                          {p.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bagian Konten */}
                  <div className="flex flex-col flex-grow p-7">
                    <div className="flex-grow">
                      <h3 className="font-['Playfair_Display'] text-[28px] font-bold text-[#3A261D] leading-tight group-hover:text-[#4A7C59] transition-colors duration-300">
                        {p.name}
                      </h3>
                      <p className="mt-3 text-[14px] text-[#7A6A5E] leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                    </div>

                    {/* Varian & Harga (Selalu di bawah) */}
                    <div className="mt-6 pt-6 border-t border-[#F0EAE1]/80">
                      <div className="relative">
                        <select
                          value={selectedVariant[p.id] || ''}
                          onChange={(e) => setSelectedVariant({ ...selectedVariant, [p.id]: e.target.value })}
                          className="w-full appearance-none bg-white border border-[#E1D7CE] text-[#3A261D] rounded-xl px-4 py-3 text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#5C3D2E]/20 focus:border-[#5C3D2E] transition-all cursor-pointer shadow-sm"
                        >
                          <option value="" disabled className="text-gray-400">Pilih ukuran</option>
                          {p.product_variants.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.size} — Rp{v.price.toLocaleString('id-ID')}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#7A6A5E]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="w-full mt-3 bg-[#3A261D] text-white text-[13px] font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-[#4A7C59] hover:shadow-lg active:scale-[0.98] transition-all duration-300"
                      >
                        Tambah ke Keranjang
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>
         </section>

        {/* Pengolahan */}
        <section className="bg-[#F7F3EE] py-24">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-center mb-14" data-animate="fadeUp">
              <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] mb-4">
                Pengolahan
              </p>
              <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E]">
                Dari Biji Kopi Sampai Siap Dinikmati
              </h2>
            </div>

            <div data-animate="staggerFadeUp" className="flex flex-col md:flex-row items-start justify-between gap-8 relative">
              {/* Connecting line - desktop only */}
              <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-[2px] border-t-2 border-dashed border-[#E8DFD5]" />

              {processSteps.map((s) => (
                <div key={s.num} className="flex-1 flex flex-col items-center text-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#5C3D2E] text-white flex items-center justify-center font-['Playfair_Display'] text-[20px] font-bold">
                    {s.num}
                  </div>
                  <h4 className="font-['Playfair_Display'] text-[24px] font-semibold text-[#5C3D2E] mt-4">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-[14px] text-[#6B5B4F] leading-relaxed max-w-[200px]">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
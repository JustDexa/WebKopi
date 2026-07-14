import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { supabase } from '../lib/supabase'

interface GalleryDisplayItem {
  id: string
  image_url: string
  caption: string
}

export default function Galeri() {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [images, setImages] = useState<GalleryDisplayItem[]>([])
  const [loading, setLoading] = useState(true)
  const contentRef = useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchAllImages = async () => {
      // Ambil dari 3 sumber sekaligus, bareng (paralel), biar nggak nunggu satu-satu
      const [productsRes, kebunRes, galleryRes] = await Promise.all([
        supabase.from('products').select('id, name, image_url'),
        supabase.from('kebun_info').select('id, nama_lokasi, image_url'),
        supabase.from('gallery_images').select('id, image_url, caption, urutan_tampil').order('urutan_tampil', { ascending: true }),
      ])

      const fromProducts: GalleryDisplayItem[] = (productsRes.data || [])
        .filter((p) => p.image_url) // skip produk yang belum ada gambarnya
        .map((p) => ({
          id: `product-${p.id}`,
          image_url: p.image_url,
          caption: p.name,
        }))

      const fromKebun: GalleryDisplayItem[] = (kebunRes.data || [])
        .filter((k) => k.image_url)
        .map((k) => ({
          id: `kebun-${k.id}`,
          image_url: k.image_url,
          caption: k.nama_lokasi,
        }))

      const fromGallery: GalleryDisplayItem[] = (galleryRes.data || []).map((g) => ({
        id: `gallery-${g.id}`,
        image_url: g.image_url,
        caption: g.caption || '',
      }))

      // Gabung semua, urutan: gallery_images manual dulu, baru kebun, baru produk
      setImages([...fromGallery, ...fromKebun, ...fromProducts])
      setLoading(false)
    }

    fetchAllImages()
  }, [])

  return (
    <div>
      <Navigation />
      <PageHero
        bgImage="/assets/kebun-robusta3.jpg"
        breadcrumb="Galeri"
        title="Galeri"
        subtitle="Potret kebun, tanaman, dan aktivitas petani di Bukit Mangir"
      />

      <div ref={contentRef} className="bg-[#F7F3EE] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          {loading ? (
            <p className="text-center">Memuat galeri...</p>
          ) : images.length === 0 ? (
            <p className="text-center text-[#6B5B4F]">Belum ada foto di galeri.</p>
          ) : (
            <div data-animate="staggerFadeUp" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="self-start rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(44,24,16,0.08)] group cursor-pointer"
                  onClick={() => setLightbox(img.image_url)}
                >
                  <img
                    src={img.image_url}
                    alt={img.caption || 'Galeri Kopi Tjap Mangir'}
                    className="w-full h-[280px] object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] bg-[rgba(0,0,0,0.9)] flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[#F7F3EE] transition-colors"
            aria-label="Tutup gambar"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <img
            src={lightbox}
            alt="Galeri full"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  )
}
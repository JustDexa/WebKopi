import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Skeleton } from '../components/ui/skeleton'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { supabase } from '../lib/supabase'
import type { GalleryDisplayItem } from '@/types'

export default function Galeri() {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [images, setImages] = useState<GalleryDisplayItem[]>([])
  const [loading, setLoading] = useState(true)
  const contentRef = useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchAllImages = async () => {
      const [productsRes, kebunRes, galleryRes] = await Promise.all([
        supabase.from('products').select('id, name, image_url'),
        supabase.from('kebun_info').select('id, nama_lokasi, image_url'),
        supabase.from('gallery_images').select('id, image_url, caption, urutan_tampil').order('urutan_tampil', { ascending: true }),
      ])

      const fromProducts: GalleryDisplayItem[] = (productsRes.data || [])
        .filter((p) => p.image_url)
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

      setImages([...fromGallery, ...fromKebun, ...fromProducts])
      setLoading(false)
    }

    fetchAllImages()
  }, [])

  return (
    <div>
      <PageHero
        bgImage="/assets/kebun-robusta3.webp"
        breadcrumb="Galeri"
        title="Galeri"
        subtitle="Potret kebun, tanaman, dan aktivitas petani di Bukit Mangir"
      />

      <div ref={contentRef} className="bg-background py-24">
        <div className="container-brand">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[280px] w-full rounded-3xl" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <p className="text-center text-muted-foreground">Belum ada foto di galeri.</p>
          ) : (
            <div data-animate="staggerFadeUp" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group cursor-pointer self-start overflow-hidden rounded-3xl shadow-soft"
                  onClick={() => setLightbox(img.image_url)}
                >
                  <img
                    src={img.image_url}
                    alt={img.caption || 'Galeri Kopi Tjap Mangir'}
                    className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/95 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Tutup gambar"
            onClick={() => setLightbox(null)}
          >
            <X size={24} />
          </button>
          <img
            src={lightbox}
            alt="Galeri full"
            className="max-h-[90vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

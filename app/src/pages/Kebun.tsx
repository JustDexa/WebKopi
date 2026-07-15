import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { supabase } from '../lib/supabase'

interface KebunInfo {
  id: string
  nama_lokasi: string
  title: string
  description_1: string
  description_2: string
  luas_lahan: string
  jenis_kopi_count: number
  masa_budidaya: string
  description_bawah: string
  image_url: string
  urutan_tampil: number
}

interface GalleryDisplayItem {
  id: string
  src: string
  alt: string
}

export default function Kebun() {
  const contentRef = useScrollAnimation()
  const [kebunList, setKebunList] = useState<KebunInfo[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryDisplayItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchData = async () => {
      const [kebunRes, extraGalleryRes] = await Promise.all([
        supabase.from('kebun_info').select('*').order('urutan_tampil', { ascending: true }),
        supabase
          .from('kebun_gallery_images')
          .select('*')
          .order('urutan_tampil', { ascending: true }),
      ])

      if (kebunRes.data) setKebunList(kebunRes.data)

      // Gabung foto dari tiap entri kebun + foto tambahan manual
      const fromKebun: GalleryDisplayItem[] = (kebunRes.data || [])
        .filter((k) => k.image_url)
        .map((k) => ({
          id: `kebun-${k.id}`,
          src: k.image_url,
          alt: k.nama_lokasi,
        }))

      const fromExtra: GalleryDisplayItem[] = (extraGalleryRes.data || []).map((g) => ({
        id: `extra-${g.id}`,
        src: g.image_url,
        alt: g.caption || 'Galeri Kebun',
      }))

      setGalleryImages([...fromKebun, ...fromExtra])
      setLoading(false)
    }

    fetchData()
  }, [])

  const steps = [
    { side: 'left', title: 'Penanaman', desc: 'Penanaman bibit kopi di lahan perbukitan dengan persiapan lubang tanam dan pupuk dasar.' },
    { side: 'right', title: 'Perawatan', desc: 'Pemeliharaan rutin meliputi penyiraman, pemupukan, dan pengendalian gulma secara bertahap.' },
    { side: 'left', title: 'Pemupukan', desc: 'Pemberian pupuk organik dan perbaikan tanah untuk mendukung pertumbuhan optimal.' },
    { side: 'right', title: 'Pengendalian Hama', desc: 'Pengelolaan hama dan penyakit tanaman secara terpadu dan ramah lingkungan.' },
    { side: 'left', title: 'Panen Selektif', desc: 'Panen buah kopi cherry dengan seleksi kualitas untuk memastikan biji kopi terbaik.' },
  ]

  return (
    <div>
      <Navigation />
      <PageHero
        bgImage="/assets/kebun-robusta2.webp"
        breadcrumb="Kebun Kopi"
        title="Kebun Kopi Tjap Mangir"
        subtitle="Melihat lebih dekat kebun kopi kami di Bukit Mangir"
      />

      <div ref={contentRef}>
        {/* Kebun Overview */}
        {loading ? (
          <section className="bg-[#F7F3EE] py-24 text-center">
            <p>Memuat data kebun...</p>
          </section>
        ) : kebunList.length === 0 ? (
          <section className="bg-[#F7F3EE] py-24 text-center">
            <p className="text-[#6B5B4F]">Belum ada data kebun.</p>
          </section>
        ) : (
          kebunList.map((kebun, index) => {
            const isEven = index % 2 === 0

            return (
              <section
                key={kebun.id}
                className={index % 2 === 0 ? 'bg-[#F7F3EE] py-24' : 'bg-white py-24'}
              >
                <div className="max-w-[1200px] mx-auto px-6">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                      isEven ? '' : 'lg:[direction:rtl]'
                    }`}
                  >
                    <div data-animate="scaleIn" className={isEven ? '' : 'lg:[direction:ltr]'}>
                      <img
                        src={kebun.image_url}
                        alt={kebun.nama_lokasi}
                        className="rounded-xl shadow-[0_4px_24px_rgba(44,24,16,0.08)] w-full"
                      />
                    </div>
                    <div data-animate="fadeUp" className={isEven ? '' : 'lg:[direction:ltr]'}>
                      <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] mb-4">
                        Kebun Kopi Kami
                      </p>
                      <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E] leading-tight">
                        {kebun.title}
                      </h2>
                      <p className="mt-5 text-[19px] text-[#2C1810] leading-relaxed">
                        {kebun.description_1}
                      </p>
                      {kebun.description_2 && (
                        <p className="mt-4 text-[17px] text-[#2C1810] leading-relaxed">
                          {kebun.description_2}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-10 mt-9">
                        <div>
                          <p className="font-['Playfair_Display'] text-[36px] font-bold text-[#5C3D2E]">
                            {kebun.luas_lahan}
                          </p>
                          <p className="text-[14px] text-[#6B5B4F]">Luas Lahan</p>
                        </div>
                        <div>
                          <p className="font-['Playfair_Display'] text-[36px] font-bold text-[#5C3D2E]">
                            {kebun.jenis_kopi_count}
                          </p>
                          <p className="text-[14px] text-[#6B5B4F]">Jenis Kopi</p>
                        </div>
                        <div>
                          <p className="font-['Playfair_Display'] text-[36px] font-bold text-[#5C3D2E]">
                            {kebun.masa_budidaya}
                          </p>
                          <p className="text-[14px] text-[#6B5B4F]">Masa Budidaya</p>
                        </div>
                      </div>

                      {kebun.description_bawah && (
                        <>
                          <div className="border-t border-[#E8DFD5] my-8" />
                          <p className="text-[17px] text-[#6B5B4F] leading-relaxed">
                            {kebun.description_bawah}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )
          })
        )}

        {/* Gallery */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-14" data-animate="fadeUp">
              <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] mb-4">
                Galeri Kebun
              </p>
              <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E]">
                Lihat Keindahan Kebun Kami
              </h2>
              <p className="mt-4 text-[17px] text-[#6B5B4F]">
                Potret kebun kopi dan aktivitas petani di Bukit Mangir
              </p>
            </div>

            {galleryImages.length === 0 ? (
              <p className="text-center text-[#6B5B4F]">Belum ada foto galeri kebun.</p>
            ) : (
              <div data-animate="staggerFadeUp" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((img) => (
                  <div key={img.id} className="rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(44,24,16,0.08)] group">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-[260px] object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Proses Budidaya */}
        <section className="bg-[#F7F3EE] py-24">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-center mb-16" data-animate="fadeUp">
              <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] mb-4">
                Proses Budidaya
              </p>
              <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E]">
                Dari Penanaman Sampai Panen
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#E8DFD5] -translate-x-1/2 hidden lg:block" />

              <div className="space-y-12">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                      step.side === 'right' ? 'lg:flex-row-reverse' : ''
                    }`}
                    data-animate="fadeUp"
                  >
                    <div className={`flex-1 ${step.side === 'left' ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="bg-white rounded-lg p-6 shadow-[0_4px_24px_rgba(44,24,16,0.08)]">
                        <h3 className="font-['Playfair_Display'] text-[24px] font-semibold text-[#5C3D2E]">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[15px] text-[#6B5B4F] leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 w-4 h-4 rounded-full bg-[#4A7C59] border-[3px] border-[#F7F3EE] hidden lg:block flex-shrink-0" />
                    <div className="flex-1 hidden lg:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
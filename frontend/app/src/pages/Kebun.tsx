import { useEffect, useState } from 'react'
import PageHero from '../components/PageHero'
import { Skeleton } from '../components/ui/skeleton'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { api } from '../lib/api'
import type { KebunInfo, GalleryDisplayItem } from '@/types'

interface KebunGalleryImage {
  id: number
  image_url: string
  caption: string
}

export default function Kebun() {
  const contentRef = useScrollAnimation()
  const [kebunList, setKebunList] = useState<KebunInfo[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryDisplayItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchData = async () => {
      try {
        const [kebunData, extraGalleryData] = await Promise.all([
          api.get<KebunInfo[]>('/kebun-info'),
          api.get<KebunGalleryImage[]>('/kebun-gallery-images'),
        ])

        setKebunList(kebunData)

        const fromKebun: GalleryDisplayItem[] = kebunData
          .filter((k) => k.image_url)
          .map((k) => ({
            id: `kebun-${k.id}`,
            image_url: k.image_url,
            caption: k.nama_lokasi,
          }))

        const fromExtra: GalleryDisplayItem[] = extraGalleryData.map((g) => ({
          id: `extra-${g.id}`,
          image_url: g.image_url,
          caption: g.caption || 'Galeri Kebun',
        }))

        setGalleryImages([...fromKebun, ...fromExtra])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
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
      <PageHero
        bgImage="/assets/kebun-robusta2.webp"
        breadcrumb="Kebun Kopi"
        title="Kebun Kopi Tjap Mangir"
        subtitle="Melihat lebih dekat kebun kopi kami di Bukit Mangir"
      />

      <div ref={contentRef}>
        {loading ? (
          <section className="bg-background py-24">
            <div className="container-brand grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <Skeleton className="h-[360px] w-full rounded-3xl" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </section>
        ) : kebunList.length === 0 ? (
          <section className="bg-background py-24 text-center">
            <p className="text-body-lg text-muted-foreground">Belum ada data kebun.</p>
          </section>
        ) : (
          kebunList.map((kebun, index) => {
            const isEven = index % 2 === 0

            return (
              <section key={kebun.id} className={index % 2 === 0 ? 'bg-background py-24' : 'bg-secondary/40 py-24'}>
                <div className="container-brand">
                  <div
                    className={`grid grid-cols-1 items-center gap-14 lg:grid-cols-2 ${
                      isEven ? '' : 'lg:[direction:rtl]'
                    }`}
                  >
                    <div data-animate="scaleIn" className={isEven ? '' : 'lg:[direction:ltr]'}>
                      <img
                        src={kebun.image_url}
                        alt={kebun.nama_lokasi}
                        className="w-full rounded-3xl shadow-card"
                      />
                    </div>
                    <div data-animate="fadeUp" className={isEven ? '' : 'lg:[direction:ltr]'}>
                      <p className="text-caption text-accent">Kebun Kopi Kami</p>
                      <h2 className="mt-4 font-serif text-heading-1 font-bold leading-tight text-primary">
                        {kebun.title}
                      </h2>
                      <p className="mt-5 text-body-lg leading-relaxed text-foreground/85">
                        {kebun.description_1}
                      </p>
                      {kebun.description_2 && (
                        <p className="mt-4 text-body leading-relaxed text-foreground/70">
                          {kebun.description_2}
                        </p>
                      )}

                      <div className="mt-9 flex flex-wrap gap-10">
                        <div>
                          <p className="font-serif text-heading-2 font-bold text-primary">{kebun.luas_lahan}</p>
                          <p className="text-small text-muted-foreground">Luas Lahan</p>
                        </div>
                        <div>
                          <p className="font-serif text-heading-2 font-bold text-primary">{kebun.jenis_kopi_count}</p>
                          <p className="text-small text-muted-foreground">Jenis Kopi</p>
                        </div>
                        <div>
                          <p className="font-serif text-heading-2 font-bold text-primary">{kebun.masa_budidaya}</p>
                          <p className="text-small text-muted-foreground">Masa Budidaya</p>
                        </div>
                      </div>

                      {kebun.description_bawah && (
                        <>
                          <div className="my-8 border-t border-border" />
                          <p className="text-body leading-relaxed text-muted-foreground">
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
        <section className="bg-background py-24">
          <div className="container-brand">
            <div className="mb-14 text-center" data-animate="fadeUp">
              <p className="text-caption text-accent">Galeri Kebun</p>
              <h2 className="mt-4 font-serif text-heading-1 font-bold text-primary">
                Lihat Keindahan Kebun Kami
              </h2>
              <p className="mt-4 text-body-lg text-muted-foreground">
                Potret kebun kopi dan aktivitas petani di Bukit Mangir
              </p>
            </div>

            {galleryImages.length === 0 ? (
              <p className="text-center text-muted-foreground">Belum ada foto galeri kebun.</p>
            ) : (
              <div data-animate="staggerFadeUp" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {galleryImages.map((img) => (
                  <div key={img.id} className="group overflow-hidden rounded-3xl shadow-soft">
                    <img
                      src={img.image_url}
                      alt={img.caption}
                      className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Proses Budidaya */}
        <section className="bg-secondary/40 py-24">
          <div className="mx-auto max-w-[1000px] px-6">
            <div className="mb-16 text-center" data-animate="fadeUp">
              <p className="text-caption text-accent">Proses Budidaya</p>
              <h2 className="mt-4 font-serif text-heading-1 font-bold text-primary">
                Dari Penanaman Sampai Panen
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 hidden w-[2px] -translate-x-1/2 bg-border lg:block" />

              <div className="space-y-10">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`relative flex flex-col items-center gap-6 lg:flex-row ${
                      step.side === 'right' ? 'lg:flex-row-reverse' : ''
                    }`}
                    data-animate="fadeUp"
                  >
                    <div className={`flex-1 ${step.side === 'left' ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="rounded-2xl bg-card p-6 shadow-soft">
                        <h3 className="font-serif text-heading-3 font-semibold text-primary">{step.title}</h3>
                        <p className="mt-2 text-small leading-relaxed text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                    <div className="relative z-10 hidden h-4 w-4 flex-shrink-0 rounded-full border-[3px] border-secondary bg-accent lg:block" />
                    <div className="hidden flex-1 lg:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

import { useLayoutEffect } from 'react'
import { Flame, Settings, Package, GraduationCap, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Roastery() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const contentRef = useScrollAnimation()

  const features = [
    {
      icon: Flame,
      title: 'Roasting',
      desc: 'Mesin roasting kopi skala kelompok untuk memproduksi roasted bean dengan profil rasa konsisten.',
    },
    {
      icon: Settings,
      title: 'Grinding & Testing',
      desc: 'Grinder dan alat uji seduh untuk quality control dan pengembangan produk.',
    },
    {
      icon: Package,
      title: 'Pengemasan',
      desc: 'Sealer kemasan untuk produk roasted bean yang higienis dan menarik.',
    },
    {
      icon: GraduationCap,
      title: 'Pelatihan',
      desc: 'Sebagai bagian dari P4S, roastery juga menjadi tempat pembelajaran bagi petani.',
    },
  ]

  const kebutuhan = [
    'Mesin pulper kopi untuk mengupas kulit buah kopi',
    'Bak fermentasi atau wadah proses pascapanen',
    'Para-para atau drying bed untuk pengeringan biji kopi',
    'Mesin huller untuk mengupas kulit tanduk kopi',
    'Mesin sortasi atau alat grading sederhana',
    'Moisture meter untuk mengukur kadar air green bean',
    'Timbangan digital dan perlengkapan pengemasan',
    'Mesin roasting kopi skala kelompok',
    'Grinder dan alat pendukung uji seduh',
    'Sealer kemasan untuk produk roasted bean',
  ]

  return (
    <div>
      <PageHero
        bgGradient="linear-gradient(135deg, hsl(20 28% 18%) 0%, hsl(20 32% 10%) 100%)"
        breadcrumb="Mangir Roastery"
        title="Mangir Roastery"
        subtitle="Unit Pengolahan dan Hilirisasi Kopi Tjap Mangir"
      />

      <div ref={contentRef}>
        <section className="bg-background py-24">
          <div className="container-brand grid grid-cols-1 items-center gap-16 lg:grid-cols-[42%_58%]">
            <div data-animate="fadeUp" className="flex justify-center">
              <img
                src="/assets/logo-roastery.webp"
                alt="Logo Mangir Roastery"
                className="w-full max-w-[300px] rounded-3xl shadow-card"
              />
            </div>
            <div data-animate="fadeUp">
              <p className="text-caption text-accent">Unit Pengolahan</p>
              <h2 className="mt-4 font-serif text-heading-1 font-bold leading-tight text-primary">
                Mangir Roastery
              </h2>
              <p className="mt-5 text-body-lg leading-relaxed text-foreground/85">
                Mangir Roastery adalah unit pengolahan kopi yang dikembangkan sebagai bagian dari hilirisasi produk Kopi Tjap Mangir. Roastery ini menjadi tempat pengolahan biji kopi hasil panen dari kebun Bukit Mangir menjadi roasted bean berkualitas.
              </p>
              <p className="mt-4 text-body leading-relaxed text-foreground/70">
                Melalui roastery ini, kami berencana melakukan proses roasting dengan standar yang konsisten untuk menghasilkan profil rasa khas dari masing-masing jenis kopi — Arabica, Robusta, dan Liberika.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-secondary/40 py-24">
          <div className="container-brand">
            <h2 className="mb-14 text-center font-serif text-heading-1 font-bold text-primary" data-animate="fadeUp">
              Fasilitas & Rencana Pengembangan
            </h2>
            <div data-animate="staggerFadeUp" className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-3xl bg-card p-9 shadow-soft transition-shadow duration-300 hover:shadow-lifted">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                    <f.icon size={22} className="text-accent" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-5 font-serif text-heading-3 font-semibold text-primary">{f.title}</h3>
                  <p className="mt-2.5 text-small leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-20">
          <div className="mx-auto max-w-[800px] px-6 text-center" data-animate="fadeUp">
            <h2 className="font-serif text-heading-1 font-bold text-white">
              Dukung Pengembangan Roastery Kami
            </h2>
            <p className="mt-5 text-body-lg leading-relaxed text-white/80">
              Untuk mewujudkan Mangir Roastery, kami membutuhkan dukungan peralatan pengolahan kopi. Bantuan ini akan membantu petani mengolah hasil panen menjadi produk bernilai tambah.
            </p>
            <a
              href="#kebutuhan"
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
            >
              Lihat Kebutuhan Peralatan
              <ArrowRight size={15} />
            </a>
          </div>
        </section>

        <section id="kebutuhan" className="bg-background py-24">
          <div className="mx-auto max-w-[1000px] px-6">
            <div className="mb-14 text-center" data-animate="fadeUp">
              <p className="text-caption text-accent">Kebutuhan Peralatan</p>
              <h2 className="mt-4 font-serif text-heading-1 font-bold text-primary">
                Peralatan yang Dibutuhkan
              </h2>
              <p className="mt-4 text-body-lg text-muted-foreground">
                Untuk memperkuat pengembangan Kopi Tjap Mangir, kami membutuhkan dukungan peralatan pengolahan kopi berikut:
              </p>
            </div>

            <div data-animate="staggerFadeUp" className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {kebutuhan.map((item, i) => (
                <div key={i} className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-soft">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-[13px] font-bold text-accent">
                    {i + 1}
                  </span>
                  <p className="text-[15px] text-foreground/85">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

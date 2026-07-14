import { useLayoutEffect } from 'react'
import { Flame, Settings, Package, GraduationCap } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Roastery() {
  // 1. Gunakan useLayoutEffect dan letakkan di ATAS hook animasi
  // Ini memaksa scroll ke atas terjadi SEBELUM GSAP mengkalkulasi kordinat elemen.
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

  return (
    <div>
      <Navigation />
      <PageHero
        bgGradient="linear-gradient(135deg, #5C3D2E 0%, #3D2B1F 100%)"
        breadcrumb="Mangir Roastery"
        title="Mangir Roastery"
        subtitle="Unit Pengolahan dan Hilirisasi Kopi Tjap Mangir"
      />

      <div ref={contentRef}>
        {/* Profile */}
        <section className="bg-[#F7F3EE] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-16 items-center">
              <div data-animate="fadeUp" className="flex justify-center">
                <img
                  src="/assets/logo-roastery.png"
                  alt="Logo Mangir Roastery"
                  className="max-w-[320px] w-full rounded-xl shadow-[0_4px_24px_rgba(44,24,16,0.08)]"
                />
              </div>
              <div data-animate="fadeUp">
                <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] mb-4">
                  Unit Pengolahan
                </p>
                <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E] leading-tight">
                  Mangir Roastery
                </h2>
                <p className="mt-5 text-[19px] text-[#2C1810] leading-relaxed">
                  Mangir Roastery adalah unit pengolahan kopi yang dikembangkan sebagai bagian dari hilirisasi produk Kopi Tjap Mangir. Roastery ini menjadi tempat pengolahan biji kopi hasil panen dari kebun Bukit Mangir menjadi roasted bean berkualitas.
                </p>
                <p className="mt-4 text-[17px] text-[#2C1810] leading-relaxed">
                  Melalui roastery ini, kami berencana melakukan proses roasting dengan standar yang konsisten untuk menghasilkan profil rasa khas dari masing-masing jenis kopi — Arabica, Robusta, dan Liberika.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E] text-center mb-14" data-animate="fadeUp">
              Fasilitas & Rencana Pengembangan
            </h2>
            <div data-animate="staggerFadeUp" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((f) => (
                <div
                  key={f.title}
                  // 2. Ganti transition-all menjadi transition-shadow agar tidak bentrok dengan GSAP
                  className="bg-[#F7F3EE] rounded-xl p-10 hover:shadow-[0_8px_32px_rgba(44,24,16,0.12)] transition-shadow duration-300"
                >
                  <f.icon size={40} className="text-[#4A7C59] mb-5" strokeWidth={1.5} />
                  <h4 className="font-['Playfair_Display'] text-[24px] font-semibold text-[#5C3D2E]">
                    {f.title}
                  </h4>
                  <p className="mt-2.5 text-[15px] text-[#6B5B4F] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#5C3D2E] py-20">
          <div className="max-w-[800px] mx-auto px-6 text-center" data-animate="fadeUp">
            <h2 className="font-['Playfair_Display'] text-[40px] max-md:text-[28px] font-bold text-white">
              Dukung Pengembangan Roastery Kami
            </h2>
            <p className="mt-5 text-[19px] text-[rgba(255,255,255,0.85)] leading-relaxed">
              Untuk mewujudkan Mangir Roastery, kami membutuhkan dukungan peralatan pengolahan kopi. Bantuan ini akan membantu petani mengolah hasil panen menjadi produk bernilai tambah.
            </p>
            <a
              href="#kebutuhan"
              className="inline-block mt-8 border-2 border-[rgba(255,255,255,0.5)] text-white text-[14px] font-semibold uppercase tracking-[0.04em] px-8 py-3.5 rounded-full hover:border-white hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-200"
            >
              Lihat Kebutuhan Peralatan &rarr;
            </a>
          </div>
        </section>

        {/* Kebutuhan Peralatan */}
        <section id="kebutuhan" className="bg-[#F7F3EE] py-24">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-center mb-14" data-animate="fadeUp">
              <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] mb-4">
                Kebutuhan Peralatan
              </p>
              <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E]">
                Peralatan yang Dibutuhkan
              </h2>
              <p className="mt-4 text-[17px] text-[#6B5B4F]">
                Untuk memperkuat pengembangan Kopi Tjap Mangir, kami membutuhkan dukungan peralatan pengolahan kopi berikut:
              </p>
            </div>

            <div data-animate="staggerFadeUp" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
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
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 flex items-start gap-3 shadow-[0_2px_12px_rgba(44,24,16,0.06)]"
                >
                  <span className="text-[#4A7C59] font-bold text-[16px] flex-shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-[15px] text-[#2C1810]">{item}</p>
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
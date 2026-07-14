import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { gsap } from 'gsap'
import { Mountain, Users, Coffee, TrendingUp } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useScrollAnimation()

  useEffect(() => {
    // Hero entrance animations
    if (heroRef.current) {
      const tl = gsap.timeline()
      tl.from('.hero-tag', { opacity: 0, duration: 0.6, delay: 0.3 })
        .from('.hero-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.hero-sub', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero-cta', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    }

    // Scroll animations
  }, [])

  const features = [
    {
      icon: Mountain,
      title: 'Lereng Gunung Lawu',
      desc: 'Tumbuh di kawasan perbukitan dengan kondisi alam pegunungan, udara sejuk, dan lingkungan pertanian yang mendukung.',
    },
    {
      icon: Users,
      title: 'Dikelola Petani Lokal',
      desc: 'Pengelolaan oleh P4S Ngabei Garden — pusat pelatihan pertanian berpengalaman sejak 2021, bersertifikat Kelas Pratama.',
    },
    {
      icon: Coffee,
      title: 'Tiga Jenis Kopi',
      desc: 'Mengembangkan Arabica, Robusta, dan Liberika — masing-masing dengan karakter rasa unik dan pasar yang berbeda.',
    },
    {
      icon: TrendingUp,
      title: 'Hilirisasi Produk',
      desc: 'Dari budidaya kebun, green bean, roasted bean, hingga produk minuman siap konsumsi melalui roastery dan cafe.',
    },
  ]

  return (
    <div>
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/kebun-10hektar.jpg)' }}
        />
        <div className="absolute inset-0 bg-[rgba(44,24,16,0.5)]" />
        <div className="relative z-10 text-center max-w-[800px] px-6">
          <p className="hero-tag text-[13px] font-medium uppercase tracking-[0.15em] text-[#F7F3EE] mb-6">
            Kopi Lokal Lereng Gunung Lawu
          </p>
          <h1 className="hero-title font-['Playfair_Display'] text-[72px] max-md:text-[48px] font-bold text-white leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
            Kopi Tjap Mangir
          </h1>
          <p className="hero-sub mt-5 text-[19px] text-[rgba(255,255,255,0.9)] leading-relaxed max-w-[640px] mx-auto">
            Dari Kebun Petani Bukit Mangir, Dukuh Sekarang, Desa Trengguli, Kecamatan Jenawi — Kabupaten Karanganyar. Dikelola oleh Kelompok Tani P4S Ngabei Garden.
          </p>
          <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link
              to="/produk"
              className="bg-[#5C3D2E] text-white text-[14px] font-semibold uppercase tracking-[0.04em] px-8 py-3.5 rounded-full hover:bg-[#4A7C59] transition-all duration-200 shadow-[0_2px_8px_rgba(92,61,46,0.2)]"
            >
              Jelajahi Produk Kami
            </Link>
            <Link
              to="/kontak"
              className="bg-transparent border-2 border-[rgba(255,255,255,0.6)] text-white text-[14px] font-semibold uppercase tracking-[0.04em] px-8 py-3.5 rounded-full hover:border-white hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      <div ref={contentRef}>
        {/* Profile Ringkasan */}
        <section className="bg-[#F7F3EE] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 items-center">
              <div data-animate="fadeUp">
                <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] mb-4">
                  Tentang Kami
                </p>
                <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E] leading-tight">
                  Kopi Asli Bukit Mangir, Dari Hulu Sampai Hilir
                </h2>
                <p className="mt-5 text-[19px] text-[#2C1810] leading-relaxed">
                  Kopi Tjap Mangir adalah kopi lokal dari Bukit Mangir yang dikembangkan oleh Kelompok Tani P4S Ngabei Garden. Kami mengembangkan kopi Arabica, Robusta, dan Liberika dalam bentuk green bean dan roasted bean.
                </p>
                <p className="mt-4 text-[17px] text-[#2C1810] leading-relaxed">
                  Melalui Mangir Roastery dan Mangir Coffee and Tea, Kopi Tjap Mangir diarahkan menjadi produk kopi dari kebun petani yang diproses dengan lebih baik, bernilai tambah, dan siap menjangkau pasar yang lebih luas.
                </p>
                <Link
                  to="/tentang"
                  className="inline-block mt-7 text-[15px] font-semibold text-[#5C3D2E] hover:text-[#4A7C59] transition-colors underline underline-offset-4"
                >
                  Pelajari Lebih Lanjut &rarr;
                </Link>
              </div>
              <div data-animate="scaleIn">
                <img
                  src="/assets/kebun-robusta.jpg"
                  alt="Kebun Kopi Robusta Bukit Mangir"
                  className="rounded-xl shadow-[0_4px_24px_rgba(44,24,16,0.08)] w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Keunggulan */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] text-center mb-4">
              Mengapa Kopi Tjap Mangir
            </p>
            <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E] text-center mb-16">
              Keunggulan Kopi Kami
            </h2>
            <div data-animate="staggerFadeUp" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((f) => (
                <div
                    key={f.title}
                    className="bg-[#F7F3EE] rounded-xl p-10 text-center hover:shadow-[0_8px_32px_rgba(44,24,16,0.12)] hover:-translate-y-1.5 transition-shadow duration-300"
                  >
                  <f.icon size={48} className="mx-auto text-[#4A7C59] mb-6" strokeWidth={1.5} />
                  <h4 className="font-['Playfair_Display'] text-[22px] font-semibold text-[#5C3D2E] mb-3">
                    {f.title}
                  </h4>
                  <p className="text-[15px] text-[#6B5B4F] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="relative py-32 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/assets/biji-kopi.jpg)' }}
        >
          <div className="absolute inset-0 bg-[rgba(44,24,16,0.65)]" />
          <div className="relative z-10 max-w-[640px] mx-auto px-6 text-center" data-animate="fadeUp">
            <h2 className="font-['Playfair_Display'] text-[44px] max-md:text-[32px] font-bold text-white">
              Mari Berkolaborasi
            </h2>
            <p className="mt-5 text-[19px] text-[rgba(255,255,255,0.85)] leading-relaxed">
              Kami terbuka untuk kerja sama, pemesanan produk, dan dukungan pengembangan peralatan pengolahan kopi. Hubungi kami untuk informasi lebih lanjut.
            </p>
            <Link
              to="/kontak"
              className="inline-block mt-9 bg-[#5C3D2E] text-white text-[14px] font-semibold uppercase tracking-[0.04em] px-10 py-4 rounded-full hover:bg-[#4A7C59] transition-all duration-200"
            >
              Hubungi Kami Sekarang
            </Link>
          </div>
        </section>

        {/* Info Strip */}
        <section className="bg-[#5C3D2E] py-8">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[14px] text-[rgba(255,255,255,0.8)] text-center md:text-left">
              Dikelola oleh Kelompok Tani P4S Ngabei Garden | Pusat Pelatihan Pertanian | Dukuh Sekarang, Desa Trengguli
            </p>
            <div className="flex items-center gap-2 text-[14px] text-[rgba(255,255,255,0.8)]">
              <span className="text-[#6B9E7C]">&#10003;</span>
              <span>Sertifikat P4S Kelas Pratama — Kementerian Pertanian</span>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { gsap } from 'gsap'
import { Mountain, Users, Coffee, TrendingUp, Star, ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { api } from '@/lib/api'
import type { Testimonial } from '@/types'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useScrollAnimation()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await api.get<Testimonial[]>('/testimonials')
        setTestimonials(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline()
      tl.from('.hero-tag', { opacity: 0, duration: 0.6, delay: 0.3 })
        .from('.hero-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.hero-sub', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero-cta', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    }
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
      {/* Hero Section */}
      <section ref={heroRef} className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/kebun-10hektar.webp)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/40 to-primary/70" />
        <div className="relative z-10 mx-auto max-w-[820px] px-6 text-center">
          <p className="hero-tag mb-6 text-caption text-white/80">
            Kopi Lokal Lereng Gunung Lawu
          </p>
          <h1 className="hero-title font-serif text-display font-bold leading-[1.02] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
            Kopi Tjap Mangir
          </h1>
          <p className="hero-sub mx-auto mt-6 max-w-[620px] text-body-lg leading-relaxed text-white/85">
            Dari Kebun Petani Bukit Mangir, Dukuh Sekarang, Desa Trengguli, Kecamatan Jenawi — Kabupaten Karanganyar. Dikelola oleh Kelompok Tani P4S Ngabei Garden.
          </p>
          <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/produk"
              className="group flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-primary shadow-lifted transition-all duration-200 hover:bg-white/90"
            >
              Jelajahi Produk Kami
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/kontak"
              className="rounded-full border-2 border-white/50 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-all duration-200 hover:border-white hover:bg-white/10"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex">
          <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="h-9 w-[1.5px] animate-pulse bg-white/40" />
        </div>
      </section>

      <div ref={contentRef}>
        {/* Profile Ringkasan */}
        <section className="bg-background py-28">
          <div className="container-brand grid grid-cols-1 items-center gap-16 lg:grid-cols-[52%_48%]">
            <div data-animate="fadeUp">
              <p className="text-caption text-accent">Tentang Kami</p>
              <h2 className="mt-4 font-serif text-heading-1 font-bold leading-[1.08] text-primary">
                Kopi Asli Bukit Mangir, Dari Hulu Sampai Hilir
              </h2>
              <p className="mt-6 text-body-lg leading-relaxed text-foreground/85">
                Kopi Tjap Mangir adalah kopi lokal dari Bukit Mangir yang dikembangkan oleh Kelompok Tani P4S Ngabei Garden. Kami mengembangkan kopi Arabica, Robusta, dan Liberika dalam bentuk green bean dan roasted bean.
              </p>
              <p className="mt-4 text-body leading-relaxed text-foreground/70">
                Melalui Mangir Roastery dan Mangir Coffee and Tea, Kopi Tjap Mangir diarahkan menjadi produk kopi dari kebun petani yang diproses dengan lebih baik, bernilai tambah, dan siap menjangkau pasar yang lebih luas.
              </p>
              <Link
                to="/tentang"
                className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-primary transition-colors hover:text-accent"
              >
                Pelajari Lebih Lanjut
                <ArrowRight size={15} />
              </Link>
            </div>
            <div data-animate="scaleIn" className="relative">
              <img
                src="/assets/kebun-robusta.webp"
                alt="Kebun Kopi Robusta Bukit Mangir"
                className="w-full rounded-3xl shadow-card"
              />
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-card px-6 py-5 shadow-lifted md:block">
                <p className="font-serif text-heading-3 font-bold text-primary">&plusmn;9 Ha</p>
                <p className="text-small text-muted-foreground">Kawasan Budidaya</p>
              </div>
            </div>
          </div>
        </section>

        {/* Keunggulan */}
        <section className="bg-secondary/50 py-28">
          <div className="container-brand">
            <div className="mx-auto max-w-[640px] text-center">
              <p className="text-caption text-accent">Mengapa Kopi Tjap Mangir</p>
              <h2 className="mt-4 font-serif text-heading-1 font-bold text-primary">
                Keunggulan Kopi Kami
              </h2>
            </div>
            <div data-animate="staggerFadeUp" className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-3xl bg-card p-9 text-center shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lifted"
                >
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 transition-colors group-hover:bg-accent">
                    <f.icon size={26} className="text-accent transition-colors group-hover:text-accent-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-heading-3 font-semibold text-primary">{f.title}</h3>
                  <p className="mt-3 text-small leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimoni */}
        {testimonials.length > 0 && (
          <section className="bg-background py-28">
            <div className="container-brand">
              <div className="mx-auto max-w-[640px] text-center">
                <p className="text-caption text-accent">Kata Mereka</p>
                <h2 className="mt-4 font-serif text-heading-1 font-bold text-primary">
                  Dipercaya Penikmat Kopi
                </h2>
              </div>
              <div data-animate="staggerFadeUp" className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
                {testimonials.map((t) => (
                  <div key={t.id} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
                    <div className="flex gap-1 text-gold">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          size={14}
                          fill={j < t.rating ? 'currentColor' : 'none'}
                          strokeWidth={j < t.rating ? 0 : 1.5}
                        />
                      ))}
                    </div>
                    <p className="mt-5 text-body leading-relaxed text-foreground/85">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-6 border-t border-border pt-4">
                      <p className="text-[14px] font-semibold text-primary">{t.name}</p>
                      {t.role && <p className="text-small text-muted-foreground">{t.role}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section
          className="relative bg-fixed bg-cover bg-center py-36"
          style={{ backgroundImage: 'url(/assets/biji-kopi.webp)' }}
        >
          <div className="absolute inset-0 bg-primary/70" />
          <div className="container-brand relative z-10 mx-auto max-w-[640px] text-center" data-animate="fadeUp">
            <h2 className="font-serif text-heading-1 font-bold text-white">Mari Berkolaborasi</h2>
            <p className="mt-5 text-body-lg leading-relaxed text-white/80">
              Kami terbuka untuk kerja sama, pemesanan produk, dan dukungan pengembangan peralatan pengolahan kopi. Hubungi kami untuk informasi lebih lanjut.
            </p>
            <Link
              to="/kontak"
              className="mt-9 inline-block rounded-full bg-white px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.06em] text-primary transition-all duration-200 hover:bg-white/90"
            >
              Hubungi Kami Sekarang
            </Link>
          </div>
        </section>

        {/* Info Strip */}
        <section className="bg-primary py-7">
          <div className="container-brand flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-center text-small text-white/60 md:text-left">
              Dikelola oleh Kelompok Tani P4S Ngabei Garden | Dukuh Sekarang, Desa Trengguli
            </p>
            <div className="flex items-center gap-2 text-small text-white/60">
              <span className="text-gold">&#10003;</span>
              <span>Sertifikat P4S Kelas Pratama — Kementerian Pertanian</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

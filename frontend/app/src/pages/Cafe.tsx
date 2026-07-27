import { useEffect } from 'react'
import { CupSoda, Store, Truck } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Cafe() {
  const contentRef = useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const concepts = [
    {
      icon: CupSoda,
      title: 'Minuman Kopi Lokal',
      desc: 'Menyajikan berbagai varian minuman dari kopi Arabica, Robusta, dan Liberika hasil kebun sendiri.',
    },
    {
      icon: Store,
      title: 'Pengembangan Brand',
      desc: 'Membangun identitas brand Kopi Tjap Mangir melalui pengalaman langsung bagi konsumen.',
    },
    {
      icon: Truck,
      title: 'Pemasaran Produk',
      desc: 'Meningkatkan jangkauan pasar produk green bean dan roasted bean ke berbagai segmen.',
    },
  ]

  return (
    <div>
      <PageHero
        bgGradient="linear-gradient(135deg, hsl(148 30% 24%) 0%, hsl(148 34% 15%) 100%)"
        breadcrumb="Mangir Coffee & Tea"
        title="Mangir Coffee and Tea"
        subtitle="Unit Produk Minuman dan Pengembangan Pasar"
      />

      <div ref={contentRef}>
        <section className="bg-background py-24">
          <div className="container-brand grid grid-cols-1 items-center gap-16 lg:grid-cols-[55%_45%]">
            <div data-animate="fadeUp">
              <p className="text-caption text-accent">Unit Produk & Pemasaran</p>
              <h2 className="mt-4 font-serif text-heading-1 font-bold leading-tight text-primary">
                Mangir Coffee and Tea
              </h2>
              <p className="mt-5 text-body-lg leading-relaxed text-foreground/85">
                Mangir Coffee and Tea adalah unit produk minuman dan pengembangan pasar dari Kopi Tjap Mangir. Melalui unit ini, kami menyajikan produk kopi lokal langsung dari kebun Bukit Mangir kepada konsumen.
              </p>
              <p className="mt-4 text-body leading-relaxed text-foreground/70">
                Unit ini menjadi wajah pemasaran Kopi Tjap Mangir — tempat konsumen dapat menikmati kopi lokal sekaligus mengenal lebih dekat kisah petani Bukit Mangir. Kami juga mengembangkan berbagai varian minuman kopi dan teh untuk memenuhi selera yang beragam.
              </p>
              <div className="mt-7 border-l-[3px] border-accent pl-5">
                <p className="font-serif text-heading-3 italic text-accent">
                  &ldquo;Mantap Awal Sampai Akhir&rdquo;
                </p>
              </div>
            </div>
            <div data-animate="fadeUp" className="flex justify-center">
              <img
                src="/assets/logo-cafe.webp"
                alt="Logo Mangir Coffee and Tea"
                className="w-full max-w-[320px] rounded-3xl shadow-card"
              />
            </div>
          </div>
        </section>

        <section className="bg-secondary/40 py-24">
          <div className="container-brand">
            <h2 className="mb-14 text-center font-serif text-heading-1 font-bold text-primary" data-animate="fadeUp">
              Konsep & Pengembangan
            </h2>
            <div data-animate="staggerFadeUp" className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {concepts.map((c) => (
                <div
                  key={c.title}
                  className="rounded-3xl bg-card p-9 text-center shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lifted"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                    <c.icon size={22} className="text-accent" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-5 font-serif text-heading-3 font-semibold text-primary">{c.title}</h3>
                  <p className="mt-2.5 text-small leading-relaxed text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

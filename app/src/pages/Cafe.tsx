import { useEffect } from 'react'
import { CupSoda, Store, Truck } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
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
      <Navigation />
      <PageHero
        bgGradient="linear-gradient(135deg, #4A7C59 0%, #3D6B4A 100%)"
        breadcrumb="Mangir Coffee & Tea"
        title="Mangir Coffee and Tea"
        subtitle="Unit Produk Minuman dan Pengembangan Pasar"
      />

      <div ref={contentRef}>
        {/* Profile */}
        <section className="bg-[#F7F3EE] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 items-center">
              <div data-animate="fadeUp">
                <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] mb-4">
                  Unit Produk & Pemasaran
                </p>
                <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E] leading-tight">
                  Mangir Coffee and Tea
                </h2>
                <p className="mt-5 text-[19px] text-[#2C1810] leading-relaxed">
                  Mangir Coffee and Tea adalah unit produk minuman dan pengembangan pasar dari Kopi Tjap Mangir. Melalui unit ini, kami menyajikan produk kopi lokal langsung dari kebun Bukit Mangir kepada konsumen.
                </p>
                <p className="mt-4 text-[17px] text-[#2C1810] leading-relaxed">
                  Unit ini menjadi wajah pemasaran Kopi Tjap Mangir — tempat konsumen dapat menikmati kopi lokal sekaligus mengenal lebih dekat kisah petani Bukit Mangir. Kami juga mengembangkan berbagai varian minuman kopi dan teh untuk memenuhi selera yang beragam.
                </p>
                <div className="mt-7 border-l-[3px] border-[#4A7C59] pl-5">
                  <p className="font-['Playfair_Display'] text-[22px] italic text-[#4A7C59]">
                    "Mantap Awal Sampai Akhir"
                  </p>
                </div>
              </div>
              <div data-animate="fadeUp" className="flex justify-center">
                <img
                  src="/assets/logo-cafe.webp"
                  alt="Logo Mangir Coffee and Tea"
                  className="max-w-[340px] w-full rounded-xl shadow-[0_4px_24px_rgba(44,24,16,0.08)]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Concept */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E] text-center mb-14" data-animate="fadeUp">
              Konsep & Pengembangan
            </h2>
            <div data-animate="staggerFadeUp" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {concepts.map((c) => (
                <div
                  key={c.title}
                  className="bg-[#F7F3EE] rounded-xl p-10 text-center hover:shadow-[0_8px_32px_rgba(44,24,16,0.12)] hover:-translate-y-1.5 transition-shadow duration-300"
                >
                  <c.icon size={40} className="mx-auto text-[#4A7C59] mb-5" strokeWidth={1.5} />
                  <h3 className="font-['Playfair_Display'] text-[24px] font-semibold text-[#5C3D2E]">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] text-[#6B5B4F] leading-relaxed">
                    {c.desc}
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
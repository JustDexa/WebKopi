import { useEffect } from 'react'
import { Eye, Target, MapPin, Mountain, Leaf, Award } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Tentang() {
  const contentRef = useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const missions = [
    'Mengembangkan budidaya kopi Arabica, Robusta, dan Liberika secara berkelanjutan.',
    'Meningkatkan kapasitas petani dalam pengelolaan kebun dan pascapanen kopi.',
    'Membangun sistem pengolahan kopi dari hasil panen menjadi green bean dan roasted bean.',
    'Mengembangkan Mangir Roastery sebagai unit pengolahan kopi lokal.',
    'Memperluas pemasaran produk melalui Mangir Coffee and Tea.',
    'Menjadikan P4S Ngabei Garden sebagai pusat pembelajaran dan pemberdayaan petani kopi.',
  ]

  return (
    <div>
      <PageHero
        bgImage="/assets/kebun-10hektar2.webp"
        breadcrumb="Tentang Kami"
        title="Tentang Kami"
        subtitle="Mengenal lebih dekat Kopi Tjap Mangir dan P4S Ngabei Garden"
      />

      <div ref={contentRef}>
        {/* Story Section */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-[800px] px-6" data-animate="fadeUp">
            <p className="text-caption text-accent">Cerita Kami</p>
            <h2 className="mt-4 font-serif text-heading-1 font-bold leading-tight text-primary">
              Dari Bukit Mangir, Untuk Penikmat Kopi Nusantara
            </h2>
            <p className="mt-6 text-body-lg leading-relaxed text-foreground/85">
              Kopi Tjap Mangir lahir dari semangat petani lokal di Bukit Mangir, Dukuh Sekarang, Desa Trengguli, Kecamatan Jenawi, Kabupaten Karanganyar. Kawasan ini berada di lereng Gunung Lawu dengan karakter alam pegunungan, kontur lahan berbukit, dan udara sejuk yang mendukung pertumbuhan kopi berkualitas.
            </p>
            <p className="mt-5 text-body leading-relaxed text-foreground/70">
              Pengembangan Kopi Tjap Mangir berangkat dari keinginan membangun ekosistem kopi dari hulu sampai hilir. Penanaman kopi telah berjalan hampir satu tahun dan menjadi bagian dari pengembangan kebun produktif P4S Ngabei Garden. Melalui brand ini, kelompok tani berupaya membangun rantai nilai yang lebih lengkap — dari budidaya, pengolahan pascapanen, produksi green bean, roasting, hingga produk siap konsumsi.
            </p>
            <p className="mt-5 text-body leading-relaxed text-foreground/70">
              Saat ini, kelompok mengembangkan tiga jenis kopi — Arabica, Robusta, dan Liberika — yang direncanakan untuk diolah menjadi green bean dan roasted bean. Untuk mewujudkan proses pengolahan tersebut, kelompok membutuhkan dukungan peralatan pascapanen dan pengolahan kopi.
            </p>
          </div>
        </section>

        {/* Visi Misi */}
        <section className="bg-secondary/40 py-24">
          <div className="container-brand grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-card p-11 shadow-soft md:p-14" data-animate="fadeUp">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                <Eye size={22} className="text-accent" strokeWidth={1.6} />
              </div>
              <h3 className="mt-6 font-serif text-heading-2 font-semibold text-primary">Visi</h3>
              <p className="mt-4 text-body-lg leading-relaxed text-foreground/80">
                Menjadi produk kopi lokal unggulan dari Bukit Mangir yang berdaya saing, bernilai tambah, dan mampu memperkuat kesejahteraan petani melalui pengembangan budidaya dan pengolahan kopi berbasis kelompok tani.
              </p>
            </div>

            <div className="rounded-3xl bg-card p-11 shadow-soft md:p-14" data-animate="fadeUp">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                <Target size={22} className="text-accent" strokeWidth={1.6} />
              </div>
              <h3 className="mt-6 font-serif text-heading-2 font-semibold text-primary">Misi</h3>
              <div className="mt-5 space-y-3.5">
                {missions.map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <p className="text-[15px] leading-relaxed text-foreground/80">{m}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lokasi */}
        <section className="bg-background py-24">
          <div className="container-brand grid grid-cols-1 items-center gap-14 lg:grid-cols-[52%_48%]">
            <div data-animate="scaleIn">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.!2d111.165!3d-7.668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e798a1c8c0e9d49%3A0x6f2a0b9c7b7d0e1f!2sTrengguli%2C%20Kec.%20Jenawi%2C%20Kabupaten%20Karanganyar%2C%20Jawa%20Tengah!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%"
                height="420"
                style={{ border: 0, borderRadius: '24px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Bukit Mangir"
                className="shadow-card"
              />
            </div>

            <div data-animate="fadeUp">
              <p className="text-caption text-accent">Lokasi Kami</p>
              <h3 className="mt-3 font-serif text-heading-2 font-semibold text-primary">
                Bukit Mangir, Lereng Gunung Lawu
              </h3>
              <div className="mt-6 flex items-start gap-3">
                <MapPin size={19} className="mt-1 flex-shrink-0 text-primary" />
                <p className="text-body text-foreground/80">
                  Dukuh Sekarang, Desa Trengguli, Kecamatan Jenawi, Kabupaten Karanganyar, Jawa Tengah
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  { icon: Mountain, title: 'Kawasan Lereng Gunung Lawu', sub: 'Kondisi alam pegunungan, udara sejuk' },
                  { icon: Leaf, title: 'Luas Hortikultura \u00b19 Hektar', sub: 'Kawasan budidaya P4S Ngabei Garden' },
                  { icon: Award, title: 'Sertifikat P4S Kelas Pratama', sub: 'Kementerian Pertanian RI' },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-soft">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <item.icon size={19} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[14.5px] font-medium text-foreground">{item.title}</p>
                      <p className="text-small text-muted-foreground">{item.sub}</p>
                    </div>
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

import {useEffect} from 'react'
import { Eye, Target, MapPin, Mountain, Leaf, Award } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
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
      <Navigation />
      <PageHero
        bgImage="/assets/kebun-10hektar2.jpg"
        breadcrumb="Tentang Kami"
        title="Tentang Kami"
        subtitle="Mengenal lebih dekat Kopi Tjap Mangir dan P4S Ngabei Garden"
      />

      <div ref={contentRef}>
        {/* Story Section */}
        <section className="bg-[#F7F3EE] py-24">
          <div className="max-w-[800px] mx-auto px-6" data-animate="fadeUp">
            <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] mb-4">
              Cerita Kami
            </p>
            <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E] leading-tight mt-4">
              Dari Bukit Mangir, Untuk Penikmat Kopi Nusantara
            </h2>
            <p className="mt-6 text-[19px] text-[#2C1810] leading-relaxed">
              Kopi Tjap Mangir lahir dari semangat petani lokal di Bukit Mangir, Dukuh Sekarang, Desa Trengguli, Kecamatan Jenawi, Kabupaten Karanganyar. Kawasan ini berada di lereng Gunung Lawu dengan karakter alam pegunungan, kontur lahan berbukit, dan udara sejuk yang mendukung pertumbuhan kopi berkualitas.
            </p>
            <p className="mt-5 text-[17px] text-[#2C1810] leading-relaxed">
              Pengembangan Kopi Tjap Mangir berangkat dari keinginan membangun ekosistem kopi dari hulu sampai hilir. Penanaman kopi telah berjalan hampir satu tahun dan menjadi bagian dari pengembangan kebun produktif P4S Ngabei Garden. Melalui brand ini, kelompok tani berupaya membangun rantai nilai yang lebih lengkap — dari budidaya, pengolahan pascapanen, produksi green bean, roasting, hingga produk siap konsumsi.
            </p>
            <p className="mt-5 text-[17px] text-[#2C1810] leading-relaxed">
              Saat ini, kelompok mengembangkan tiga jenis kopi — Arabica, Robusta, dan Liberika — yang direncanakan untuk diolah menjadi green bean dan roasted bean. Untuk mewujudkan proses pengolahan tersebut, kelompok membutuhkan dukungan peralatan pascapanen dan pengolahan kopi.
            </p>
          </div>
        </section>

        {/* Visi Misi */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Visi */}
              <div className="bg-[#F7F3EE] rounded-xl p-12" data-animate="fadeUp">
                <Eye size={32} className="text-[#4A7C59] mb-5" />
                <h3 className="font-['Playfair_Display'] text-[32px] font-semibold text-[#5C3D2E]">
                  Visi
                </h3>
                <p className="mt-4 text-[19px] text-[#2C1810] leading-relaxed">
                  Menjadi produk kopi lokal unggulan dari Bukit Mangir yang berdaya saing, bernilai tambah, dan mampu memperkuat kesejahteraan petani melalui pengembangan budidaya dan pengolahan kopi berbasis kelompok tani.
                </p>
              </div>

              {/* Misi */}
              <div className="bg-[#F7F3EE] rounded-xl p-12" data-animate="fadeUp">
                <Target size={32} className="text-[#4A7C59] mb-5" />
                <h3 className="font-['Playfair_Display'] text-[32px] font-semibold text-[#5C3D2E]">
                  Misi
                </h3>
                <div className="mt-4 space-y-3.5">
                  {missions.map((m, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[#4A7C59] mt-0.5 text-[18px]">&#10003;</span>
                      <p className="text-[15px] text-[#2C1810] leading-relaxed">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lokasi */}
        <section className="bg-[#F7F3EE] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12">
              {/* Map */}
              <div data-animate="scaleIn">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.!2d111.165!3d-7.668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e798a1c8c0e9d49%3A0x6f2a0b9c7b7d0e1f!2sTrengguli%2C%20Kec.%20Jenawi%2C%20Kabupaten%20Karanganyar%2C%20Jawa%20Tengah!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Bukit Mangir"
                  className="shadow-[0_4px_24px_rgba(44,24,16,0.08)]"
                />
              </div>

              {/* Info */}
              <div data-animate="fadeUp">
                <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59]">
                  Lokasi Kami
                </p>
                <h3 className="font-['Playfair_Display'] text-[32px] font-semibold text-[#5C3D2E] mt-3">
                  Bukit Mangir, Lereng Gunung Lawu
                </h3>
                <div className="mt-6 flex items-start gap-3">
                  <MapPin size={20} className="text-[#5C3D2E] mt-1 flex-shrink-0" />
                  <p className="text-[16px] text-[#2C1810]">
                    Dukuh Sekarang, Desa Trengguli, Kecamatan Jenawi, Kabupaten Karanganyar, Jawa Tengah
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="bg-white rounded-md p-4 flex items-center gap-4 shadow-[0_4px_24px_rgba(44,24,16,0.08)]">
                    <Mountain size={24} className="text-[#4A7C59] flex-shrink-0" />
                    <div>
                      <p className="text-[15px] font-medium text-[#2C1810]">Kawasan Lereng Gunung Lawu</p>
                      <p className="text-[14px] text-[#6B5B4F]">Kondisi alam pegunungan, udara sejuk</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-md p-4 flex items-center gap-4 shadow-[0_4px_24px_rgba(44,24,16,0.08)]">
                    <Leaf size={24} className="text-[#4A7C59] flex-shrink-0" />
                    <div>
                      <p className="text-[15px] font-medium text-[#2C1810]">Luas Hortikultura &plusmn;9 Hektar</p>
                      <p className="text-[14px] text-[#6B5B4F]">Kawasan budidaya P4S Ngabei Garden</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-md p-4 flex items-center gap-4 shadow-[0_4px_24px_rgba(44,24,16,0.08)]">
                    <Award size={24} className="text-[#4A7C59] flex-shrink-0" />
                    <div>
                      <p className="text-[15px] font-medium text-[#2C1810]">Sertifikat P4S Kelas Pratama</p>
                      <p className="text-[14px] text-[#6B5B4F]">Kementerian Pertanian RI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

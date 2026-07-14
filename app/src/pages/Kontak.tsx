import { useState, useEffect} from 'react'
import { User, Building, Phone, Smartphone, Mail } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import emailjs from '@emailjs/browser'



export default function Kontak() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const contentRef = useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setError('')

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)
    } catch (err) {
      setError('Gagal mengirim pesan. Coba lagi ya.')
      console.error(err)
    } finally {
      setIsSending(false)
    }
  }

  const contactCards = [
    { icon: User, label: 'Nama Ketua', value: 'Tito Suryono, M.Pd', href: null },
    { icon: Building, label: 'Pusat Pelatihan', value: 'Pusat Pelatihan Pertanian Ngabei Garden', href: null },
    { icon: Phone, label: 'Telepon', value: '085 727 087 123', href: 'tel:085727087123' },
    { icon: Smartphone, label: 'Handphone / WhatsApp', value: '0812-3738-4137', href: 'tel:081237384137' },
    { icon: Mail, label: 'Email', value: 'ngabeigarden@gmail.com', href: 'mailto:ngabeigarden@gmail.com' },
  ]

  return (
    <div>
      <Navigation />
      <PageHero
        bgGradient="linear-gradient(135deg, #5C3D2E 0%, #3D2B1F 100%)"
        breadcrumb="Kontak"
        title="Kontak Kami"
        subtitle="Hubungi kami untuk kerja sama, pemesanan, atau informasi lebih lanjut"
      />

      <div ref={contentRef}>
        {/* Contact Info */}
        <section className="bg-[#F7F3EE] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left - Contact Details */}
              <div data-animate="fadeUp">
                <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#4A7C59] mb-4">
                  Hubungi Kami
                </p>
                <h2 className="font-['Playfair_Display'] text-[48px] max-md:text-[32px] font-bold text-[#5C3D2E] leading-tight mt-3">
                  Mari Terhubung
                </h2>
                <p className="mt-5 text-[19px] text-[#2C1810] leading-relaxed">
                  Kami terbuka untuk kerja sama, pemesanan produk, dukungan pengembangan, dan kunjungan ke kebun. Jangan ragu untuk menghubungi kami.
                </p>

                <div className="mt-10 space-y-4">
                  {contactCards.map((card, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-md p-5 flex items-start gap-4 shadow-[0_4px_24px_rgba(44,24,16,0.08)]"
                    >
                      <card.icon size={24} className="text-[#4A7C59] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#6B5B4F]">
                          {card.label}
                        </p>
                        {card.href ? (
                          <a
                            href={card.href}
                            className="text-[17px] font-semibold text-[#8B5E3C] hover:text-[#4A7C59] transition-colors"
                          >
                            {card.value}
                          </a>
                        ) : (
                          <p className="text-[17px] font-semibold text-[#2C1810]">
                            {card.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Contact Form */}
              <div data-animate="fadeUp">
                <div className="bg-white rounded-xl p-12 shadow-[0_4px_24px_rgba(44,24,16,0.08)]">
                  <h3 className="font-['Playfair_Display'] text-[32px] font-semibold text-[#5C3D2E] mb-8">
                    Kirim Pesan
                  </h3>

                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-[#4A7C59] text-white flex items-center justify-center mx-auto mb-4 text-[24px]">
                        &#10003;
                      </div>
                      <h4 className="font-['Playfair_Display'] text-[24px] font-semibold text-[#5C3D2E]">
                        Terima Kasih!
                      </h4>
                      <p className="mt-2 text-[17px] text-[#6B5B4F]">
                        Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-[14px] font-medium text-[#2C1810] mb-2">
                          Nama Lengkap
                        </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-[#E8DFD5] rounded-md px-4 py-3.5 text-[15px] text-[#2C1810] focus:border-[#8B5E3C] focus:ring-2 focus:ring-[rgba(139,94,60,0.2)] outline-none transition-all"
                        placeholder="Masukkan nama Anda"
                      />
                      </div>
                      <div>
                        <label className="block text-[14px] font-medium text-[#2C1810] mb-2">
                          Email
                        </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-[#E8DFD5] rounded-md px-4 py-3.5 text-[15px] text-[#2C1810] focus:border-[#8B5E3C] focus:ring-2 focus:ring-[rgba(139,94,60,0.2)] outline-none transition-all"
                      placeholder="Masukkan email Anda"
                    />
                      </div>
                      <div>
                        <label className="block text-[14px] font-medium text-[#2C1810] mb-2">
                          Subjek
                        </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full border border-[#E8DFD5] rounded-md px-4 py-3.5 text-[15px] text-[#2C1810] focus:border-[#8B5E3C] focus:ring-2 focus:ring-[rgba(139,94,60,0.2)] outline-none transition-all"
                      placeholder="Masukkan Subjek Anda"
                    />
                      </div>
                      <div>
                        <label className="block text-[14px] font-medium text-[#2C1810] mb-2">
                          Pesan
                        </label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-[#E8DFD5] rounded-md px-4 py-3.5 text-[15px] text-[#2C1810] focus:border-[#8B5E3C] focus:ring-2 focus:ring-[rgba(139,94,60,0.2)] outline-none transition-all resize-none"
                        placeholder="Tulis pesan Anda di sini..."
                      />
                      </div>
                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full bg-[#5C3D2E] text-white text-[14px] font-semibold uppercase tracking-[0.04em] py-4 rounded-md hover:bg-[#4A7C59] transition-colors duration-200 disabled:opacity-50"
                      >
                        {isSending ? 'Mengirim...' : 'Kirim Pesan'}
                      </button>

                      {error && (
                        <p className="text-red-600 text-sm mt-2">{error}</p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.!2d111.165!3d-7.668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e798a1c8c0e9d49%3A0x6f2a0b9c7b7d0e1f!2sTrengguli%2C%20Kec.%20Jenawi%2C%20Kabupaten%20Karanganyar%2C%20Jawa%20Tengah!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Lokasi Bukit Mangir"
          />
        </section>
      </div>

      <Footer />
    </div>
  )
}

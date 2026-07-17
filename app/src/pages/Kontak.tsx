import { useState, useEffect } from 'react'
import { User, Building, Phone, Smartphone, Mail, Check } from 'lucide-react'
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

  const inputClass =
    'w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-[15px] text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20'

  return (
    <div>
      <PageHero
        bgGradient="linear-gradient(135deg, hsl(20 28% 18%) 0%, hsl(20 32% 10%) 100%)"
        breadcrumb="Kontak"
        title="Kontak Kami"
        subtitle="Hubungi kami untuk kerja sama, pemesanan, atau informasi lebih lanjut"
      />

      <div ref={contentRef}>
        <section className="bg-background py-24">
          <div className="container-brand grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div data-animate="fadeUp">
              <p className="text-caption text-accent">Hubungi Kami</p>
              <h2 className="mt-3 font-serif text-heading-1 font-bold leading-tight text-primary">
                Mari Terhubung
              </h2>
              <p className="mt-5 text-body-lg leading-relaxed text-foreground/80">
                Kami terbuka untuk kerja sama, pemesanan produk, dukungan pengembangan, dan kunjungan ke kebun. Jangan ragu untuk menghubungi kami.
              </p>

              <div className="mt-10 space-y-3.5">
                {contactCards.map((card, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-soft">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <card.icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-caption text-muted-foreground">{card.label}</p>
                      {card.href ? (
                        <a href={card.href} className="text-[16px] font-semibold text-primary transition-colors hover:text-accent">
                          {card.value}
                        </a>
                      ) : (
                        <p className="text-[16px] font-semibold text-foreground">{card.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-animate="fadeUp">
              <div className="rounded-3xl bg-card p-9 shadow-card md:p-12">
                <h3 className="font-serif text-heading-2 font-semibold text-primary">Kirim Pesan</h3>

                {submitted ? (
                  <div className="py-14 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check size={26} strokeWidth={2.5} />
                    </div>
                    <h4 className="font-serif text-heading-3 font-semibold text-primary">Terima Kasih!</h4>
                    <p className="mt-2 text-body text-muted-foreground">
                      Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                      <label className="mb-2 block text-small font-medium text-foreground">Nama Lengkap</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Masukkan nama Anda"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-small font-medium text-foreground">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Masukkan email Anda"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-small font-medium text-foreground">Subjek</label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Masukkan Subjek Anda"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-small font-medium text-foreground">Pesan</label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className={`${inputClass} resize-none`}
                        placeholder="Tulis pesan Anda di sini..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full rounded-2xl bg-primary py-4 text-[14px] font-semibold uppercase tracking-[0.06em] text-primary-foreground transition-colors duration-200 hover:bg-primary/85 disabled:opacity-50"
                    >
                      {isSending ? 'Mengirim...' : 'Kirim Pesan'}
                    </button>

                    {error && <p className="mt-2 text-small text-destructive">{error}</p>}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

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
    </div>
  )
}

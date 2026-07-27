import { Link } from 'react-router'
import { Phone, Mail, ArrowUpRight } from 'lucide-react'
import { getWhatsAppContactLink } from '@/lib/whatsapp'

const navGroup = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang Kami', path: '/tentang' },
  { label: 'Kebun Kopi', path: '/kebun' },
  { label: 'Produk', path: '/produk' },
  { label: 'Galeri', path: '/galeri' },
  { label: 'Kontak', path: '/kontak' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container-brand grid grid-cols-1 gap-14 py-20 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-heading-3 font-bold text-primary-foreground">
            Kopi Tjap Mangir
          </h3>
          <p className="mt-3 max-w-[240px] text-body text-primary-foreground/60">
            Mantap Awal Sampai Akhir
          </p>
          <p className="mt-5 max-w-[280px] text-small leading-relaxed text-primary-foreground/50">
            Kopi lokal dari Bukit Mangir, dikelola oleh Kelompok Tani P4S Ngabei Garden.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h4 className="text-caption text-primary-foreground/45">Navigasi</h4>
          <ul className="mt-5 space-y-3">
            {navGroup.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-body text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Unit Usaha */}
        <div>
          <h4 className="text-caption text-primary-foreground/45">Unit Usaha</h4>
          <ul className="mt-5 space-y-3">
            <li>
              <Link
                to="/roastery"
                className="text-body text-primary-foreground/75 transition-colors hover:text-primary-foreground"
              >
                Mangir Roastery
              </Link>
            </li>
            <li>
              <Link
                to="/cafe"
                className="text-body text-primary-foreground/75 transition-colors hover:text-primary-foreground"
              >
                Mangir Coffee & Tea
              </Link>
            </li>
            <li>
              <span className="text-body text-primary-foreground/75">P4S Ngabei Garden</span>
            </li>
          </ul>
        </div>

        {/* Kontak Kami */}
        <div>
          <h4 className="text-caption text-primary-foreground/45">Kontak Kami</h4>
          <div className="mt-5 space-y-3.5">
            <p className="text-body font-medium text-primary-foreground/90">Tito Suryono, M.Pd</p>
            <a
              href="tel:085727087123"
              className="flex items-center gap-2.5 text-small text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              <Phone size={15} />
              085 727 087 123
            </a>
            <a
              href="mailto:ngabeigarden@gmail.com"
              className="flex items-center gap-2.5 text-small text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              <Mail size={15} />
              ngabeigarden@gmail.com
            </a>
            <a
              href={getWhatsAppContactLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-small font-semibold text-whatsapp-foreground transition-all hover:brightness-105"
            >
              Chat WhatsApp
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-brand flex flex-col items-center justify-between gap-3 py-6 md:flex-row">
          <p className="text-small text-primary-foreground/45">
            &copy; 2025 Kopi Tjap Mangir. Dikelola oleh P4S Ngabei Garden.
          </p>
          <p className="text-small text-primary-foreground/45">
            Sertifikat P4S Kelas Pratama &mdash; Kementerian Pertanian
          </p>
        </div>
      </div>
    </footer>
  )
}

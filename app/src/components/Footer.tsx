import { Link } from 'react-router'
import { Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#F7F3EE] pt-20 pb-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-['Playfair_Display'] text-[22px] font-bold text-[#5C3D2E]">
              Kopi Tjap Mangir
            </h3>
            <p className="mt-4 text-[14px] text-[#6B5B4F]">
              Mantap Awal Sampai Akhir
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#6B5B4F] mb-4">
              Navigasi
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Beranda', path: '/' },
                { label: 'Tentang Kami', path: '/tentang' },
                { label: 'Kebun Kopi', path: '/kebun' },
                { label: 'Produk', path: '/produk' },
                { label: 'Galeri', path: '/galeri' },
                { label: 'Kontak', path: '/kontak' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[15px] text-[#2C1810] hover:text-[#4A7C59] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unit Usaha */}
          <div>
            <h4 className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#6B5B4F] mb-4">
              Unit Usaha
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/roastery"
                  className="text-[15px] text-[#2C1810] hover:text-[#4A7C59] transition-colors"
                >
                  Mangir Roastery
                </Link>
              </li>
              <li>
                <Link
                  to="/cafe"
                  className="text-[15px] text-[#2C1810] hover:text-[#4A7C59] transition-colors"
                >
                  Mangir Coffee & Tea
                </Link>
              </li>
              <li>
                <span className="text-[15px] text-[#2C1810]">
                  P4S Ngabei Garden
                </span>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-[13px] font-medium uppercase tracking-[0.04em] text-[#6B5B4F] mb-4">
              Kontak Kami
            </h4>
            <div className="space-y-3">
              <p className="text-[15px] font-medium text-[#2C1810]">
                Tito Suryono, M.Pd
              </p>
              <div className="flex items-center gap-2 text-[14px] text-[#6B5B4F]">
                <Phone size={16} />
                <span>085 727 087 123</span>
              </div>
              <div className="flex items-center gap-2 text-[14px] text-[#6B5B4F]">
                <Phone size={16} />
                <span>0812-3738-4137</span>
              </div>
              <div className="flex items-center gap-2 text-[14px]">
                <Mail size={16} className="text-[#6B5B4F]" />
                <a
                  href="mailto:ngabeigarden@gmail.com"
                  className="text-[#8B5E3C] hover:text-[#4A7C59] transition-colors"
                >
                  ngabeigarden@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E8DFD5] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-[#6B5B4F]">
            &copy; 2025 Kopi Tjap Mangir. Dikelola oleh P4S Ngabei Garden.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#6B5B4F] hover:text-[#4A7C59] transition-colors cursor-pointer">
              <Instagram size={20} />
            </span>
            <span className="text-[#6B5B4F] hover:text-[#4A7C59] transition-colors cursor-pointer">
              <Facebook size={20} />
            </span>
            <span className="text-[#6B5B4F] hover:text-[#4A7C59] transition-colors cursor-pointer">
              <Youtube size={20} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

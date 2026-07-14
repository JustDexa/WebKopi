import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import CartPanel from './CartPanel'

const navLinks = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang', path: '/tentang' },
  { label: 'Kebun', path: '/kebun' },
  { label: 'Produk', path: '/produk' },
  { label: 'Roastery', path: '/roastery' },
  { label: 'Cafe', path: '/cafe' },
  { label: 'Galeri', path: '/galeri' },
  { label: 'Kontak', path: '/kontak' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems } = useCart()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-[rgba(247,243,238,0.95)] backdrop-blur-[12px] shadow-[0_2px_20px_rgba(44,24,16,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link
            to="/"
            className="font-['Playfair_Display'] text-[20px] font-bold text-[#5C3D2E] tracking-tight"
          >
            Kopi Tjap Mangir
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[15px] font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#4A7C59] border-b-2 border-[#4A7C59] pb-1'
                    : 'text-[#5C3D2E] hover:text-[#4A7C59]'
                }`}
              >
                {link.label}
              </Link>
            ))}
                        <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#5C3D2E] hover:text-[#4A7C59] transition-colors"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4A7C59] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Link
              to="/kontak"
              className="bg-[#5C3D2E] text-white text-[14px] font-semibold uppercase tracking-[0.04em] px-6 py-2.5 rounded-full hover:bg-[#4A7C59] transition-colors duration-200"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative text-[#5C3D2E]">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4A7C59] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="text-[#5C3D2E]" onClick={() => setMobileOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[#F7F3EE] flex flex-col items-center justify-center gap-6">
          <button
            className="absolute top-6 right-6 text-[#5C3D2E]"
            onClick={() => setMobileOpen(false)}
          >
            <X size={28} />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[22px] font-medium font-['Playfair_Display'] transition-colors ${
                location.pathname === link.path
                  ? 'text-[#4A7C59]'
                  : 'text-[#5C3D2E] hover:text-[#4A7C59]'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
      <CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

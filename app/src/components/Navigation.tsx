import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, ShoppingBag, X, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import CartPanel from './CartPanel'

const primaryLinks = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang', path: '/tentang' },
  { label: 'Kebun', path: '/kebun' },
  { label: 'Produk', path: '/produk' },
  { label: 'Galeri', path: '/galeri' },
]

const unitUsahaLinks = [
  { label: 'Mangir Roastery', path: '/roastery' },
  { label: 'Mangir Coffee & Tea', path: '/cafe' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [unitOpen, setUnitOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems } = useCart()
  const [bump, setBump] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Kecil, tapi memberi kepastian visual instan saat isi cart bertambah dari halaman manapun.
  useEffect(() => {
    if (totalItems === 0) return
    setBump(true)
    const t = setTimeout(() => setBump(false), 380)
    return () => clearTimeout(t)
  }, [totalItems])

  const isActive = (path: string) => location.pathname === path
  const isUnitUsahaActive = unitUsahaLinks.some((l) => isActive(l.path))

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-background/90 backdrop-blur-xl shadow-soft'
            : 'bg-gradient-to-b from-black/35 via-black/10 to-transparent'
        }`}
      >
        <div className="container-brand flex h-[76px] items-center justify-between">
          <Link
            to="/"
            className={`font-serif text-[19px] font-bold tracking-tight transition-colors ${
              scrolled || mobileOpen ? 'text-primary' : 'text-white'
            }`}
          >
            Kopi Tjap Mangir
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-[14px] font-medium transition-colors ${
                  isActive(link.path)
                    ? scrolled ? 'text-accent' : 'text-white'
                    : scrolled
                      ? 'text-foreground/70 hover:text-primary'
                      : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className={`absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full ${scrolled ? 'bg-accent' : 'bg-white'}`} />
                )}
              </Link>
            ))}

            {/* Unit Usaha dropdown — groups Roastery + Cafe (fixes audit C6) */}
            <div
              className="relative"
              onMouseEnter={() => setUnitOpen(true)}
              onMouseLeave={() => setUnitOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 text-[14px] font-medium transition-colors ${
                  isUnitUsahaActive
                    ? scrolled ? 'text-accent' : 'text-white'
                    : scrolled
                      ? 'text-foreground/70 hover:text-primary'
                      : 'text-white/75 hover:text-white'
                }`}
              >
                Unit Usaha
                <ChevronDown size={14} className={`transition-transform ${unitOpen ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 ${
                  unitOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="w-56 rounded-2xl border border-border bg-card p-2 shadow-lifted">
                  {unitUsahaLinks.map((l) => (
                    <Link
                      key={l.path}
                      to={l.path}
                      className={`block rounded-xl px-4 py-3 text-[14px] font-medium transition-colors ${
                        isActive(l.path) ? 'bg-accent/10 text-accent' : 'text-foreground/80 hover:bg-secondary'
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/kontak"
              className={`ml-2 px-4 py-2 text-[14px] font-medium transition-colors ${
                isActive('/kontak')
                  ? scrolled ? 'text-accent' : 'text-white'
                  : scrolled
                    ? 'text-foreground/70 hover:text-primary'
                    : 'text-white/75 hover:text-white'
              }`}
            >
              Kontak
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Buka keranjang belanja"
              className={`relative rounded-full p-2.5 transition-colors ${
                scrolled ? 'text-primary hover:bg-secondary' : 'text-white hover:bg-white/10'
              }`}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {totalItems > 0 && (
                <span className={`absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground ${bump ? 'animate-scale-bounce' : ''}`}>
                  {totalItems}
                </span>
              )}
            </button>
            <Link
              to="/produk"
              className={`rounded-full px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 ${
                scrolled
                  ? 'bg-primary text-primary-foreground hover:bg-primary/85'
                  : 'bg-white text-primary hover:bg-white/90'
              }`}
            >
              Pesan Sekarang
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Buka keranjang belanja"
              className={`relative rounded-full p-2.5 ${scrolled || mobileOpen ? 'text-primary' : 'text-white'}`}
            >
              <ShoppingBag size={21} strokeWidth={1.8} />
              {totalItems > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground ${bump ? 'animate-scale-bounce' : ''}`}>
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className={`rounded-full p-2.5 ${scrolled || mobileOpen ? 'text-primary' : 'text-white'}`}
              aria-label="Buka menu navigasi"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-background transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-brand flex h-[76px] items-center justify-between">
          <span className="font-serif text-[19px] font-bold text-primary">Kopi Tjap Mangir</span>
          <button
            className="rounded-full p-2.5 text-primary"
            aria-label="Tutup menu navigasi"
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1 px-8 pb-20">
          {[...primaryLinks, ...unitUsahaLinks, { label: 'Kontak', path: '/kontak' }].map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`border-b border-border/70 py-4 font-serif text-[26px] font-semibold transition-colors ${
                isActive(link.path) ? 'text-accent' : 'text-primary'
              }`}
              style={{ animationDelay: `${i * 40}ms` }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/produk"
            onClick={() => setMobileOpen(false)}
            className="mt-8 rounded-full bg-accent py-4 text-center text-[14px] font-semibold uppercase tracking-[0.06em] text-accent-foreground"
          >
            Pesan Sekarang
          </Link>
        </div>
      </div>

      <CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

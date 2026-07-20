import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router'
import { Package, Sprout, Image, Images, MessageSquareQuote, LogOut, ExternalLink } from 'lucide-react'

const menuItems = [
  {
    to: '/admin/produk',
    icon: Package,
    title: 'Produk',
    desc: 'Kelola produk, varian ukuran, dan harga',
  },
  {
    to: '/admin/kebun',
    icon: Sprout,
    title: 'Kebun',
    desc: 'Kelola data & profil kebun kopi',
  },
  {
    to: '/admin/galeri',
    icon: Image,
    title: 'Galeri',
    desc: 'Kelola foto galeri utama website',
  },
  {
    to: '/admin/kebun-galeri',
    icon: Images,
    title: 'Galeri Kebun',
    desc: 'Foto tambahan di section galeri halaman Kebun',
  },
  {
    to: '/admin/testimoni',
    icon: MessageSquareQuote,
    title: 'Testimoni',
    desc: 'Kelola testimoni pelanggan di halaman Beranda',
  },
]

export default function AdminDashboard() {
  const { signOut, session } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE]">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E8DFD5]">
        <div className="max-w-[1200px] mx-auto px-8 py-5 flex justify-between items-center">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#4A7C59]">
              Kopi Tjap Mangir
            </p>
            <h1 className="font-['Playfair_Display'] text-[24px] font-bold text-[#5C3D2E] leading-tight">
              Panel Admin
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[14px] text-[#6B5B4F] hover:text-[#4A7C59] transition-colors"
            >
              Lihat Website
              <ExternalLink size={14} />
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#5C3D2E] text-white text-[14px] font-medium px-5 py-2.5 rounded-full hover:bg-[#4A7C59] transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="mb-10">
          <h2 className="font-['Playfair_Display'] text-[28px] font-bold text-[#5C3D2E]">
            Selamat Datang
          </h2>
          <p className="text-[15px] text-[#6B5B4F] mt-1">
            {session?.user?.email || 'Admin'} — kelola konten website dari sini.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group bg-white rounded-xl p-7 shadow-[0_2px_12px_rgba(44,24,16,0.06)] hover:shadow-[0_8px_28px_rgba(44,24,16,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#F7F3EE] flex items-center justify-center mb-5 group-hover:bg-[#4A7C59] transition-colors duration-300">
                <item.icon
                  size={22}
                  className="text-[#4A7C59] group-hover:text-white transition-colors duration-300"
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="font-['Playfair_Display'] text-[19px] font-semibold text-[#5C3D2E] mb-1.5">
                {item.title}
              </h3>
              <p className="text-[13.5px] text-[#6B5B4F] leading-relaxed">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
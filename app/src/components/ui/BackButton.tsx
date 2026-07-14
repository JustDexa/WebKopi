import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 text-[#7A6A5E] hover:text-[#5C3D2E] font-medium mb-6 group transition-colors"
    >
      <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md border border-[#F0EAE1] transition-all">
        <ArrowLeft size={18} />
      </div>
      <span>Kembali</span>
    </button>
  )
}
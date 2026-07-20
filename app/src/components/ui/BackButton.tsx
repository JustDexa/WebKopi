import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  to?: string
}

export default function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-[#7A6A5E] hover:text-[#5C3D2E] font-medium mb-6 group transition-colors"
    >
      <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md border border-[#F0EAE1] transition-all">
        <ArrowLeft size={18} />
      </div>
      <span>Kembali</span>
    </button>
  )
}

import { Link } from 'react-router'

interface PageHeroProps {
  bgImage?: string
  bgGradient?: string
  breadcrumb: string
  title: string
  subtitle: string
}

export default function PageHero({ bgImage, bgGradient, breadcrumb, title, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative h-[360px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        background: bgGradient || undefined,
      }}
    >
      {/* Overlay */}
      {!bgGradient && (
        <div className="absolute inset-0 bg-[rgba(44,24,16,0.55)]" />
      )}
      {/* Extra overlay for gradient backgrounds */}
      {bgGradient && (
        <div className="absolute inset-0 bg-[rgba(44,24,16,0.35)]" />
      )}

      <div className="relative z-10 text-center max-w-[800px] px-6">
        <div className="text-[14px] text-[rgba(255,255,255,0.7)] mb-4 flex items-center justify-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
          <span>/</span>
          <span>{breadcrumb}</span>
        </div>
        <h1 className="font-['Playfair_Display'] text-[48px] font-bold text-white leading-tight">
          {title}
        </h1>
        <p className="mt-3 text-[19px] text-[rgba(255,255,255,0.85)] leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  )
}

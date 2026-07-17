import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'

interface PageHeroProps {
  bgImage?: string
  bgGradient?: string
  breadcrumb: string
  title: string
  subtitle: string
}

export default function PageHero({ bgImage, bgGradient, breadcrumb, title, subtitle }: PageHeroProps) {
  const heroBg = bgGradient ?? (bgImage ? `url('${bgImage}')` : undefined)

  return (
    <section
      className="relative flex h-[420px] items-end overflow-hidden pb-16 pt-32"
      style={{
        backgroundImage: heroBg,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={bgGradient ? 'absolute inset-0 bg-primary/25' : 'absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/35 to-primary/10'} />

      <div className="container-brand relative z-10">
        <div className="flex items-center gap-1.5 text-[13px] text-white/65">
          <Link to="/" className="transition-colors hover:text-white">Beranda</Link>
          <ChevronRight size={13} />
          <span className="text-white/85">{breadcrumb}</span>
        </div>
        <h1 className="mt-4 max-w-[720px] font-serif text-heading-1 font-bold leading-[1.08] text-white">
          {title}
        </h1>
        <p className="mt-4 max-w-[560px] text-body-lg text-white/80">
          {subtitle}
        </p>
      </div>
    </section>
  )
}

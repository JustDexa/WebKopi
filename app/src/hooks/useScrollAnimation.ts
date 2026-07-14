import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      // fadeUp animation
      gsap.utils.toArray<HTMLElement>('[data-animate="fadeUp"]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        })
      })

      // fadeIn animation
      gsap.utils.toArray<HTMLElement>('[data-animate="fadeIn"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        })
      })

      // scaleIn animation
      gsap.utils.toArray<HTMLElement>('[data-animate="scaleIn"]').forEach((el) => {
        gsap.from(el, {
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        })
      })

      // staggerFadeUp
      gsap.utils.toArray<HTMLElement>('[data-animate="staggerFadeUp"]').forEach((parent) => {
        gsap.from(parent.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: parent,
            start: 'top 85%',
          },
        })
      })
    }, ref)

    const refreshScrollTrigger = () => ScrollTrigger.refresh()
    window.addEventListener('load', refreshScrollTrigger)

    document.fonts.ready.then(refreshScrollTrigger)

    return () => {
    ctx.revert()
    window.removeEventListener('load', refreshScrollTrigger)
    }
  }, [])

  return ref
}

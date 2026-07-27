import { useEffect, useRef } from 'react'

const ANIMATE_SELECTOR = '[data-animate]'
const PROCESSED_ATTR = 'data-observed'
const REVEALED_CLASS = 'is-revealed'
const STAGGER_STEP_MS = 90

// Reveal [data-animate] elements saat masuk viewport pakai IntersectionObserver
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const container = ref.current

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add(REVEALED_CLASS)
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )

    const observeElement = (el: HTMLElement) => {
      el.setAttribute(PROCESSED_ATTR, 'true')

      if (el.getAttribute('data-animate') === 'staggerFadeUp') {
        Array.from(el.children).forEach((child, i) => {
          ;(child as HTMLElement).style.transitionDelay = `${i * STAGGER_STEP_MS}ms`
        })
      }

      io.observe(el)
    }

    const scan = () => {
      container
        .querySelectorAll<HTMLElement>(`${ANIMATE_SELECTOR}:not([${PROCESSED_ATTR}])`)
        .forEach(observeElement)
    }
    scan()

    // Elemen yang muncul belakangan (dari fetch async) ikut ke-observe juga
    const mutationObserver = new MutationObserver(scan)
    mutationObserver.observe(container, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return ref
}

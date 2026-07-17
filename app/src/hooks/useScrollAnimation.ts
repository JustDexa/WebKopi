import { useEffect, useRef } from 'react'

const ANIMATE_SELECTOR = '[data-animate]'
const PROCESSED_ATTR = 'data-observed'
const REVEALED_CLASS = 'is-revealed'
const STAGGER_STEP_MS = 90

// Reveals [data-animate] elements as they scroll into view using
// IntersectionObserver — a browser-native API that reacts to an element's
// *actual current* position every time the browser recalculates layout.
// This intentionally avoids libraries that cache a pixel position once and
// require manual "refresh" calls to stay correct (e.g. GSAP ScrollTrigger),
// which is what caused sections to stay stuck invisible until a hard reload
// whenever an image, font, or async-fetched card shifted the page's layout
// after that one-time measurement.
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

    // Content that arrives after an async fetch (Produk/Kebun/Galeri, etc.)
    // renders into the DOM after this effect already ran once — this picks
    // those elements up and starts observing them too.
    const mutationObserver = new MutationObserver(scan)
    mutationObserver.observe(container, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return ref
}

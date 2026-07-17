import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Navigation from './Navigation'
import Footer from './Footer'
import WhatsAppFloatingButton from './WhatsAppFloatingButton'

// Single source of truth for the page frame (fixes audit A1).
// Any future global element (promo banner, cookie notice, etc.) only
// needs to be added here once instead of in every page file.
export default function Layout() {
  const { pathname } = useLocation()

  // React Router's client-side navigation does NOT reset scroll position
  // like a normal browser page load does. Doing it here once, centrally,
  // means every page always opens at the top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  )
}

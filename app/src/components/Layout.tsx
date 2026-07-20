import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Navigation from './Navigation'
import Footer from './Footer'
import WhatsAppFloatingButton from './WhatsAppFloatingButton'

export default function Layout() {
  const { pathname } = useLocation()
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

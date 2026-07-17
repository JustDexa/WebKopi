import { MessageCircle } from 'lucide-react'
import { getWhatsAppContactLink } from '@/lib/whatsapp'

// Persistent, low-friction path to the site's core business goal.
// Purely additive — does not touch the cart checkout flow or WA link logic.
export default function WhatsAppFloatingButton() {
  return (
    <a
      href={getWhatsAppContactLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lifted transition-all duration-300 hover:w-[188px] hover:rounded-2xl active:scale-95"
    >
      <span className="flex items-center gap-2.5 overflow-hidden px-4">
        <MessageCircle size={24} className="shrink-0" fill="currentColor" strokeWidth={0} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[120px] group-hover:opacity-100">
          Chat WhatsApp
        </span>
      </span>
    </a>
  )
}

import type { CartItem } from '../context/CartContext'

const WHATSAPP_NUMBER = '6282323821220'

export function generateWhatsAppLink(items: CartItem[], note: string): string {
  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.productName} ${item.size} x${item.quantity} - Rp${(item.price * item.quantity).toLocaleString('id-ID')}`
  )


  let message = `Permisi, saya ingin memesan:\n\n${lines.join('\n')}\n\nTerimakasih`

  if (note.trim()) {
    message += `\n\nCatatan: ${note.trim()}`
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function getWhatsAppContactLink(presetMessage?: string): string {
  const text = presetMessage ?? 'Halo, saya ingin bertanya tentang Kopi Tjap Mangir.'
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

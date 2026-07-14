import { useState } from 'react'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { generateWhatsAppLink } from '../lib/whatsapp'

interface CartPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartPanel({ isOpen, onClose }: CartPanelProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [note, setNote] = useState('')

  const handleCheckout = () => {
    if (items.length === 0) return
    const link = generateWhatsAppLink(items, note)
    window.open(link, '_blank')
  }

  return (
    <>
      {/* Overlay Gelap (Backdrop) dengan Animasi Fade */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[70] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose} 
      />

      {/* Panel Keranjang dengan Animasi Slide dari Kanan */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[80] flex flex-col shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#E8DFD5]">
          <h2 className="font-['Playfair_Display'] text-[22px] font-bold text-[#5C3D2E]">
            Keranjang Pesanan
          </h2>
          <button 
            onClick={onClose}
            aria-label="Tutup keranjang"
            className="p-2 hover:bg-[#F7F3EE] rounded-full transition-colors"
          >
            <X size={22} className="text-[#5C3D2E]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-[#6B5B4F] mt-10">Keranjang masih kosong.</p>
          ) : (
            items.map((item) => (
              <div key={item.cartItemId} className="flex justify-between items-start border-b border-[#F0EBE3] pb-4">
                <div>
                  <p className="font-semibold text-[#2C1810]">{item.productName}</p>
                  <p className="text-sm text-[#6B5B4F]">{item.size}</p>
                  <p className="text-sm font-medium text-[#5C3D2E]">
                    Rp{item.price.toLocaleString('id-ID')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      aria-label={`Kurangi jumlah ${item.productName}`}
                      className="w-6 h-6 flex items-center justify-center border border-[#E8DFD5] rounded hover:bg-[#F7F3EE] transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      aria-label={`Tambah jumlah ${item.productName}`}
                      className="w-6 h-6 flex items-center justify-center border border-[#E8DFD5] rounded hover:bg-[#F7F3EE] transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item.cartItemId)}
                  aria-label={`Hapus ${item.productName} dari keranjang`}
                  className="p-1.5 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[#E8DFD5] space-y-4 bg-[#FCFAF8]">
            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-2">
                Catatan (opsional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="Contoh: tolong roast medium"
                className="w-full border border-[#E8DFD5] rounded-md px-3 py-2 text-sm outline-none focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] transition-all"
              />
            </div>

            <div className="flex justify-between font-bold text-[18px] text-[#2C1810]">
              <span>Total</span>
              <span>Rp{totalPrice.toLocaleString('id-ID')}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#1b9a49] text-white py-3.5 rounded-xl font-bold hover:bg-[#1ebe5a] shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all"
            >
              Pesan via WhatsApp
            </button>
            <button
              onClick={clearCart}
              className="w-full text-sm font-medium text-[#7A6A5E] hover:text-red-600 transition-colors"
            >
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>
    </>
  )
}
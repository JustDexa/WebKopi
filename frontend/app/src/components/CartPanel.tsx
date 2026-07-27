import { useState } from 'react'
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useCart } from '../context/CartContext'
import { generateWhatsAppLink } from '../lib/whatsapp'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface CartPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartPanel({ isOpen, onClose }: CartPanelProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [note, setNote] = useState('')
  const [confirmClearOpen, setConfirmClearOpen] = useState(false)

  const handleCheckout = () => {
    if (items.length === 0) return
    const link = generateWhatsAppLink(items, note)
    window.open(link, '_blank')
    clearCart()
    setNote('')
    toast.success('Pesanan dikirim ke WhatsApp, keranjang telah dikosongkan.')
    onClose()
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-primary/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 z-[80] flex h-full w-full max-w-[440px] transform flex-col bg-card shadow-lifted transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-7 py-6">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-accent" strokeWidth={1.8} />
            <h2 className="font-serif text-heading-3 font-bold text-primary">Keranjang Pesanan</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup keranjang"
            className="rounded-full p-2 text-primary/70 transition-colors hover:bg-secondary hover:text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <ShoppingBag size={26} className="text-muted-foreground" strokeWidth={1.5} />
              </div>
              <p className="text-body text-muted-foreground">Keranjang masih kosong.</p>
              <p className="mt-1 text-small text-muted-foreground/70">Yuk, pilih kopi favoritmu.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-background/60 p-4 animate-fade-in"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-foreground">{item.productName}</p>
                    <p className="text-small text-muted-foreground">{item.size}</p>
                    <p className="mt-1 text-small font-semibold text-primary">
                      Rp{item.price.toLocaleString('id-ID')}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        aria-label={`Kurangi jumlah ${item.productName}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-secondary"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-small font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        aria-label={`Tambah jumlah ${item.productName}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-secondary"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      removeItem(item.cartItemId)
                      toast('Item dihapus dari keranjang')
                    }}
                    aria-label={`Hapus ${item.productName} dari keranjang`}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-4 border-t border-border bg-secondary/40 px-7 py-6">
            <div>
              <label className="mb-2 block text-small font-medium text-foreground">
                Catatan (opsional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="Contoh: tolong roast medium"
                className="w-full resize-none rounded-2xl border border-border bg-card px-4 py-3 text-small outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-body font-semibold text-foreground">Total</span>
              <span className="font-serif text-heading-3 font-bold text-primary">
                Rp{totalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-whatsapp py-4 text-[15px] font-bold text-whatsapp-foreground shadow-card transition-all hover:brightness-105 active:scale-[0.98]"
            >
              <MessageCircle size={19} fill="currentColor" strokeWidth={0} />
              Pesan via WhatsApp
            </button>
            <button
              onClick={() => setConfirmClearOpen(true)}
              className="w-full text-small font-medium text-muted-foreground transition-colors hover:text-destructive"
            >
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>

      <AlertDialog open={confirmClearOpen} onOpenChange={setConfirmClearOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kosongkan keranjang?</AlertDialogTitle>
            <AlertDialogDescription>
              Semua item yang sudah kamu pilih akan dihapus dan tidak bisa dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clearCart()
                toast('Keranjang dikosongkan')
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Ya, Kosongkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

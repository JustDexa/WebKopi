import { useState, useEffect } from 'react'
import { X, Plus, Minus, Check } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/types'
import { useCart } from '@/context/CartContext'

interface ProductDetailSheetProps {
  product: Product | null
  onClose: () => void
}

// Closes audit gap C1: a real "detail produk" view (full description, process,
// stock-aware variant picker) — additive only, doesn't touch routing or the
// add-to-cart business logic, which stays identical to the card flow.
export default function ProductDetailSheet({ product, onClose }: ProductDetailSheetProps) {
  const { addItem } = useCart()
  const [variantId, setVariantId] = useState<string>('')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (product) {
      setVariantId('')
      setQty(1)
    }
  }, [product])

  if (!product) return null

  const variant = product.product_variants.find((v) => v.id === variantId)
  const minPrice = Math.min(...product.product_variants.map((v) => v.price))

  const handleAdd = () => {
    if (!variant) {
      toast.error('Pilih ukuran dulu ya')
      return
    }
    for (let i = 0; i < qty; i++) {
      addItem({
        productId: product.id,
        productName: product.name,
        variantId: variant.id,
        size: variant.size,
        price: variant.price,
      })
    }
    toast.success(`${product.name} ditambahkan ke keranjang`, {
      description: `${variant.size} × ${qty}`,
    })
    onClose()
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[70] bg-primary/40 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-[80] max-h-[92vh] overflow-y-auto rounded-t-[28px] bg-card shadow-lifted animate-fade-up md:inset-y-0 md:inset-x-auto md:right-0 md:max-h-none md:h-full md:w-full md:max-w-[560px] md:rounded-t-none">
        <button
          onClick={onClose}
          aria-label="Tutup detail produk"
          className="sticky top-4 z-10 float-right mr-4 mt-4 rounded-full bg-card/90 p-2.5 text-primary shadow-soft backdrop-blur-sm transition-colors hover:bg-secondary"
        >
          <X size={19} />
        </button>

        <div className="relative h-[260px] w-full overflow-hidden md:h-[320px]">
          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
          {product.category && (
            <span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-accent shadow-sm">
              {product.category}
            </span>
          )}
        </div>

        <div className="px-7 py-8 md:px-8">
          <h2 className="font-serif text-heading-2 font-bold text-primary">{product.name}</h2>
          <p className="mt-2 text-body-lg font-semibold text-accent">
            Mulai dari Rp{minPrice.toLocaleString('id-ID')}
          </p>
          <p className="mt-4 text-body leading-relaxed text-foreground/80">{product.description}</p>

          {/* Variant picker */}
          <div className="mt-8">
            <p className="text-caption text-muted-foreground">Pilih Ukuran</p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {product.product_variants.map((v) => {
                const outOfStock = v.stock <= 0
                const selected = v.id === variantId
                return (
                  <button
                    key={v.id}
                    disabled={outOfStock}
                    onClick={() => setVariantId(v.id)}
                    className={`relative rounded-2xl border p-3.5 text-left transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                      selected
                        ? 'border-accent bg-accent/10 ring-1 ring-accent'
                        : 'border-border bg-background hover:border-accent/50'
                    }`}
                  >
                    {selected && (
                      <span className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <Check size={10} strokeWidth={3} />
                      </span>
                    )}
                    <p className="text-[14px] font-semibold text-foreground">{v.size}</p>
                    <p className="mt-0.5 text-[13px] text-muted-foreground">Rp{v.price.toLocaleString('id-ID')}</p>
                    <p className={`mt-1 text-[11px] font-medium ${outOfStock ? 'text-destructive' : v.stock <= 5 ? 'text-gold' : 'text-muted-foreground/60'}`}>
                      {outOfStock ? 'Stok habis' : v.stock <= 5 ? `Stok terbatas: ${v.stock}` : 'Stok tersedia'}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <p className="text-caption text-muted-foreground">Jumlah</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border transition-colors hover:bg-secondary"
                aria-label="Kurangi jumlah"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border transition-colors hover:bg-secondary"
                aria-label="Tambah jumlah"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="mt-8 w-full rounded-2xl bg-accent py-4 text-[14px] font-bold uppercase tracking-widest text-accent-foreground shadow-card transition-all hover:brightness-105 active:scale-[0.98]"
          >
            Tambah ke Keranjang
          </button>

          {/* Process storytelling — sekarang diatur per-produk lewat Admin > Produk,
              bukan hardcode. Section disembunyikan kalau admin belum mengisi langkahnya. */}
          {product.process_steps && product.process_steps.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <p className="text-caption text-muted-foreground">Proses Pengolahan</p>
              <div className="mt-5 space-y-4">
                {product.process_steps.map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary font-serif text-[13px] font-bold text-primary-foreground">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{s.title}</p>
                      <p className="text-small text-muted-foreground">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import PageHero from '../components/PageHero'
import ProductDetailSheet from '../components/ProductDetailSheet'
import { Skeleton } from '../components/ui/skeleton'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { supabase } from '../lib/supabase'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types'

export default function Produk() {
  const contentRef = useScrollAnimation()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({})

  const handleAddToCart = (product: Product) => {
    const variantId = selectedVariant[product.id]
    const variant = product.product_variants.find((v) => v.id === variantId)

    if (!variant) {
      toast.error('Pilih ukuran dulu ya')
      return
    }

    addItem({
      productId: product.id,
      productName: product.name,
      variantId: variant.id,
      size: variant.size,
      price: variant.price,
    })
    toast.success(`${product.name} ditambahkan ke keranjang`, {
      description: variant.size,
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .order('created_at', { ascending: false })

      if (!error && data) setProducts(data)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const processSteps = [
    { num: '1', title: 'Sortasi & Pulping', desc: 'Pemilahan dan pengupasan kulit buah kopi.' },
    { num: '2', title: 'Fermentasi & Cuci', desc: 'Proses fermentasi dan pencucian biji kopi.' },
    { num: '3', title: 'Pengeringan', desc: 'Pengeringan di para-para hingga kadar air ideal.' },
    { num: '4', title: 'Roasting', desc: 'Pemanggangan biji kopi di Mangir Roastery.' },
  ]

  return (
    <div>
      <PageHero
        bgImage="/assets/biji-kopi.webp"
        breadcrumb="Produk"
        title="Produk Kopi Tjap Mangir"
        subtitle="Arabica, Robusta, dan Liberika — Green Bean & Roasted Bean"
      />

      <div ref={contentRef}>
        {/* Overview */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-[720px] px-6 text-center" data-animate="fadeUp">
            <p className="text-caption text-accent">Produk Kami</p>
            <h2 className="mt-4 font-serif text-heading-1 font-bold leading-tight text-primary">
              Tiga Jenis Kopi, Satu Kualitas
            </h2>
            <p className="mt-5 text-body-lg leading-relaxed text-foreground/80">
              Kopi Tjap Mangir mengembangkan tiga jenis kopi — Arabica, Robusta, dan Liberika. Masing-masing memiliki karakter rasa unik dan diproses menjadi green bean maupun roasted bean untuk memenuhi kebutuhan pasar yang beragam.
            </p>
          </div>
        </section>

        {/* Product Cards */}
        <section className="bg-secondary/40 pb-24 pt-4">
          <div className="container-brand">
            {loading ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-3xl border border-border bg-card">
                    <Skeleton className="h-[280px] w-full rounded-none" />
                    <div className="space-y-3 p-7">
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="mt-4 h-11 w-full rounded-xl" />
                      <Skeleton className="h-11 w-full rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-body-lg text-muted-foreground">Belum ada koleksi kopi saat ini.</p>
              </div>
            ) : (
              <div data-animate="staggerFadeUp" className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
                {products.map((p) => {
                  const minPrice = Math.min(...p.product_variants.map((v) => v.price))
                  const selected = p.product_variants.find((v) => v.id === selectedVariant[p.id])
                  return (
                    <div
                      key={p.id}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lifted"
                    >
                      <button
                        onClick={() => setActiveProduct(p)}
                        className="relative h-[280px] overflow-hidden bg-secondary text-left"
                      >
                        <img
                          src={p.image_url}
                          alt={`Biji kopi ${p.name}`}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        {p.category && (
                          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-accent shadow-sm">
                            {p.category}
                          </span>
                        )}
                        <span className="absolute inset-x-4 bottom-4 translate-y-2 rounded-full bg-primary/90 py-2 text-center text-[12px] font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          Lihat Detail
                        </span>
                      </button>

                      <div className="flex flex-1 flex-col p-7">
                        <div className="flex-1">
                          <h3 className="font-serif text-heading-3 font-bold leading-tight text-primary transition-colors group-hover:text-accent">
                            {p.name}
                          </h3>
                          <p className="mt-2 text-[15px] font-semibold text-accent">
                            Mulai dari Rp{minPrice.toLocaleString('id-ID')}
                          </p>
                          <p className="mt-3 line-clamp-2 text-small leading-relaxed text-muted-foreground">
                            {p.description}
                          </p>
                        </div>

                        <div className="mt-6 border-t border-border pt-5">
                          <div className="flex flex-wrap gap-2">
                            {p.product_variants.map((v) => {
                              const outOfStock = v.stock <= 0
                              const isSelected = selectedVariant[p.id] === v.id
                              return (
                                <button
                                  key={v.id}
                                  disabled={outOfStock}
                                  onClick={() => setSelectedVariant({ ...selectedVariant, [p.id]: v.id })}
                                  className={`rounded-xl border px-3.5 py-2 text-[12.5px] font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                                    isSelected
                                      ? 'border-accent bg-accent/10 text-accent'
                                      : 'border-border text-foreground/70 hover:border-accent/50'
                                  }`}
                                >
                                  {v.size}
                                </button>
                              )
                            })}
                          </div>
                          {selected && (
                            <p className={`mt-2 text-[11.5px] font-medium ${selected.stock <= 5 ? 'text-gold' : 'text-muted-foreground'}`}>
                              {selected.stock <= 5 ? `Stok terbatas: ${selected.stock}` : `Stok tersedia \u00b7 Rp${selected.price.toLocaleString('id-ID')}`}
                            </p>
                          )}
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="mt-4 w-full rounded-xl bg-accent py-3.5 text-[13px] font-bold uppercase tracking-widest text-accent-foreground transition-all duration-300 hover:brightness-105 active:scale-[0.98]"
                          >
                            Tambah ke Keranjang
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Pengolahan */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-[1000px] px-6">
            <div className="mb-14 text-center" data-animate="fadeUp">
              <p className="text-caption text-accent">Pengolahan</p>
              <h2 className="mt-4 font-serif text-heading-1 font-bold text-primary">
                Dari Biji Kopi Sampai Siap Dinikmati
              </h2>
            </div>

            <div data-animate="staggerFadeUp" className="relative flex flex-col items-start justify-between gap-8 md:flex-row">
              <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-[2px] border-t-2 border-dashed border-border md:block" />

              {processSteps.map((s) => (
                <div key={s.num} className="relative z-10 flex flex-1 flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-serif text-[18px] font-bold text-primary-foreground">
                    {s.num}
                  </div>
                  <h3 className="mt-4 font-serif text-heading-3 font-semibold text-primary">{s.title}</h3>
                  <p className="mt-2 max-w-[200px] text-small leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ProductDetailSheet product={activeProduct} onClose={() => setActiveProduct(null)} />
    </div>
  )
}

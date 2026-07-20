import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import BackButton from '@/components/ui/BackButton'
import type { Testimonial } from '@/types'

const emptyForm = { name: '', role: '', quote: '', rating: '5' }

export default function TestimoniAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null)

  const fetchTestimonials = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('urutan_tampil', { ascending: true })

    if (!error && data) setTestimonials(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id)
    setForm({ name: t.name, role: t.role, quote: t.quote, rating: String(t.rating) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(emptyForm)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      if (editingId) {
        const { error: updateError } = await supabase
          .from('testimonials')
          .update({
            name: form.name,
            role: form.role,
            quote: form.quote,
            rating: parseInt(form.rating) || 5,
          })
          .eq('id', editingId)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from('testimonials').insert({
          name: form.name,
          role: form.role,
          quote: form.quote,
          rating: parseInt(form.rating) || 5,
          urutan_tampil: testimonials.length,
        })
        if (insertError) throw insertError
      }

      cancelEdit()
      fetchTestimonials()
    } catch (err) {
      console.error(err)
      setError('Gagal menyimpan testimoni. Coba lagi.')
    } finally {
      setSaving(false)
    }
  }

  const executeDelete = async () => {
    if (!deleteModalId) return
    await supabase.from('testimonials').delete().eq('id', deleteModalId)
    setDeleteModalId(null)
    if (editingId === deleteModalId) cancelEdit()
    fetchTestimonials()
  }

  const inputClass =
    'w-full bg-white border border-[#E1D7CE] text-[#3A261D] rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#5C3D2E]/20 focus:border-[#5C3D2E] transition-all placeholder:text-[#A99A8E]'
  const labelClass = 'block text-sm font-semibold text-[#5C3D2E] mb-2'

  return (
    <div className="min-h-screen bg-[#FCFAF8] p-6 md:p-12 relative">
      {/* Modal Konfirmasi Hapus */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-7 shadow-2xl max-w-sm w-full transform transition-all scale-100">
            <h3 className="text-xl font-bold text-[#3A261D] mb-2">Hapus Testimoni?</h3>
            <p className="text-[#7A6A5E] text-sm mb-6">
              Tindakan ini tidak bisa dibatalkan. Testimoni akan dihapus permanen dari halaman Beranda.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#7A6A5E] bg-[#F7F3EE] hover:bg-[#E8DFD5] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={executeDelete}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/20 transition-all"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto">
        <BackButton />

        <header className="mb-10">
          <h1 className="font-['Playfair_Display'] text-[36px] font-bold text-[#3A261D]">
            Kelola Testimoni
          </h1>
          <p className="text-[#7A6A5E] mt-2">
            Testimoni yang ditambahkan di sini otomatis tampil di section "Dipercaya Penikmat Kopi" pada halaman Beranda.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sisi Kiri: Form Tambah/Edit */}
          <div className="lg:col-span-4">
            <div className="bg-white p-7 rounded-2xl shadow-[0_8px_30px_rgba(44,24,16,0.04)] border border-[#F0EAE1] sticky top-8">
              <h2 className="text-lg font-bold text-[#3A261D] mb-5">
                {editingId ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={labelClass}>Nama Pelanggan</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    placeholder="Contoh: Dimas A."
                  />
                </div>

                <div>
                  <label className={labelClass}>Keterangan</label>
                  <input
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className={inputClass}
                    placeholder="Contoh: Pelanggan Arabica Bukit Mangir"
                  />
                </div>

                <div>
                  <label className={labelClass}>Isi Testimoni</label>
                  <textarea
                    required
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
                    rows={4}
                    className={inputClass}
                    placeholder="Tulis ulasan pelanggan di sini..."
                  />
                </div>

                <div>
                  <label className={labelClass}>Rating</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    className={inputClass}
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {'\u2605'.repeat(r)}{'\u2606'.repeat(5 - r)} ({r})
                      </option>
                    ))}
                  </select>
                </div>

                {error && <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">{error}</p>}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-[#3A261D] text-white text-[13px] font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-[#4A7C59] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {saving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Testimoni'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-5 py-3.5 rounded-xl text-sm font-medium text-[#7A6A5E] bg-[#F7F3EE] hover:bg-[#E8DFD5] transition-colors"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sisi Kanan: Daftar Testimoni */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="flex justify-center items-center h-60">
                <p className="text-[#6B5B4F] font-medium animate-pulse">Memuat testimoni...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="bg-white border border-dashed border-[#E1D7CE] rounded-2xl p-12 text-center">
                <p className="text-[#7A6A5E]">Belum ada testimoni. Tambahkan lewat form di samping.</p>
              </div>
            ) : (
              <div className="grid gap-5">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(44,24,16,0.03)] border border-[#F0EAE1] hover:shadow-[0_8px_30px_rgba(44,24,16,0.06)] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-[#C89B5C] text-sm mb-2">
                          {'\u2605'.repeat(t.rating)}{'\u2606'.repeat(5 - t.rating)}
                        </div>
                        <p className="text-[#3A261D] text-[15px] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                        <div className="mt-3 pt-3 border-t border-[#F0EAE1]">
                          <p className="font-semibold text-[#3A261D] text-sm">{t.name}</p>
                          {t.role && <p className="text-[#7A6A5E] text-xs">{t.role}</p>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => startEdit(t)}
                          className="px-4 py-2 text-sm font-medium text-[#4A7C59] bg-[#EAF2ED] hover:bg-[#D5E5DB] rounded-xl transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteModalId(t.id)}
                          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

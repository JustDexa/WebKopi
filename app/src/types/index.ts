export interface Variant {
  id: string
  size: string
  price: number
  stock: number
}

export interface Product {
  id: string
  name: string
  description: string
  category: string
  image_url: string
  product_variants: Variant[]
}

export interface KebunInfo {
  id: string
  nama_lokasi: string
  title: string
  description_1: string
  description_2: string
  luas_lahan: string
  jenis_kopi_count: number
  masa_budidaya: string
  description_bawah: string
  image_url: string
  urutan_tampil: number
}

export interface GalleryDisplayItem {
  id: string
  image_url: string
  caption: string
}

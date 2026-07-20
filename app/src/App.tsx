import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Tentang from './pages/Tentang'
import Kebun from './pages/Kebun'
import Produk from './pages/Produk'
import Roastery from './pages/Roastery'
import Cafe from './pages/Cafe'
import Galeri from './pages/Galeri'
import Kontak from './pages/Kontak'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ProdukAdmin from './pages/admin/ProdukAdmin'
import ProdukForm from './pages/admin/ProdukForm'
import ProdukEdit from './pages/admin/ProdukEdit'
import KebunAdmin from './pages/admin/KebunAdmin'
import KebunForm from './pages/admin/KebunForm'
import GaleriAdmin from './pages/admin/GaleriAdmin'
import KebunGaleriAdmin from './pages/admin/KebunGaleriAdmin'
import TestimoniAdmin from './pages/admin/TestimoniAdmin'


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/kebun" element={<Kebun />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/roastery" element={<Roastery />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/kontak" element={<Kontak />} />
      </Route>

      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/produk" element={<ProtectedRoute><ProdukAdmin /></ProtectedRoute>} />
      <Route path="/admin/produk/tambah" element={<ProtectedRoute><ProdukForm /></ProtectedRoute>} />
      <Route path="/admin/produk/edit/:id" element={<ProtectedRoute><ProdukEdit /></ProtectedRoute>} />
      <Route path="/admin/kebun" element={<ProtectedRoute><KebunAdmin /></ProtectedRoute>} />
      <Route path="/admin/kebun/tambah" element={<ProtectedRoute><KebunForm /></ProtectedRoute>} />
      <Route path="/admin/kebun/edit/:id" element={<ProtectedRoute><KebunForm /></ProtectedRoute>} />
      <Route path="/admin/galeri" element={<ProtectedRoute><GaleriAdmin /></ProtectedRoute>} />
      <Route path="/admin/kebun-galeri" element={<ProtectedRoute><KebunGaleriAdmin /></ProtectedRoute>} />
      <Route path="/admin/testimoni" element={<ProtectedRoute><TestimoniAdmin /></ProtectedRoute>} />
    </Routes>
  )
}

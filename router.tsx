import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Pendaftaran from './pages/Pendaftaran';
import Agenda from './pages/Agenda';
import Login from './pages/Login';
import SantriDashboard from './pages/SantriDashboard';
import WaliDashboard from './pages/WaliDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import TagihanSantri from './pages/santri/TagihanSantri';
import NilaiSantri from './pages/santri/NilaiSantri';
import SuratIzinSantri from './pages/santri/SuratIzinSantri';
import ProfilSantri from './pages/santri/ProfilSantri';
import DokumenSantri from './pages/santri/DokumenSantri';
import TagihanAdmin from './pages/admin/TagihanAdmin';
import NilaiAdmin from './pages/admin/NilaiAdmin';
import SuratAdmin from './pages/admin/SuratAdmin';
import ProfilAdmin from './pages/admin/ProfilAdmin';
import DokumenAdmin from './pages/admin/DokumenAdmin';
import PengaturanAdmin from './pages/admin/PengaturanAdmin';
import TagihanWali from './pages/wali/TagihanWali';
import NilaiWali from './pages/wali/NilaiWali';
import AgendaWali from './pages/wali/AgendaWali';
import ProfilWali from './pages/wali/ProfilWali';
import DokumenWali from './pages/wali/DokumenWali';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/pendaftaran" element={<Pendaftaran />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/login" element={<Login />} />
      
      {/* Santri Routes */}
      <Route path="/dashboard/santri" element={<ProtectedRoute allowedRoles={['santri']}><DashboardLayout role="santri" /></ProtectedRoute>}>
        <Route index element={<SantriDashboard />} />
        <Route path="tagihan" element={<TagihanSantri />} />
        <Route path="nilai" element={<NilaiSantri />} />
        <Route path="surat" element={<SuratIzinSantri />} />
        <Route path="profil" element={<ProfilSantri />} />
        <Route path="dokumen" element={<DokumenSantri />} />
      </Route>
      
      {/* Wali Routes */}
      <Route path="/dashboard/wali" element={<ProtectedRoute allowedRoles={['wali_santri']}><DashboardLayout role="wali" /></ProtectedRoute>}>
        <Route index element={<WaliDashboard />} />
        <Route path="tagihan" element={<TagihanWali />} />
        <Route path="nilai" element={<NilaiWali />} />
        <Route path="agenda" element={<AgendaWali />} />
        <Route path="profil" element={<ProfilWali />} />
        <Route path="dokumen" element={<DokumenWali />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout role="admin" /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="tagihan" element={<TagihanAdmin />} />
        <Route path="nilai" element={<NilaiAdmin />} />
        <Route path="surat" element={<SuratAdmin />} />
        <Route path="profil" element={<ProfilAdmin />} />
        <Route path="dokumen" element={<DokumenAdmin />} />
        <Route path="pengaturan" element={<PengaturanAdmin />} />
      </Route>
      
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

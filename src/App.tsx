import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { testConnection } from './lib/supabase';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import InstitutionsPage from './pages/InstitutionsPage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPages from './pages/admin/AdminPages';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminContent from './pages/admin/AdminContent';
import AdminMedia from './pages/admin/AdminMedia';
import AdminSettings from './pages/admin/AdminSettings';
import AdminBlockEditor from './pages/admin/AdminBlockEditor';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CMSProvider } from './context/CMSContext';

function App() {
  useEffect(() => {
    // Test Supabase connection on app load
    testConnection().then(isConnected => {
      if (!isConnected) {
        console.error('Failed to connect to Supabase. Please check your configuration.');
      }
    });
  }, []);

  return (
    <AuthProvider>
      <CMSProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/blocks" element={
                <ProtectedRoute>
                  <AdminBlockEditor />
                </ProtectedRoute>
              } />
              <Route path="/admin/pages" element={
                <ProtectedRoute>
                  <AdminPages />
                </ProtectedRoute>
              } />
              <Route path="/admin/testimonials" element={
                <ProtectedRoute>
                  <AdminTestimonials />
                </ProtectedRoute>
              } />
              <Route path="/admin/content" element={
                <ProtectedRoute>
                  <AdminContent />
                </ProtectedRoute>
              } />
              <Route path="/admin/media" element={
                <ProtectedRoute>
                  <AdminMedia />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute>
                  <AdminSettings />
                </ProtectedRoute>
              } />
              
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <Header />
                  <HomePage />
                  <Footer />
                </>
              } />
              <Route path="/product" element={
                <>
                  <Header />
                  <ProductPage />
                  <Footer />
                </>
              } />
              <Route path="/institutions" element={
                <>
                  <Header />
                  <InstitutionsPage />
                  <Footer />
                </>
              } />
              <Route path="/about" element={
                <>
                  <Header />
                  <AboutPage />
                  <Footer />
                </>
              } />
              <Route path="/news" element={
                <>
                  <Header />
                  <NewsPage />
                  <Footer />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <Header />
                  <ContactPage />
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </CMSProvider>
    </AuthProvider>
  );
}

export default App;
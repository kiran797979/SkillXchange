@@ .. @@
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import { AnimatePresence } from 'framer-motion';
+import { useState, useEffect } from 'react';
 import LandingPage from './pages/LandingPage';
 import ProfilePage from './pages/ProfilePage';
-import MatchFeed from './pages/MatchFeed';
+import DiscoverPage from './pages/DiscoverPage';
+import SwapsPage from './pages/SwapsPage';
 import Dashboard from './pages/Dashboard';
 import Navbar from './components/Navbar';
+import AuthModal from './components/auth/AuthModal';
+import ProfileSetup from './components/profile/ProfileSetup';
+import { AuthProvider, useAuth } from './contexts/AuthContext';
 import { Toaster } from '@/components/ui/sonner';
 import './App.css';

+const AppContent = () => {
+  const { user, profile, loading } = useAuth();
+  const [showAuthModal, setShowAuthModal] = useState(false);
+  const [showProfileSetup, setShowProfileSetup] = useState(false);
+
+  useEffect(() => {
+    if (user && profile) {
+      // Check if profile needs setup
+      const needsSetup = !profile.full_name || 
+                        !profile.bio || 
+                        !profile.availability?.length;
+      setShowProfileSetup(needsSetup);
+    }
+  }, [user, profile]);
+
+  if (loading) {
+    return (
+      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
+        <div className="text-white text-xl">Loading...</div>
+      </div>
+    );
+  }
+
+  if (showProfileSetup && user && profile) {
+    return <ProfileSetup onComplete={() => setShowProfileSetup(false)} />;
+  }
+
+  return (
+    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
+      <Navbar onAuthClick={() => setShowAuthModal(true)} />
+      <AnimatePresence mode="wait">
+        <Routes>
+          <Route path="/" element={<LandingPage onAuthClick={() => setShowAuthModal(true)} />} />
+          <Route path="/profile" element={user ? <ProfilePage /> : <LandingPage onAuthClick={() => setShowAuthModal(true)} />} />
+          <Route path="/discover" element={user ? <DiscoverPage /> : <LandingPage onAuthClick={() => setShowAuthModal(true)} />} />
+          <Route path="/swaps" element={user ? <SwapsPage /> : <LandingPage onAuthClick={() => setShowAuthModal(true)} />} />
+          <Route path="/dashboard" element={user ? <Dashboard /> : <LandingPage onAuthClick={() => setShowAuthModal(true)} />} />
+        </Routes>
+      </AnimatePresence>
+      <AuthModal 
+        isOpen={showAuthModal} 
+        onClose={() => setShowAuthModal(false)} 
+      />
+      <Toaster />
+    </div>
+  );
+};
+
 function App() {
   return (
-    <Router>
-      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
-        <Navbar />
-        <AnimatePresence mode="wait">
-          <Routes>
-            <Route path="/" element={<LandingPage />} />
-            <Route path="/profile" element={<ProfilePage />} />
-            <Route path="/matches" element={<MatchFeed />} />
-            <Route path="/dashboard" element={<Dashboard />} />
-          </Routes>
-        </AnimatePresence>
-        <Toaster />
-      </div>
-    </Router>
+    <AuthProvider>
+      <Router>
+        <AppContent />
+      </Router>
+    </AuthProvider>
   );
 }
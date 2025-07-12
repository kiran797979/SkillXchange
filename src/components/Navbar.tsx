@@ .. @@
 import { useState } from 'react';
 import { Link, useLocation } from 'react-router-dom';
 import { motion, AnimatePresence } from 'framer-motion';
-import { Bell, Menu, X, User, BarChart3, Heart, Home } from 'lucide-react';
+import { Bell, Menu, X, User, BarChart3, Search, Home, LogOut, Settings } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
+import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
+import { 
+  DropdownMenu,
+  DropdownMenuContent,
+  DropdownMenuItem,
+  DropdownMenuSeparator,
+  DropdownMenuTrigger,
+} from '@/components/ui/dropdown-menu';
+import { useAuth } from '../contexts/AuthContext';

-const Navbar = () => {
+interface NavbarProps {
+  onAuthClick?: () => void;
+}
+
+const Navbar = ({ onAuthClick }: NavbarProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const [notifications, setNotifications] = useState(3);
   const location = useLocation();
+  const { user, profile, signOut } = useAuth();

   const navItems = [
     { path: '/', label: 'Home', icon: Home },
-    { path: '/matches', label: 'Matches', icon: Heart },
+    { path: '/discover', label: 'Discover', icon: Search },
+    { path: '/swaps', label: 'My Swaps', icon: BarChart3 },
     { path: '/profile', label: 'Profile', icon: User },
-    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
   ];

+  const handleSignOut = async () => {
+    try {
+      await signOut();
+    } catch (error) {
+      console.error('Error signing out:', error);
+    }
+  };
+
   return (
     <motion.nav
       initial={{ y: -100 }}
@@ -40,7 +63,7 @@
           {/* Desktop Navigation */}
           <div className="hidden md:flex items-center space-x-8">
-            {navItems.map((item) => {
+            {(user ? navItems : navItems.filter(item => item.path === '/')).map((item) => {
               const Icon = item.icon;
               const isActive = location.pathname === item.path;
               return (
@@ -63,7 +86,7 @@
           </div>

           {/* Notification Bell */}
-          <div className="flex items-center space-x-4">
+          <div className="flex items-center space-x-4">
+            {user && (
             <motion.div
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
@@ -78,6 +101,44 @@
                 </Badge>
               )}
             </motion.div>
+            )}
+
+            {user && profile ? (
+              <DropdownMenu>
+                <DropdownMenuTrigger asChild>
+                  <motion.button
+                    whileHover={{ scale: 1.05 }}
+                    whileTap={{ scale: 0.95 }}
+                    className="flex items-center space-x-2"
+                  >
+                    <Avatar className="w-8 h-8 border-2 border-purple-500/50">
+                      <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
+                      <AvatarFallback className="bg-purple-600 text-white text-sm">
+                        {profile.full_name.split(' ').map(n => n[0]).join('')}
+                      </AvatarFallback>
+                    </Avatar>
+                  </motion.button>
+                </DropdownMenuTrigger>
+                <DropdownMenuContent className="bg-slate-800 border-slate-700 w-48">
+                  <DropdownMenuItem asChild className="text-white hover:bg-slate-700">
+                    <Link to="/profile" className="flex items-center">
+                      <User className="w-4 h-4 mr-2" />
+                      Profile
+                    </Link>
+                  </DropdownMenuItem>
+                  <DropdownMenuItem className="text-white hover:bg-slate-700">
+                    <Settings className="w-4 h-4 mr-2" />
+                    Settings
+                  </DropdownMenuItem>
+                  <DropdownMenuSeparator className="bg-slate-700" />
+                  <DropdownMenuItem onClick={handleSignOut} className="text-red-400 hover:bg-slate-700">
+                    <LogOut className="w-4 h-4 mr-2" />
+                    Sign Out
+                  </DropdownMenuItem>
+                </DropdownMenuContent>
+              </DropdownMenu>
+            ) : (
+              <Button onClick={onAuthClick} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
+                Sign In
+              </Button>
+            )}

             {/* Mobile Menu Button */}
             <div className="md:hidden">
@@ -95,7 +156,7 @@
         {/* Mobile Navigation */}
         <AnimatePresence>
           {isOpen && (
             <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="md:hidden bg-white/10 backdrop-blur-md rounded-lg mt-2 mb-4"
             >
-              {navItems.map((item, index) => {
+              {(user ? navItems : navItems.filter(item => item.path === '/')).map((item, index) => {
                 const Icon = item.icon;
                 const isActive = location.pathname === item.path;
                 return (
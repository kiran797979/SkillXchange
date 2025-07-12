@@ .. @@
 import { Button } from '@/components/ui/button';
 import { ArrowRight, Users, Star, Zap, Shield, Clock, Globe } from 'lucide-react';

-const LandingPage = () => {
+interface LandingPageProps {
+  onAuthClick?: () => void;
+}
+
+const LandingPage = ({ onAuthClick }: LandingPageProps) => {
   const stats = [
@@ .. @@
       <div className="relative z-10">
-        <HeroSection />
+        <HeroSection onAuthClick={onAuthClick} />
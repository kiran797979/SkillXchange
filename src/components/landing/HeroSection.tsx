@@ .. @@
 import { useState, useEffect } from 'react';

-const HeroSection = () => {
+interface HeroSectionProps {
+  onAuthClick?: () => void;
+}
+
+const HeroSection = ({ onAuthClick }: HeroSectionProps) => {
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

@@ .. @@
             >
               <Button
                 size="lg"
+                onClick={onAuthClick}
                 className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl border-0"
               >
                 Start Swapping
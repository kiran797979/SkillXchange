import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Users, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const skillCategories = [
    'Programming', 'Design', 'Languages', 'Music', 'Cooking', 'Photography',
    'Marketing', 'Writing', 'Fitness', 'Art', 'Business', 'Science'
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -0.1,
            y: mousePosition.y * -0.1,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                Welcome to the Future of Learning
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Exchange Skills,
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Grow Together
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl text-white/70 mb-8 max-w-lg leading-relaxed"
          >
            Connect with learners and experts worldwide. Trade your expertise for new skills in our vibrant community marketplace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(147, 51, 234, 0.7)', 
                  '0 0 0 20px rgba(147, 51, 234, 0)',
                  '0 0 0 0 rgba(147, 51, 234, 0.7)'
                ],
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl border-0"
              >
                Start Swapping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full border border-white/20 backdrop-blur-md"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center justify-center lg:justify-start space-x-8"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-5 h-5 text-purple-400 mr-1" />
                <div className="text-2xl font-bold text-white">50K+</div>
              </div>
              <div className="text-white/60 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Award className="w-5 h-5 text-green-400 mr-1" />
                <div className="text-2xl font-bold text-white">100+</div>
              </div>
              <div className="text-white/60 text-sm">Skill Categories</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Sparkles className="w-5 h-5 text-yellow-400 mr-1" />
                <div className="text-2xl font-bold text-white">98%</div>
              </div>
              <div className="text-white/60 text-sm">Success Rate</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Interactive Skill Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center relative"
        >
          <div className="relative w-96 h-96">
            {/* Central Hub */}
            <motion.div
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            />
            
            <div className="absolute inset-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
                className="text-6xl"
              >
                🤝
              </motion.div>
            </div>

            {/* Orbiting Skills */}
            {skillCategories.slice(0, 8).map((skill, index) => {
              const angle = (index * 45) * (Math.PI / 180);
              const radius = 140;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [x, x * 1.2, x],
                    y: [y, y * 1.2, y],
                  }}
                  transition={{ 
                    opacity: { delay: index * 0.2 },
                    scale: { delay: index * 0.2 },
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                  }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                  }}
                >
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 text-white text-sm font-medium whitespace-nowrap cursor-pointer hover:border-purple-500/50 transition-all">
                    {skill}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
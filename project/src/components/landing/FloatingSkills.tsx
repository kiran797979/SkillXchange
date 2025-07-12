import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingSkills = () => {
  const skills = [
    { name: 'React', color: 'from-blue-400 to-blue-600' },
    { name: 'Python', color: 'from-green-400 to-green-600' },
    { name: 'Design', color: 'from-purple-400 to-purple-600' },
    { name: 'Photography', color: 'from-pink-400 to-pink-600' },
    { name: 'Marketing', color: 'from-orange-400 to-orange-600' },
    { name: 'Music', color: 'from-red-400 to-red-600' },
    { name: 'Writing', color: 'from-teal-400 to-teal-600' },
    { name: 'Cooking', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Yoga', color: 'from-indigo-400 to-indigo-600' },
    { name: 'Languages', color: 'from-cyan-400 to-cyan-600' },
    { name: 'Finance', color: 'from-emerald-400 to-emerald-600' },
    { name: 'Art', color: 'from-rose-400 to-rose-600' },
  ];

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const generateRandomPosition = () => ({
    x: Math.random() * (windowSize.width - 100),
    y: Math.random() * (windowSize.height - 50),
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {skills.map((skill, index) => {
        const initialPos = generateRandomPosition();
        return (
          <motion.div
            key={skill.name}
            initial={{ 
              x: initialPos.x, 
              y: initialPos.y,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: [
                initialPos.x,
                initialPos.x + (Math.random() - 0.5) * 200,
                initialPos.x + (Math.random() - 0.5) * 400,
                initialPos.x
              ],
              y: [
                initialPos.y,
                initialPos.y + (Math.random() - 0.5) * 150,
                initialPos.y + (Math.random() - 0.5) * 300,
                initialPos.y
              ],
              opacity: [0, 0.6, 0.8, 0.6, 0],
              scale: [0, 1, 1.1, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
            className={`absolute bg-gradient-to-r ${skill.color} text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 shadow-lg`}
          >
            {skill.name}
          </motion.div>
        );
      })}

      {/* Floating Geometric Shapes */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={`shape-${index}`}
          initial={{ 
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
            opacity: 0
          }}
          animate={{
            x: [
              Math.random() * windowSize.width,
              Math.random() * windowSize.width,
              Math.random() * windowSize.width
            ],
            y: [
              Math.random() * windowSize.height,
              Math.random() * windowSize.height,
              Math.random() * windowSize.height
            ],
            opacity: [0, 0.3, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: index * 2
          }}
          className={`absolute w-8 h-8 ${
            index % 3 === 0 
              ? 'bg-purple-500/30 rounded-full' 
              : index % 3 === 1 
              ? 'bg-pink-500/30 rotate-45' 
              : 'bg-blue-500/30 rounded-lg'
          } backdrop-blur-sm`}
        />
      ))}
    </div>
  );
};

export default FloatingSkills;
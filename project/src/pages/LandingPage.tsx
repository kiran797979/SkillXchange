import { motion } from 'framer-motion';
import HeroSection from '../components/landing/HeroSection';
import FloatingSkills from '../components/landing/FloatingSkills';
import FeaturesSection from '../components/landing/FeaturesSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import CTASection from '../components/landing/CTASection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Star, Zap, Shield, Clock, Globe } from 'lucide-react';

const LandingPage = () => {
  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Skills Exchanged', value: '125K+', icon: Star },
    { label: 'Success Rate', value: '98%', icon: Zap },
    { label: 'Countries', value: '45+', icon: Globe },
  ];

  const benefits = [
    {
      title: 'Learn Anything',
      description: 'From coding to cooking, photography to languages - discover endless learning opportunities',
      icon: '🎓',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Teach & Earn',
      description: 'Share your expertise and earn skill points while helping others grow',
      icon: '💡',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Global Community',
      description: 'Connect with learners and experts from around the world',
      icon: '🌍',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Verified Skills',
      description: 'All skills are verified by our community with ratings and reviews',
      icon: '✅',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingSkills />
      
      <div className="relative z-10">
        <HeroSection />
        
        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Trusted by Thousands Worldwide
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Join our growing community of learners and experts
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center"
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all">
                      <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                        className="text-2xl font-bold text-white mb-1"
                      >
                        {stat.value}
                      </motion.h3>
                      <p className="text-white/70 text-sm">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose SkillXchange?
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                The most trusted platform for skill exchange and learning
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all cursor-pointer h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </div>
  );
};

export default LandingPage;
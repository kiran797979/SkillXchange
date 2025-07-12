import { motion } from 'framer-motion';
import { Shield, Clock, Globe, Zap, Users, Star } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Smart Matching',
      description: 'AI-powered algorithm matches you with the perfect skill partners based on your interests and availability',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      delay: 0.1
    },
    {
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule with integrated calendar and timezone support',
      icon: Clock,
      color: 'from-blue-400 to-cyan-500',
      delay: 0.2
    },
    {
      title: 'Verified Community',
      description: 'All users are verified with ratings and reviews from the community for your safety',
      icon: Shield,
      color: 'from-green-400 to-emerald-500',
      delay: 0.3
    },
    {
      title: 'Global Reach',
      description: 'Connect with learners and experts from over 45 countries worldwide',
      icon: Globe,
      color: 'from-purple-400 to-pink-500',
      delay: 0.4
    },
    {
      title: 'Community Driven',
      description: 'Join a thriving community of passionate learners and skilled professionals',
      icon: Users,
      color: 'from-indigo-400 to-purple-500',
      delay: 0.5
    },
    {
      title: 'Quality Assured',
      description: 'High-quality exchanges with our rating system and feedback mechanism',
      icon: Star,
      color: 'from-pink-400 to-red-500',
      delay: 0.6
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4 relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Powerful features designed to make skill exchange seamless and effective
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all cursor-pointer h-full relative overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors">
                      {feature.description}
                    </p>
                  </div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-20 blur-xl`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
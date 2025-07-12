import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, MessageSquare, TrendingUp, Star } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      label: 'Total Users',
      value: 12543,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
    },
    {
      label: 'Active Swaps',
      value: 847,
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
      change: '+8%',
    },
    {
      label: 'Success Rate',
      value: 94.2,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: '+2%',
      suffix: '%',
    },
    {
      label: 'Avg Rating',
      value: 4.8,
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      change: '+0.1',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <StatCard
            key={stat.label}
            stat={stat}
            Icon={Icon}
            index={index}
          />
        );
      })}
    </div>
  );
};

interface StatCardProps {
  stat: {
    label: string;
    value: number;
    color: string;
    change: string;
    suffix?: string;
  };
  Icon: any;
  index: number;
}

const StatCard = ({ stat, Icon, index }: StatCardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedValue((prev) => {
          const increment = stat.value / 50;
          if (prev + increment >= stat.value) {
            clearInterval(interval);
            return stat.value;
          }
          return prev + increment;
        });
      }, 20);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [stat.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            stat.change.includes('+') 
              ? 'bg-green-500/20 text-green-300' 
              : 'bg-red-500/20 text-red-300'
          }`}
        >
          {stat.change}
        </motion.span>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        <h3 className="text-2xl font-bold text-white mb-1">
          {animatedValue.toFixed(stat.suffix ? 1 : 0)}
          {stat.suffix || ''}
        </h3>
        <p className="text-white/70 text-sm">{stat.label}</p>
      </motion.div>
    </motion.div>
  );
};

export default DashboardStats;
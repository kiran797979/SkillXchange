import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const ActivityChart = () => {
  const data = [
    { name: 'Jan', swaps: 145, users: 89 },
    { name: 'Feb', swaps: 198, users: 112 },
    { name: 'Mar', swaps: 234, users: 134 },
    { name: 'Apr', swaps: 289, users: 156 },
    { name: 'May', swaps: 345, users: 189 },
    { name: 'Jun', swaps: 412, users: 223 },
    { name: 'Jul', swaps: 467, users: 245 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h3 className="text-xl font-semibold text-white mb-2">Activity Overview</h3>
        <p className="text-white/70 text-sm">Monthly swaps and new user registrations</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <Bar 
              dataKey="swaps" 
              fill="url(#swapsGradient)" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="users" 
              fill="url(#usersGradient)" 
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="swapsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
              <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#0891B2" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default ActivityChart;
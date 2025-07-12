import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const RecentSwaps = () => {
  const recentSwaps = [
    {
      id: 1,
      user1: { name: 'Alice Johnson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50' },
      user2: { name: 'Bob Chen', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=50' },
      skill1: 'React',
      skill2: 'Python',
      status: 'completed',
      time: '2 hours ago',
    },
    {
      id: 2,
      user1: { name: 'Sarah Davis', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50' },
      user2: { name: 'Mike Wilson', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=50' },
      skill1: 'Photography',
      skill2: 'Guitar',
      status: 'active',
      time: '5 hours ago',
    },
    {
      id: 3,
      user1: { name: 'Emma Brown', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50' },
      user2: { name: 'Tom Garcia', avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=50' },
      skill1: 'Spanish',
      skill2: 'Cooking',
      status: 'pending',
      time: '1 day ago',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'active':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300';
      case 'active':
        return 'bg-blue-500/20 text-blue-300';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

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
        <h3 className="text-xl font-semibold text-white mb-2">Recent Swaps</h3>
        <p className="text-white/70 text-sm">Latest skill exchange activities</p>
      </motion.div>

      <div className="space-y-4">
        {recentSwaps.map((swap, index) => (
          <motion.div
            key={swap.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <Avatar className="w-8 h-8 border-2 border-purple-500/50">
                    <AvatarImage src={swap.user1.avatar} alt={swap.user1.name} />
                    <AvatarFallback className="bg-purple-600 text-white text-xs">
                      {swap.user1.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="w-8 h-8 border-2 border-blue-500/50">
                    <AvatarImage src={swap.user2.avatar} alt={swap.user2.name} />
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      {swap.user2.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="text-white text-sm font-medium">
                    {swap.user1.name} ↔ {swap.user2.name}
                  </div>
                  <div className="text-white/60 text-xs">{swap.time}</div>
                </div>
              </div>
              
              <Badge className={`${getStatusColor(swap.status)} flex items-center space-x-1`}>
                {getStatusIcon(swap.status)}
                <span className="capitalize">{swap.status}</span>
              </Badge>
            </div>
            
            <div className="flex items-center justify-center text-white/70 text-sm">
              <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                {swap.skill1}
              </span>
              <span className="mx-2">↔</span>
              <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                {swap.skill2}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentSwaps;
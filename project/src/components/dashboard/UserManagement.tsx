import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, MoreVertical, Ban, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50',
      status: 'active',
      swaps: 23,
      rating: 4.8,
      joinDate: '2024-01-15',
      skills: ['React', 'Photography'],
    },
    {
      id: 2,
      name: 'Bob Chen',
      email: 'bob@example.com',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=50',
      status: 'active',
      swaps: 31,
      rating: 4.9,
      joinDate: '2024-02-03',
      skills: ['Python', 'Data Science'],
    },
    {
      id: 3,
      name: 'Sarah Davis',
      email: 'sarah@example.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50',
      status: 'suspended',
      swaps: 12,
      rating: 3.2,
      joinDate: '2024-01-28',
      skills: ['Design', 'Marketing'],
    },
    {
      id: 4,
      name: 'Mike Wilson',
      email: 'mike@example.com',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=50',
      status: 'pending',
      swaps: 0,
      rating: 0,
      joinDate: '2024-03-10',
      skills: ['Guitar', 'Music Theory'],
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-500/20 text-green-300',
      suspended: 'bg-red-500/20 text-red-300',
      pending: 'bg-yellow-500/20 text-yellow-300',
    };
    
    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
        {status === 'suspended' && <XCircle className="w-3 h-3 mr-1" />}
        {status === 'pending' && <Ban className="w-3 h-3 mr-1" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-xl font-semibold text-white">User Management</h3>
            <p className="text-white/70 text-sm">Manage platform users and their activities</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12 border-2 border-purple-500/50">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-purple-600 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="text-white font-medium">{user.name}</h4>
                    <p className="text-white/60 text-sm">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusBadge(user.status)}
                      <span className="text-white/50 text-xs">
                        Joined {new Date(user.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-white font-medium">{user.swaps}</div>
                    <div className="text-white/60 text-xs">Swaps</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-white font-medium">
                      {user.rating > 0 ? user.rating.toFixed(1) : 'N/A'}
                    </div>
                    <div className="text-white/60 text-xs">Rating</div>
                  </div>

                  <div className="flex flex-wrap gap-1 max-w-32">
                    {user.skills.slice(0, 2).map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="border-white/30 text-white/80 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-800 border-slate-700">
                      <DropdownMenuItem className="text-white hover:bg-slate-700">
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-slate-700">
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:bg-slate-700">
                        Suspend User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UserManagement;
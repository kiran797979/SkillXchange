import { motion } from 'framer-motion';
import { Star, MapPin, Award, TrendingUp, Calendar, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface UserProfileCardProps {
  user: {
    name: string;
    location: string;
    avatar: string;
    rating: number;
    completedSwaps: number;
    points: number;
    availability: string[];
    bio: string;
  };
}

const UserProfileCard = ({ user }: UserProfileCardProps) => {
  const progressPercentage = (user.points / 3000) * 100;
  const nextLevel = Math.ceil(user.points / 1000) * 1000;
  const pointsToNext = nextLevel - user.points;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Avatar Section */}
        <div className="text-center mb-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative inline-block"
          >
            <Avatar className="w-24 h-24 mx-auto border-4 border-purple-500/50">
              <AvatarImage 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" 
                alt={user.name} 
                loading="lazy"
              />
              <AvatarFallback className="bg-purple-600 text-white text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20"
            />
            {/* Online Status */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mt-4">{user.name}</h2>
          <div className="flex items-center justify-center text-white/70 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{user.location}</span>
          </div>
        </div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="flex items-center bg-yellow-500/20 rounded-full px-4 py-2">
            <Star className="w-5 h-5 text-yellow-400 mr-2 fill-current" />
            <span className="text-white font-medium text-lg">{user.rating}</span>
            <span className="text-white/60 text-sm ml-1">({user.completedSwaps} reviews)</span>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-all"
          >
            <Award className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{user.completedSwaps}</div>
            <div className="text-xs text-white/70">Completed Swaps</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center bg-white/5 rounded-lg p-4 border border-white/10 hover:border-green-500/30 transition-all"
          >
            <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{user.points}</div>
            <div className="text-xs text-white/70">Skill Points</div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>Progress to Next Level</span>
            <span>{pointsToNext} points to go</span>
          </div>
          <div className="relative">
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-white/10 rounded-full overflow-hidden"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>
          <div className="text-center text-xs text-white/60 mt-1">
            Level {Math.floor(user.points / 1000) + 1}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h3 className="text-white font-medium mb-3 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Availability
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.availability.map((time, index) => (
              <motion.div
                key={time}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge 
                  variant="secondary" 
                  className="bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors"
                >
                  {time}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-white font-medium mb-2">About</h3>
          <p className="text-white/70 text-sm leading-relaxed">{user.bio}</p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              <Calendar className="w-4 h-4 mr-2" />
              Book
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfileCard;
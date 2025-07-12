import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Star, MapPin, Award, Clock, Heart, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface MatchCardProps {
  match: {
    id: number;
    name: string;
    location: string;
    avatar: string;
    skillsOffered: string[];
    skillsWanted: string[];
    matchScore: number;
    rating: number;
    completedSwaps: number;
    bio: string;
    availability: string[];
  };
  isTop: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
}

const MatchCard = ({ match, isTop, onSwipe }: MatchCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-30, 30]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 150;
    
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  const skillColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600', 
    'from-pink-500 to-pink-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
  ];

  // Use a placeholder image from Unsplash
  const avatarUrl = `https://images.unsplash.com/photo-${
    match.id === 1 ? '1507003211169-0a1dd7228f2d' :
    match.id === 2 ? '1438761681033-6461ffad8d80' :
    '1472099645785-5658abf4ff4e'
  }?w=200&h=200&fit=crop&crop=face`;

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, opacity }}
      whileHover={isTop ? { scale: 1.02 } : {}}
      className="w-80 h-[520px] bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 cursor-grab active:cursor-grabbing shadow-2xl relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-cyan-500/5" />
      
      {/* Match Score */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10"
      >
        {match.matchScore}% Match
      </motion.div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Avatar and Basic Info */}
        <div className="text-center mb-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative inline-block"
          >
            <Avatar className="w-20 h-20 mx-auto border-4 border-purple-500/50">
              <AvatarImage src={avatarUrl} alt={match.name} />
              <AvatarFallback className="bg-purple-600 text-white text-xl">
                {match.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {/* Online Status */}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white">
              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1 animate-pulse" />
            </div>
          </motion.div>
          
          <h3 className="text-xl font-bold text-white mt-3">{match.name}</h3>
          <div className="flex items-center justify-center text-white/70 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{match.location}</span>
          </div>
        </div>

        {/* Rating and Stats */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="flex items-center bg-yellow-500/20 rounded-full px-3 py-1">
            <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
            <span className="text-white text-sm font-medium">{match.rating}</span>
          </div>
          <div className="flex items-center bg-purple-500/20 rounded-full px-3 py-1">
            <Award className="w-4 h-4 text-purple-400 mr-1" />
            <span className="text-white text-sm font-medium">{match.completedSwaps}</span>
          </div>
        </div>

        {/* Skills Offered */}
        <div className="mb-4">
          <h4 className="text-white font-medium mb-2 text-sm flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            Offers:
          </h4>
          <div className="flex flex-wrap gap-2">
            {match.skillsOffered.slice(0, 3).map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-r ${skillColors[index % skillColors.length]} text-white px-3 py-1 rounded-full text-xs font-medium`}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-4">
          <h4 className="text-white font-medium mb-2 text-sm flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
            Wants to learn:
          </h4>
          <div className="flex flex-wrap gap-2">
            {match.skillsWanted.slice(0, 2).map((skill, index) => (
              <Badge 
                key={skill}
                variant="outline" 
                className="border-white/30 text-white/80 text-xs hover:bg-white/10 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="flex-1 mb-4">
          <p className="text-white/70 text-sm leading-relaxed line-clamp-3">{match.bio}</p>
        </div>

        {/* Availability */}
        <div className="flex items-center text-white/60 text-sm mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span>{match.availability.join(', ')}</span>
        </div>

        {/* Action Buttons (for non-draggable version) */}
        {!isTop && (
          <div className="flex gap-4 mt-auto">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSwipe('left')}
              className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-full py-3 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-red-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSwipe('right')}
              className="flex-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-full py-3 flex items-center justify-center transition-colors"
            >
              <Heart className="w-5 h-5 text-green-400" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Swipe Indicators */}
      <motion.div
        style={{ opacity: useTransform(x, [0, 150], [0, 1]) }}
        className="absolute inset-0 bg-green-500/20 rounded-3xl flex items-center justify-center pointer-events-none"
      >
        <div className="text-green-400 text-4xl font-bold">MATCH!</div>
      </motion.div>

      <motion.div
        style={{ opacity: useTransform(x, [-150, 0], [1, 0]) }}
        className="absolute inset-0 bg-red-500/20 rounded-3xl flex items-center justify-center pointer-events-none"
      >
        <div className="text-red-400 text-4xl font-bold">PASS</div>
      </motion.div>
    </motion.div>
  );
};

export default MatchCard;
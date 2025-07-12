import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MatchCard from '../components/matches/MatchCard';
import MatchModal from '../components/matches/MatchModal';
import { Button } from '@/components/ui/button';
import { Filter, Search, Heart, X, RotateCcw, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MatchFeed = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const matches = [
    {
      id: 1,
      name: 'Alex Chen',
      location: 'Seattle, WA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      skillsOffered: ['Python', 'Machine Learning', 'Data Science'],
      skillsWanted: ['React', 'UI/UX Design'],
      matchScore: 95,
      rating: 4.9,
      completedSwaps: 23,
      bio: 'Machine Learning Engineer passionate about AI and data. Love teaching and learning from others. Currently working on computer vision projects.',
      availability: ['Weekends', 'Evenings'],
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      location: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      skillsOffered: ['Spanish', 'Guitar', 'Cooking'],
      skillsWanted: ['Photography', 'React'],
      matchScore: 87,
      rating: 4.8,
      completedSwaps: 31,
      bio: 'Music teacher and chef. I love sharing my culture and learning new technologies. Passionate about creating beautiful experiences.',
      availability: ['Flexible', 'Weekends'],
    },
    {
      id: 3,
      name: 'David Park',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      skillsOffered: ['Photography', 'Video Editing', 'Design'],
      skillsWanted: ['Python', 'Machine Learning'],
      matchScore: 92,
      rating: 4.7,
      completedSwaps: 18,
      bio: 'Creative professional looking to expand into tech. Can teach visual storytelling and advanced photo editing techniques.',
      availability: ['Evenings', 'Weekends'],
    },
    {
      id: 4,
      name: 'Sarah Kim',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      skillsOffered: ['UI/UX Design', 'Figma', 'Product Strategy'],
      skillsWanted: ['JavaScript', 'Node.js'],
      matchScore: 89,
      rating: 4.9,
      completedSwaps: 27,
      bio: 'Senior Product Designer at a tech startup. Love creating user-centered designs and want to learn full-stack development.',
      availability: ['Weekdays', 'Evenings'],
    },
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setSelectedMatch(matches[currentCardIndex]);
      setShowModal(true);
    }
    
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % matches.length);
    }, 300);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedMatch(null);
  };

  const resetStack = () => {
    setCurrentCardIndex(0);
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Find Your Perfect
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Skill Match</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover amazing people ready to share their expertise and learn from you
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 backdrop-blur-md"
            />
          </div>
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 backdrop-blur-md"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button 
            variant="outline" 
            onClick={resetStack}
            className="border-white/20 text-white hover:bg-white/10 backdrop-blur-md"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </motion.div>

        {/* Match Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-white text-sm">
              {currentCardIndex + 1} of {matches.length} matches
            </span>
          </div>
        </motion.div>

        {/* Match Cards Stack */}
        <div className="relative h-[600px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {matches.map((match, index) => {
              if (index < currentCardIndex) return null;
              
              const isTop = index === currentCardIndex;
              const offset = (index - currentCardIndex) * 20;
              const scale = 1 - (index - currentCardIndex) * 0.05;
              const opacity = 1 - (index - currentCardIndex) * 0.3;

              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ 
                    opacity: opacity,
                    scale: scale,
                    y: offset,
                    zIndex: matches.length - index
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute"
                  style={{ zIndex: matches.length - index }}
                >
                  <MatchCard
                    match={match}
                    isTop={isTop}
                    onSwipe={handleSwipe}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* No more cards message */}
          {currentCardIndex >= matches.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">No More Matches!</h3>
                <p className="text-white/70 mb-6">You've seen all available matches. Check back later for new profiles.</p>
                <Button 
                  onClick={resetStack}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          {currentCardIndex < matches.length && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-8">
              <div className="flex space-x-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe('left')}
                  className="w-16 h-16 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center border-2 border-red-500/50 transition-colors backdrop-blur-md"
                >
                  <X className="w-8 h-8 text-red-400" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe('right')}
                  className="w-16 h-16 bg-green-500/20 hover:bg-green-500/30 rounded-full flex items-center justify-center border-2 border-green-500/50 transition-colors backdrop-blur-md"
                >
                  <Heart className="w-8 h-8 text-green-400" />
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Match Modal */}
        <MatchModal
          isOpen={showModal}
          onClose={handleModalClose}
          match={selectedMatch}
        />
      </div>
    </div>
  );
};

export default MatchFeed;
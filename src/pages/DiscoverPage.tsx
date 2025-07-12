import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  findMatches, 
  getSkills, 
  getUserSkillsOffered, 
  getUserSkillsWanted,
  Skill 
} from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import SwapRequestModal from '../components/swaps/SwapRequestModal';

const DiscoverPage = () => {
  const { profile } = useAuth();
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [userSkillsOffered, setUserSkillsOffered] = useState<any[]>([]);
  const [userSkillsWanted, setUserSkillsWanted] = useState<any[]>([]);
  
  // Modal state
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedRequestedSkill, setSelectedRequestedSkill] = useState<any>(null);
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState<any>(null);

  useEffect(() => {
    if (profile) {
      loadData();
    }
  }, [profile]);

  const loadData = async () => {
    if (!profile) return;
    
    try {
      const [matchesData, skillsData, offeredSkills, wantedSkills] = await Promise.all([
        findMatches(profile.id),
        getSkills(),
        getUserSkillsOffered(profile.id),
        getUserSkillsWanted(profile.id)
      ]);
      
      setMatches(matchesData);
      setAllSkills(skillsData);
      setUserSkillsOffered(offeredSkills);
      setUserSkillsWanted(wantedSkills);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = (match: any, requestedSkill: any) => {
    // Find a skill we can offer that they want
    const theirWantedSkills = match.skillsWanted || [];
    const ourOfferedSkills = userSkillsOffered.map(s => s.skill_id);
    
    const commonSkill = theirWantedSkills.find((skillId: string) => 
      ourOfferedSkills.includes(skillId)
    );
    
    if (commonSkill) {
      const offeredSkill = allSkills.find(s => s.id === commonSkill);
      setSelectedMatch(match);
      setSelectedRequestedSkill(requestedSkill);
      setSelectedOfferedSkill(offeredSkill);
      setShowSwapModal(true);
    }
  };

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedSkill) {
      return matchesSearch && match.matchingSkills?.includes(selectedSkill);
    }
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 pb-8 flex items-center justify-center">
        <div className="text-white">Loading matches...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Discover
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Skill Partners</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Find amazing people who can teach you new skills and learn from your expertise
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
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 backdrop-blur-md"
            />
          </div>
          
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 backdrop-blur-md"
          >
            <option value="">All Skills</option>
            {allSkills.map((skill) => (
              <option key={skill.id} value={skill.id} className="bg-slate-800">
                {skill.name}
              </option>
            ))}
          </select>
          
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 backdrop-blur-md"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-white/70">
            Found {filteredMatches.length} potential skill partners
          </p>
        </motion.div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all"
            >
              {/* Match Score */}
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  {match.compatibilityScore}% Match
                </Badge>
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span className="text-sm">4.8</span>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-4">
                <Avatar className="w-16 h-16 mx-auto mb-3 border-2 border-purple-500/50">
                  <AvatarImage src={match.avatar_url} alt={match.full_name} />
                  <AvatarFallback className="bg-purple-600 text-white">
                    {match.full_name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-white">{match.full_name}</h3>
                {match.location && (
                  <div className="flex items-center justify-center text-white/60 text-sm mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {match.location}
                  </div>
                )}
              </div>

              {/* Skills They Can Teach */}
              <div className="mb-4">
                <h4 className="text-white/80 text-sm font-medium mb-2">Can teach:</h4>
                <div className="flex flex-wrap gap-1">
                  {match.skillsOffered?.slice(0, 3).map((skillId: string) => {
                    const skill = allSkills.find(s => s.id === skillId);
                    const isWanted = userSkillsWanted.some(s => s.skill_id === skillId);
                    return skill ? (
                      <Badge
                        key={skillId}
                        className={`text-xs ${
                          isWanted 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/50' 
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {skill.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Bio */}
              {match.bio && (
                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                  {match.bio}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  View Profile
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    // Find a skill they offer that we want
                    const theirOfferedSkills = match.skillsOffered || [];
                    const ourWantedSkills = userSkillsWanted.map(s => s.skill_id);
                    
                    const commonSkillId = theirOfferedSkills.find((skillId: string) => 
                      ourWantedSkills.includes(skillId)
                    );
                    
                    if (commonSkillId) {
                      const requestedSkill = allSkills.find(s => s.id === commonSkillId);
                      handleSendRequest(match, requestedSkill);
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Request
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-xl font-semibold text-white mb-2">No matches found</h3>
            <p className="text-white/70">
              Try adjusting your search criteria or add more skills to your profile
            </p>
          </motion.div>
        )}

        {/* Swap Request Modal */}
        <SwapRequestModal
          isOpen={showSwapModal}
          onClose={() => setShowSwapModal(false)}
          targetUser={selectedMatch}
          requestedSkill={selectedRequestedSkill}
          offeredSkill={selectedOfferedSkill}
        />
      </div>
    </div>
  );
};

export default DiscoverPage;
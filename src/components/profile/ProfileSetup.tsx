import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, FileText, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getSkills, 
  updateProfile, 
  addUserSkillOffered, 
  addUserSkillWanted,
  getUserSkillsOffered,
  getUserSkillsWanted,
  Skill 
} from '../../lib/supabase';
import { toast } from 'sonner';

interface ProfileSetupProps {
  onComplete: () => void;
}

const ProfileSetup = ({ onComplete }: ProfileSetupProps) => {
  const { profile, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [location, setLocation] = useState(profile?.location || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [availability, setAvailability] = useState<string[]>(profile?.availability || []);
  
  // Skills
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([]);
  const [skillSearch, setSkillSearch] = useState('');

  const availabilityOptions = [
    'Weekdays',
    'Weekends', 
    'Mornings',
    'Afternoons',
    'Evenings',
    'Flexible'
  ];

  useEffect(() => {
    loadSkills();
    if (profile) {
      loadUserSkills();
    }
  }, [profile]);

  const loadSkills = async () => {
    try {
      const skills = await getSkills();
      setAllSkills(skills);
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const loadUserSkills = async () => {
    if (!profile) return;
    
    try {
      const [offered, wanted] = await Promise.all([
        getUserSkillsOffered(profile.id),
        getUserSkillsWanted(profile.id)
      ]);
      
      setSkillsOffered(offered.map(s => s.skill_id));
      setSkillsWanted(wanted.map(s => s.skill_id));
    } catch (error) {
      console.error('Error loading user skills:', error);
    }
  };

  const handleBasicInfoSubmit = async () => {
    if (!profile) return;
    
    setLoading(true);
    try {
      await updateProfile(profile.id, {
        full_name: fullName,
        location: location || undefined,
        bio: bio || undefined,
        availability,
      });
      
      await refreshProfile();
      setStep(2);
      toast.success('Basic information updated!');
    } catch (error: any) {
      toast.error(error.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillsSubmit = async () => {
    if (!profile) return;
    
    setLoading(true);
    try {
      // Add offered skills
      for (const skillId of skillsOffered) {
        try {
          await addUserSkillOffered(profile.id, skillId);
        } catch (error) {
          // Skill might already exist, ignore error
        }
      }
      
      // Add wanted skills
      for (const skillId of skillsWanted) {
        try {
          await addUserSkillWanted(profile.id, skillId);
        } catch (error) {
          // Skill might already exist, ignore error
        }
      }
      
      toast.success('Profile setup complete!');
      onComplete();
    } catch (error: any) {
      toast.error(error.message || 'Error saving skills');
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = (option: string) => {
    setAvailability(prev => 
      prev.includes(option) 
        ? prev.filter(a => a !== option)
        : [...prev, option]
    );
  };

  const toggleSkill = (skillId: string, type: 'offered' | 'wanted') => {
    if (type === 'offered') {
      setSkillsOffered(prev => 
        prev.includes(skillId) 
          ? prev.filter(s => s !== skillId)
          : [...prev, skillId]
      );
    } else {
      setSkillsWanted(prev => 
        prev.includes(skillId) 
          ? prev.filter(s => s !== skillId)
          : [...prev, skillId]
      );
    }
  };

  const filteredSkills = allSkills.filter(skill =>
    skill.name.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 px-4 pb-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl w-full"
      >
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Complete Your Profile</h1>
            <span className="text-white/70">Step {step} of 2</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
            
            <div>
              <Label htmlFor="fullName" className="text-white/80">Full Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="text-white/80">Location (Optional)</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-white/80">Bio (Optional)</Label>
              <div className="relative mt-1">
                <FileText className="absolute left-3 top-3 text-white/50 w-5 h-5" />
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 min-h-[100px]"
                  placeholder="Tell others about yourself..."
                />
              </div>
            </div>

            <div>
              <Label className="text-white/80">Availability</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availabilityOptions.map((option) => (
                  <Badge
                    key={option}
                    variant={availability.includes(option) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      availability.includes(option)
                        ? 'bg-purple-500 text-white'
                        : 'border-white/30 text-white/80 hover:bg-white/10'
                    }`}
                    onClick={() => toggleAvailability(option)}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={handleBasicInfoSubmit}
              disabled={loading || !fullName.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {loading ? 'Saving...' : 'Continue'}
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Your Skills</h2>
            
            {/* Search */}
            <div>
              <Input
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="Search skills..."
              />
            </div>

            {/* Skills I Can Offer */}
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Skills I Can Offer</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {skillsOffered.map((skillId) => {
                  const skill = allSkills.find(s => s.id === skillId);
                  return skill ? (
                    <Badge
                      key={skillId}
                      className="bg-green-500/20 text-green-300 border-green-500/50"
                    >
                      {skill.name}
                      <X 
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => toggleSkill(skillId, 'offered')}
                      />
                    </Badge>
                  ) : null;
                })}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {filteredSkills
                  .filter(skill => !skillsOffered.includes(skill.id))
                  .map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="outline"
                      className="cursor-pointer border-white/30 text-white/80 hover:bg-green-500/20 hover:border-green-500/50 hover:text-green-300"
                      onClick={() => toggleSkill(skill.id, 'offered')}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {skill.name}
                    </Badge>
                  ))}
              </div>
            </div>

            {/* Skills I Want to Learn */}
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Skills I Want to Learn</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {skillsWanted.map((skillId) => {
                  const skill = allSkills.find(s => s.id === skillId);
                  return skill ? (
                    <Badge
                      key={skillId}
                      className="bg-blue-500/20 text-blue-300 border-blue-500/50"
                    >
                      {skill.name}
                      <X 
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => toggleSkill(skillId, 'wanted')}
                      />
                    </Badge>
                  ) : null;
                })}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {filteredSkills
                  .filter(skill => !skillsWanted.includes(skill.id) && !skillsOffered.includes(skill.id))
                  .map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="outline"
                      className="cursor-pointer border-white/30 text-white/80 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-300"
                      onClick={() => toggleSkill(skill.id, 'wanted')}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {skill.name}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Back
              </Button>
              <Button
                onClick={handleSkillsSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {loading ? 'Saving...' : 'Complete Setup'}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
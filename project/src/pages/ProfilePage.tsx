import { motion } from 'framer-motion';
import UserProfileCard from '../components/profile/UserProfileCard';
import SkillsSection from '../components/profile/SkillsSection';
import AvailabilityCalendar from '../components/profile/AvailabilityCalendar';
import { Button } from '@/components/ui/button';
import { Edit, Settings, Share } from 'lucide-react';

const ProfilePage = () => {
  const userData = {
    name: 'Sarah Johnson',
    location: 'San Francisco, CA',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.8,
    completedSwaps: 47,
    points: 2450,
    skillsOffered: ['React', 'UI/UX Design', 'Photography', 'Spanish'],
    skillsWanted: ['Python', 'Machine Learning', 'Guitar', 'Cooking'],
    availability: ['Weekends', 'Evenings', 'Flexible'],
    bio: 'Passionate full-stack developer and photographer. Love sharing knowledge and learning new skills from amazing people around the world.',
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-white/70">Manage your skills and availability</p>
          </div>
          
          <div className="flex space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <UserProfileCard user={userData} />
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <SkillsSection 
              skillsOffered={userData.skillsOffered}
              skillsWanted={userData.skillsWanted}
            />
            <AvailabilityCalendar />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
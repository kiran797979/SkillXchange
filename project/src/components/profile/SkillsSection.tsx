import { motion } from 'framer-motion';
import { Plus, Award, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SkillsSectionProps {
  skillsOffered: string[];
  skillsWanted: string[];
}

const SkillsSection = ({ skillsOffered, skillsWanted }: SkillsSectionProps) => {
  const skillColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600', 
    'from-pink-500 to-pink-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-teal-500 to-teal-600',
    'from-indigo-500 to-indigo-600',
  ];

  return (
    <div className="space-y-8">
      {/* Skills I Offer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Award className="w-6 h-6 text-purple-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Skills I Offer</h3>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-3">
          {skillsOffered.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: [-1, 1, -1, 0],
                transition: { duration: 0.3 }
              }}
              className={`bg-gradient-to-r ${skillColors[index % skillColors.length]} text-white px-4 py-2 rounded-full font-medium cursor-pointer shadow-lg hover:shadow-xl transition-shadow`}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills I Want */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Target className="w-6 h-6 text-pink-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Skills I Want to Learn</h3>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Plus className="w-4 h-4 mr-2" />
              Add Interest
            </Button>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-3">
          {skillsWanted.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: [1, -1, 1, 0],
                transition: { duration: 0.3 }
              }}
            >
              <Badge 
                variant="outline" 
                className="border-white/30 text-white/80 hover:bg-white/10 px-4 py-2 text-base cursor-pointer transition-all"
              >
                {skill}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;
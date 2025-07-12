import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'UX Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content: 'SkillXchange transformed my career! I learned Python from an amazing developer and taught design in return. The community is incredibly supportive.',
      skills: ['Design', 'Python']
    },
    {
      name: 'Marcus Chen',
      role: 'Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content: 'The quality of teachers here is outstanding. I improved my photography skills while helping others with coding. It\'s a win-win!',
      skills: ['Coding', 'Photography']
    },
    {
      name: 'Elena Rodriguez',
      role: 'Marketing Manager',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content: 'Found my language exchange partner here and now I\'m fluent in French! The scheduling system makes it so easy to coordinate sessions.',
      skills: ['Marketing', 'French']
    },
    {
      name: 'David Park',
      role: 'Photographer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content: 'As a creative professional, I love how I can teach photography and learn business skills. The platform is intuitive and the community is amazing.',
      skills: ['Photography', 'Business']
    },
    {
      name: 'Priya Patel',
      role: 'Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content: 'The AI matching system is incredible! It connected me with the perfect cooking teacher while I helped someone with data analysis.',
      skills: ['Data Science', 'Cooking']
    },
    {
      name: 'James Wilson',
      role: 'Music Teacher',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content: 'Teaching guitar online has never been easier. The platform handles everything - scheduling, payments, and even provides great tools for virtual lessons.',
      skills: ['Music', 'Teaching']
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Loved by Our Community
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            See what our users say about their SkillXchange experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all h-full relative overflow-hidden">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-400/30" />
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white/80 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {testimonial.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* User Info */}
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 border-2 border-purple-500/30">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-purple-600 text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h4 className="text-white font-medium">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
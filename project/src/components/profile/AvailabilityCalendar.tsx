import { motion } from 'framer-motion';
import { Calendar, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AvailabilityCalendar = () => {
  const timeSlots = [
    { day: 'Monday', times: ['2:00 PM - 4:00 PM', '7:00 PM - 9:00 PM'] },
    { day: 'Tuesday', times: ['10:00 AM - 12:00 PM'] },
    { day: 'Wednesday', times: [] },
    { day: 'Thursday', times: ['6:00 PM - 8:00 PM'] },
    { day: 'Friday', times: ['3:00 PM - 5:00 PM', '8:00 PM - 10:00 PM'] },
    { day: 'Saturday', times: ['10:00 AM - 2:00 PM'] },
    { day: 'Sunday', times: ['1:00 PM - 5:00 PM'] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-blue-400 mr-3" />
          <h3 className="text-xl font-semibold text-white">Weekly Availability</h3>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Plus className="w-4 h-4 mr-2" />
            Add Time
          </Button>
        </motion.div>
      </div>

      <div className="space-y-4">
        {timeSlots.map((slot, index) => (
          <motion.div
            key={slot.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center">
              <div className="w-24 text-white font-medium">{slot.day}</div>
              <Clock className="w-4 h-4 text-white/50 mx-3" />
            </div>
            
            <div className="flex-1 flex flex-wrap gap-2">
              {slot.times.length > 0 ? (
                slot.times.map((time, timeIndex) => (
                  <motion.div
                    key={timeIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.1) + (timeIndex * 0.05) }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge 
                      className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                    >
                      {time}
                    </Badge>
                  </motion.div>
                ))
              ) : (
                <span className="text-white/50 italic">No availability set</span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/50 hover:text-white ml-4"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AvailabilityCalendar;
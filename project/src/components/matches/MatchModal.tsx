import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LottieAnimation from '../LottieAnimation';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: any;
}

const MatchModal = ({ isOpen, onClose, match }: MatchModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  // Simple success animation data
  const successAnimation = {
    v: "5.7.4",
    fr: 25,
    ip: 0,
    op: 50,
    w: 200,
    h: 200,
    nm: "Success",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Checkmark",
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [100, 100, 0], ix: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: { 
            a: 1, 
            k: [
              { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] },
              { t: 25, s: [120] },
              { t: 50, s: [100] }
            ],
            ix: 6 
          }
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                p: { a: 0, k: [0, 0], ix: 3 },
                s: { a: 0, k: [80, 80], ix: 2 }
              },
              {
                ty: "fl",
                c: { a: 0, k: [0.2, 0.8, 0.2, 1], ix: 4 },
                o: { a: 0, k: 100, ix: 5 }
              }
            ]
          }
        ],
        ip: 0,
        op: 50,
        st: 0,
        bm: 0
      }
    ],
    markers: []
  };

  if (!match) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {showConfetti && (
            <Confetti
              width={windowDimensions.width}
              height={windowDimensions.height}
              recycle={false}
              numberOfPieces={200}
              gravity={0.3}
            />
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="text-center mb-6"
              >
                <LottieAnimation 
                  animationData={successAnimation}
                  width={120}
                  height={120}
                />
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  It's a Match! 🎉
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-white/70"
                >
                  You and {match.name} are perfect skill partners!
                </motion.p>
              </motion.div>

              {/* Match Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="space-y-6"
              >
                {/* Profile Summary */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 border-2 border-purple-500/50">
                    <AvatarImage src={match.avatar} alt={match.name} />
                    <AvatarFallback className="bg-purple-600 text-white">
                      {match.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{match.name}</h3>
                    <div className="flex items-center text-white/70">
                      <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                      <span>{match.rating} ({match.completedSwaps} swaps)</span>
                    </div>
                  </div>
                </div>

                {/* Skills Exchange Preview */}
                <div className="bg-white/5 rounded-2xl p-4">
                  <h4 className="text-white font-medium mb-3">Skill Exchange</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-white/70 text-sm">You'll learn:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {match.skillsOffered.slice(0, 2).map((skill: string) => (
                          <Badge key={skill} className="bg-green-500/20 text-green-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-white/70 text-sm">You'll teach:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {match.skillsWanted.slice(0, 2).map((skill: string) => (
                          <Badge key={skill} className="bg-purple-500/20 text-purple-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Chat
                    </Button>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MatchModal;
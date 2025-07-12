import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { createSkillSwap } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

interface SwapRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: any;
  requestedSkill: any;
  offeredSkill: any;
}

const SwapRequestModal = ({ 
  isOpen, 
  onClose, 
  targetUser, 
  requestedSkill, 
  offeredSkill 
}: SwapRequestModalProps) => {
  const { profile } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!profile || !targetUser || !requestedSkill || !offeredSkill) return;

    setLoading(true);
    try {
      await createSkillSwap(
        profile.id,
        targetUser.id,
        requestedSkill.id,
        offeredSkill.id,
        message
      );
      
      toast.success('Swap request sent successfully!');
      onClose();
      setMessage('');
    } catch (error: any) {
      toast.error(error.message || 'Error sending swap request');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !targetUser || !requestedSkill || !offeredSkill) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Send Swap Request</h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3 mb-6">
            <Avatar className="w-12 h-12 border-2 border-purple-500/50">
              <AvatarImage src={targetUser.avatar_url} alt={targetUser.full_name} />
              <AvatarFallback className="bg-purple-600 text-white">
                {targetUser.full_name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-medium">{targetUser.full_name}</h3>
              <p className="text-white/60 text-sm">{targetUser.location}</p>
            </div>
          </div>

          {/* Swap Details */}
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <h4 className="text-white font-medium mb-3">Skill Exchange</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">You'll learn:</span>
                <Badge className="bg-green-500/20 text-green-300">
                  {requestedSkill.name}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">You'll teach:</span>
                <Badge className="bg-purple-500/20 text-purple-300">
                  {offeredSkill.name}
                </Badge>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <Label htmlFor="message" className="text-white/80">
              Message (Optional)
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/50"
              placeholder="Introduce yourself and explain what you'd like to learn..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {loading ? 'Sending...' : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SwapRequestModal;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSkillSwaps, updateSkillSwapStatus, SkillSwap } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

const SwapsList = () => {
  const { profile } = useAuth();
  const [swaps, setSwaps] = useState<SkillSwap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      loadSwaps();
    }
  }, [profile]);

  const loadSwaps = async () => {
    if (!profile) return;
    
    try {
      const swapsData = await getSkillSwaps(profile.id);
      setSwaps(swapsData);
    } catch (error) {
      console.error('Error loading swaps:', error);
      toast.error('Error loading swaps');
    } finally {
      setLoading(false);
    }
  };

  const handleSwapAction = async (swapId: string, action: 'accept' | 'reject') => {
    try {
      const status = action === 'accept' ? 'accepted' : 'rejected';
      await updateSkillSwapStatus(swapId, status);
      await loadSwaps();
      toast.success(`Swap request ${action}ed successfully`);
    } catch (error: any) {
      toast.error(error.message || `Error ${action}ing swap request`);
    }
  };

  const getSwapsByStatus = (status: string) => {
    return swaps.filter(swap => swap.status === status);
  };

  const getSwapsByType = (type: 'incoming' | 'outgoing') => {
    if (!profile) return [];
    
    if (type === 'incoming') {
      return swaps.filter(swap => swap.provider_id === profile.id && swap.status === 'pending');
    } else {
      return swaps.filter(swap => swap.requester_id === profile.id);
    }
  };

  const SwapCard = ({ swap, showActions = false }: { swap: SkillSwap; showActions?: boolean }) => {
    const isRequester = profile?.id === swap.requester_id;
    const otherUser = isRequester ? swap.provider : swap.requester;
    const skillToLearn = isRequester ? swap.requested_skill : swap.offered_skill;
    const skillToTeach = isRequester ? swap.offered_skill : swap.requested_skill;

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'pending': return 'bg-yellow-500/20 text-yellow-300';
        case 'accepted': return 'bg-green-500/20 text-green-300';
        case 'rejected': return 'bg-red-500/20 text-red-300';
        case 'completed': return 'bg-blue-500/20 text-blue-300';
        case 'cancelled': return 'bg-gray-500/20 text-gray-300';
        default: return 'bg-gray-500/20 text-gray-300';
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'pending': return <Clock className="w-4 h-4" />;
        case 'accepted': return <CheckCircle className="w-4 h-4" />;
        case 'rejected': return <XCircle className="w-4 h-4" />;
        case 'completed': return <CheckCircle className="w-4 h-4" />;
        case 'cancelled': return <XCircle className="w-4 h-4" />;
        default: return <Clock className="w-4 h-4" />;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 border-2 border-purple-500/50">
              <AvatarImage src={otherUser?.avatar_url} alt={otherUser?.full_name} />
              <AvatarFallback className="bg-purple-600 text-white text-sm">
                {otherUser?.full_name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-white font-medium">{otherUser?.full_name}</h4>
              <p className="text-white/60 text-sm">{otherUser?.location}</p>
            </div>
          </div>
          
          <Badge className={`${getStatusColor(swap.status)} flex items-center space-x-1`}>
            {getStatusIcon(swap.status)}
            <span className="capitalize">{swap.status}</span>
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">You'll learn:</span>
            <Badge className="bg-green-500/20 text-green-300">
              {skillToLearn?.name}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">You'll teach:</span>
            <Badge className="bg-purple-500/20 text-purple-300">
              {skillToTeach?.name}
            </Badge>
          </div>
        </div>

        {swap.message && (
          <div className="bg-white/5 rounded p-3 mb-4">
            <p className="text-white/80 text-sm">{swap.message}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-white/60 mb-4">
          <span>Created {new Date(swap.created_at).toLocaleDateString()}</span>
          {swap.scheduled_date && (
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(swap.scheduled_date).toLocaleDateString()}
            </span>
          )}
        </div>

        {showActions && swap.status === 'pending' && (
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSwapAction(swap.id, 'reject')}
              className="flex-1 border-red-500/50 text-red-300 hover:bg-red-500/20"
            >
              <XCircle className="w-4 h-4 mr-1" />
              Decline
            </Button>
            <Button
              size="sm"
              onClick={() => handleSwapAction(swap.id, 'accept')}
              className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-300"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Accept
            </Button>
          </div>
        )}

        {swap.status === 'accepted' && (
          <Button
            size="sm"
            className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Start Chat
          </Button>
        )}
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white">Loading swaps...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="incoming" className="space-y-6">
        <TabsList className="bg-white/10 backdrop-blur-md border border-white/20">
          <TabsTrigger 
            value="incoming" 
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
          >
            Incoming Requests ({getSwapsByType('incoming').length})
          </TabsTrigger>
          <TabsTrigger 
            value="outgoing"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
          >
            My Requests ({getSwapsByType('outgoing').length})
          </TabsTrigger>
          <TabsTrigger 
            value="active"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
          >
            Active ({getSwapsByStatus('accepted').length})
          </TabsTrigger>
          <TabsTrigger 
            value="completed"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
          >
            Completed ({getSwapsByStatus('completed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="space-y-4">
          {getSwapsByType('incoming').length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/70">No incoming requests</p>
            </div>
          ) : (
            getSwapsByType('incoming').map((swap) => (
              <SwapCard key={swap.id} swap={swap} showActions={true} />
            ))
          )}
        </TabsContent>

        <TabsContent value="outgoing" className="space-y-4">
          {getSwapsByType('outgoing').length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/70">No outgoing requests</p>
            </div>
          ) : (
            getSwapsByType('outgoing').map((swap) => (
              <SwapCard key={swap.id} swap={swap} />
            ))
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {getSwapsByStatus('accepted').length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/70">No active swaps</p>
            </div>
          ) : (
            getSwapsByStatus('accepted').map((swap) => (
              <SwapCard key={swap.id} swap={swap} />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {getSwapsByStatus('completed').length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/70">No completed swaps</p>
            </div>
          ) : (
            getSwapsByStatus('completed').map((swap) => (
              <SwapCard key={swap.id} swap={swap} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SwapsList;
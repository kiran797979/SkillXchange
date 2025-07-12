import { motion } from 'framer-motion';
import SwapsList from '../components/swaps/SwapsList';

const SwapsPage = () => {
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
            My
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Skill Swaps</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Manage your skill exchange requests and active learning sessions
          </p>
        </motion.div>

        {/* Swaps List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SwapsList />
        </motion.div>
      </div>
    </div>
  );
};

export default SwapsPage;
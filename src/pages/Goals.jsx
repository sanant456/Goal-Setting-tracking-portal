import { motion } from 'framer-motion';

export const Goals = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">My Goals</h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium">Create Goal</button>
      </div>
      
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-card border glass-panel flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">On Track</span>
                <span className="text-sm text-muted-foreground">Due Oct 30, 2026</span>
              </div>
              <h3 className="text-lg font-semibold">Launch New User Onboarding Flow</h3>
              <p className="text-muted-foreground text-sm mt-1">Improve user retention by revamping the first-time user experience.</p>
            </div>
            <div className="w-full md:w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

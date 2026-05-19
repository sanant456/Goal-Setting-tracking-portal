import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { dept: 'Engineering', completed: 45, total: 50 },
  { dept: 'Marketing', completed: 30, total: 45 },
  { dept: 'Sales', completed: 60, total: 65 },
  { dept: 'Design', completed: 25, total: 30 },
];

export const Analytics = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold">Analytics & Reports</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-2xl bg-card border glass-panel"
        >
          <h2 className="text-xl font-semibold mb-6">Department Performance</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)'}} />
                <Tooltip 
                  cursor={{fill: 'var(--secondary)'}}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                />
                <Bar dataKey="completed" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="var(--muted)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

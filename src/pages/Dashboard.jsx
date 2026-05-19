import { motion } from 'framer-motion';
import { Target, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

const StatCard = ({ title, value, subtitle, icon, delay, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="p-5 rounded-xl bg-card border border-border shadow-sm flex flex-col"
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}>
        {icon}
      </div>
      <span className="text-2xl font-display font-bold text-white">{value}</span>
    </div>
    <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
  </motion.div>
);

export const Dashboard = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* 4 KPI Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Goals" 
          value="8" 
          subtitle="2 Completed this Q" 
          icon={<Target size={20} />} 
          accent="bg-primary/20 text-primary"
          delay={0.1} 
        />
        <StatCard 
          title="Avg. Progress" 
          value="68%" 
          subtitle="+12% from last month" 
          icon={<TrendingIcon />} 
          accent="bg-brand-emerald/20 text-brand-emerald"
          delay={0.2} 
        />
        <StatCard 
          title="Pending Check-ins" 
          value="2" 
          subtitle="Due in 5 days" 
          icon={<Clock size={20} />} 
          accent="bg-brand-amber/20 text-brand-amber"
          delay={0.3} 
        />
        <StatCard 
          title="Performance Rating" 
          value="4.8" 
          subtitle="Exceeds Expectations" 
          icon={<CheckCircle2 size={20} />} 
          accent="bg-primary/20 text-primary"
          delay={0.4} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content: Current Goals */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-white">Current Goals</h2>
            <button className="text-sm text-primary hover:text-primary-foreground transition-colors">View All</button>
          </div>
          
          {[
            { title: 'Launch Q3 Marketing Campaign', progress: 85, status: 'on-track', due: 'Oct 30' },
            { title: 'Reduce API Latency by 20%', progress: 40, status: 'at-risk', due: 'Nov 15' },
            { title: 'Hire 3 Senior Developers', progress: 100, status: 'completed', due: 'Sep 01' },
          ].map((goal, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i*0.1) }}
              className="p-4 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-primary/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className={`status-pill ${goal.status}`}>
                    {goal.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} /> Due {goal.due}
                  </span>
                </div>
                <h3 className="font-medium text-white">{goal.title}</h3>
              </div>
              
              <div className="w-full sm:w-48 space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span className="font-medium text-white">{goal.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${goal.status === 'at-risk' ? 'bg-brand-amber' : goal.status === 'completed' ? 'bg-brand-blue' : 'bg-brand-emerald'}`} 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar: Progress & Reminders */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-card border border-border">
            <h2 className="text-lg font-semibold text-white mb-4">Annual Progress</h2>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-secondary stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary stroke-current" strokeWidth="3" strokeDasharray="75, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-display font-bold text-white">75%</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">You're slightly ahead of schedule for 2026. Keep it up!</p>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border">
            <h2 className="text-lg font-semibold text-white mb-4">Reminders</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-brand-amber mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Q3 Check-in Due</p>
                  <p className="text-xs text-muted-foreground">Manager review required by Oct 15</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-brand-emerald mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Goal Approved</p>
                  <p className="text-xs text-muted-foreground">"Cloud Migration" was approved</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

const TrendingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
    <polyline points="16 7 22 7 22 13"></polyline>
  </svg>
);

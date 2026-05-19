import { motion } from 'framer-motion';

export const ManagerView = () => {
  const team = [
    { name: 'Sarah Connor', role: 'Frontend Engineer', progress: 82, status: 'On Track', color: 'bg-brand-emerald' },
    { name: 'John Smith', role: 'Backend Engineer', progress: 45, status: 'At Risk', color: 'bg-brand-amber' },
    { name: 'Emily Chen', role: 'UX Designer', progress: 95, status: 'Completed', color: 'bg-brand-blue' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Manager View</h1>
          <p className="text-muted-foreground text-sm">Track your direct reports' performance</p>
        </div>
        <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-secondary/80 transition-colors">
          Download Report
        </button>
      </div>

      <div className="grid gap-4">
        {team.map((member, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-xl bg-card border border-border flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold text-white">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8 w-1/2">
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Goal Progress</span>
                  <span className="font-medium text-white">{member.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${member.color}`} style={{ width: `${member.progress}%` }}></div>
                </div>
              </div>
              <div className="w-24 text-right">
                <span className={`status-pill ${member.status === 'On Track' ? 'on-track' : member.status === 'At Risk' ? 'at-risk' : 'completed'}`}>
                  {member.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

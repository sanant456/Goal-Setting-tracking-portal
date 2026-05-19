import { motion } from 'framer-motion';

export const Team = () => {
  const teamMembers = [
    { name: 'Sarah Connor', role: 'Frontend Lead', goals: 4, onTrack: 3 },
    { name: 'John Smith', role: 'Backend Dev', goals: 5, onTrack: 5 },
    { name: 'Emily Chen', role: 'Designer', goals: 3, onTrack: 2 },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Team Performance</h1>
        <button className="bg-secondary text-foreground px-4 py-2 rounded-xl font-medium">Invite Member</button>
      </div>

      <div className="grid gap-4">
        {teamMembers.map((member, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl bg-card border glass-panel flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Active Goals</p>
                <p className="font-bold">{member.goals}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">On Track</p>
                <p className="font-bold text-green-500">{member.onTrack}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

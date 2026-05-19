export const CheckIn = () => {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-display font-bold text-white">Quarterly Check-In</h1>
        <p className="text-muted-foreground text-sm">Complete your Q3 performance review</p>
      </div>
      
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
        <div>
          <h3 className="text-white font-medium mb-2">1. What were your biggest accomplishments this quarter?</h3>
          <textarea className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm text-white focus:border-primary outline-none" rows="3"></textarea>
        </div>
        <div>
          <h3 className="text-white font-medium mb-2">2. What challenges did you face?</h3>
          <textarea className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm text-white focus:border-primary outline-none" rows="3"></textarea>
        </div>
        <div className="pt-4 border-t border-border text-right">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">Submit Check-In</button>
        </div>
      </div>
    </div>
  );
};

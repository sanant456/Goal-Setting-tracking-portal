export const SharedGoals = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-display font-bold text-white">Shared Goals</h1>
        <p className="text-muted-foreground text-sm">Cross-functional initiatives and shared KPIs</p>
      </div>
      
      <div className="p-12 text-center border border-dashed border-border rounded-xl">
        <p className="text-muted-foreground">No shared goals assigned to your department yet.</p>
      </div>
    </div>
  );
};

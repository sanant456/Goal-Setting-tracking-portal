export const AdminView = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-display font-bold text-white">Admin Console</h1>
        <p className="text-muted-foreground text-sm">System oversight and configuration</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-card border border-border col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">Organization Metrics</h2>
          <div className="flex items-center justify-center h-48 border border-dashed border-border rounded-lg text-muted-foreground">
            Org Chart / Global Metrics Visualization
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-card border border-border">
            <h3 className="font-medium text-white mb-2">Quick Actions</h3>
            <ul className="space-y-2">
              <li><button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-secondary text-muted-foreground hover:text-white transition-colors">Manage Users</button></li>
              <li><button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-secondary text-muted-foreground hover:text-white transition-colors">Goal Framework Settings</button></li>
              <li><button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-secondary text-muted-foreground hover:text-white transition-colors">Audit Logs</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

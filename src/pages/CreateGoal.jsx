import { useState } from 'react';

export const CreateGoal = () => {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-display font-bold text-white">Create New Goal</h1>
        <p className="text-muted-foreground text-sm">Define a new objective and key results.</p>
      </div>

      <form className="space-y-6 bg-card p-6 rounded-xl border border-border shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Goal Title</label>
            <input 
              type="text" 
              placeholder="e.g., Increase Q4 Sales by 20%" 
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
            <textarea 
              rows="3"
              placeholder="Describe the objective and how it will be measured..." 
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary text-white resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Weightage (%)</label>
              <input 
                type="number" 
                defaultValue="10"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Due Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary text-white"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end gap-3">
          <button type="button" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm">
            Save Goal
          </button>
        </div>
      </form>
    </div>
  );
};

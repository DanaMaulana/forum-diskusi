
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatsSectionProps {
  threadsCount: number;
  usersCount: number;
  categoriesCount: number;
}

const StatsSection = ({ threadsCount, usersCount, categoriesCount }: StatsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/60">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{threadsCount}</p>
            <p className="text-sm text-gray-600">Total Threads</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/60">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{usersCount}</p>
            <p className="text-sm text-gray-600">Active Users</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/60">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg">
            <TrendingUp className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{categoriesCount}</p>
            <p className="text-sm text-gray-600">Categories</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;

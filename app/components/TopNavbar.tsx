"use client";
import Link from 'next/link';
import { BellIcon, SearchIcon, SpeakerphoneIcon } from '@heroicons/react/outline';

const TopNavbar = () => {
  return (
    <nav className="bg-gradient-to-r from-rose-950 to-slate-900 p-4 flex justify-between items-center">
      <div className="flex items-center w-4/5">
        <SearchIcon className="h-5 w-5 text-gray-300 mr-3" />
        <input
          type="search"
          placeholder="Search..."
          className="bg-slate-700 text-white rounded-md pl-4 pr-2 py-2 w-full focus:outline-none focus:ring focus:border-slate-900"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-white">
          Points: <span className="font-semibold">100</span> {/* Replace with dynamic points */}
        </div>
        
        <button
          className="p-2 rounded-full hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-400"
          aria-label="Notifications"
        >
          <BellIcon className="h-6 w-6 text-white" />
        </button>

        <Link href="/SongEngine">
          <div className="bg-slate-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            Listen
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default TopNavbar;

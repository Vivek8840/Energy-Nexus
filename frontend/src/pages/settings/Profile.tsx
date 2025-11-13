import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
        Profile Settings
      </h1>

      {/* User Avatar & Name */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">User Profile</h2>
        <div className="flex items-center space-x-6">
          <div>
            <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 text-4xl font-bold">
              U
            </div>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              className="mt-4 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900 dark:file:text-green-300 dark:hover:file:bg-green-800"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* My Impact Summary */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">My Impact</h2>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              ₹12345.67
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ₹8901.23
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Savings</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              456.78 kg
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">CO2 Reduced</p>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Linked Devices */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Linked Devices</h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2">
            <span className="text-gray-900 dark:text-gray-100">Device-001</span>
            <span className="px-2 py-1 rounded text-xs font-semibold bg-green-200 text-green-800">
              Connected
            </span>
          </li>
          <li className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2">
            <span className="text-gray-900 dark:text-gray-100">Device-002</span>
            <span className="px-2 py-1 rounded text-xs font-semibold bg-red-200 text-red-800">
              Offline
            </span>
          </li>
        </ul>
      </div>

      {/* Wallet & Payouts */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Wallet & Payouts</h2>
        <p className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Current Balance: ₹0.00</p>
        <h3 className="text-md font-semibold mb-2 text-gray-900 dark:text-gray-100">Linked Bank Accounts</h3>
        <ul className="space-y-2 mb-4">
          <li className="border-b border-gray-200 dark:border-gray-700 py-2 text-gray-900 dark:text-gray-100">
            No bank accounts linked
          </li>
        </ul>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Activity</h2>
        <ul className="space-y-2">
          <li className="border-b border-gray-200 dark:border-gray-700 py-2 flex justify-between items-center">
            <span className="text-gray-900 dark:text-gray-100">No recent transactions</span>
            <span className="text-gray-600 dark:text-gray-400">-</span>
            <a
              href="/blockchain-transparency-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 hover:underline ml-4"
            >
              View Details
            </a>
          </li>
        </ul>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;

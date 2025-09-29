import React from 'react';

const Legal: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Legal</h1>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li><a className="text-blue-600 hover:underline" href="#">Privacy Policy</a></li>
        <li><a className="text-blue-600 hover:underline" href="#">Terms of Service</a></li>
        <li><a className="text-blue-600 hover:underline" href="#">About Us</a></li>
      </ul>
    </div>
  );
};

export default Legal;

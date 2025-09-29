import React, { useState, useEffect, useCallback } from 'react';

const Profile: React.FC = React.memo(() => {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cleanup preview URL when component unmounts or profilePicture changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleProfilePictureChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    // Simulate save delay to avoid blinking by disabling button during save
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile saved successfully!');
    }, 1000);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Profile Settings</h1>
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          disabled={isSaving}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Profile Picture
        </label>
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900 dark:file:text-green-300 dark:hover:file:bg-green-800"
          disabled={isSaving}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="mt-4 w-32 h-32 rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />
        )}
      </div>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
          isSaving ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
});

export default Profile;

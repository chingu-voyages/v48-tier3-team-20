"use client"
import React, { useState } from 'react';

const Profile = () => {

  
  const [profileData, setProfileData] = useState({
    name: 'Test User',
    email: 'TestUser@mail.com',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  });

  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-100 mb-6">Profile</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-gray-200 block mb-1">Name</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                id="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            ) : (
              <div className="text-gray-200 py-2 px-3 bg-gray-700 rounded-md">{profileData.name}</div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="text-gray-200 block mb-1">Email</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                id="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            ) : (
              <div className="text-gray-200 py-2 px-3 bg-gray-700 rounded-md">{profileData.email}</div>
            )}
          </div>
          <div>
            <label htmlFor="about" className="text-gray-200 block mb-1">About</label>
            {editMode ? (
              <textarea
                name="about"
                id="about"
                value={profileData.about}
                onChange={handleChange}
                rows={5}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Tell us something about yourself"
              ></textarea>
            ) : (
              <div className="text-gray-200 py-2 px-3 bg-gray-700 rounded-md">{profileData.about}</div>
            )}
          </div>
          {editMode ? (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default Profile;

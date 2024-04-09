"use client";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Test User",
    email: "TestUser@mail.com",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/users/get-public-data", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data)
      return setProfileData({
        ...profileData, 
        name: data.data.username,
        email: data.data.email,
        about: data.data.bio
      });
    };
    fetchData();
  }, []);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setEditMode(false);
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-3xl font-semibold text-gray-100">Profile</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="mb-1 block text-gray-200">
              Name
            </label>
            {editMode ? (
              <input
                type="text"
                name="name"
                id="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-700 px-3 py-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            ) : (
              <div className="rounded-md bg-gray-700 px-3 py-2 text-gray-200">
                {profileData.name}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-gray-200">
              Email
            </label>
            {editMode ? (
              <input
                type="email"
                name="email"
                id="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-700 px-3 py-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            ) : (
              <div className="rounded-md bg-gray-700 px-3 py-2 text-gray-200">
                {profileData.email}
              </div>
            )}
          </div>
          <blockquote contentEditable="true">
  <p>Edit this content to add your own quote</p>
</blockquote>

          <div>
            <label htmlFor="about" className="mb-1 block text-gray-200">
              About
            </label>
            <p contentEditable = {editMode}></p>
            {editMode ? (
              <textarea
                name="about"
                id="about"
                value={profileData.about}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-md bg-gray-700 px-3 py-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Tell us something about yourself"
              ></textarea>
            ) : (
              <div className="rounded-md bg-gray-700 px-3 py-2 text-gray-200">
                {profileData.about}
              </div>
            )}
          </div>
          {editMode ? (
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setEditMode(!editMode)}
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
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

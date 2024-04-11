"use client";
import React, { useState, useEffect } from "react";


const Profile = ({
    params,
}: {
    params: { username: string };
}) => {

    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        about: "",
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/users/${params.username}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            return setProfileData({
                ...profileData,
                name: data.data.fullname,
                email: data.data.email,
                about: data.data.bio
            });
        };
        fetchData();
    }, []);
    const updateData = async () => {
        const newBio = profileData.about
        const newName = profileData.name
        const res = await fetch("/api/users/update-user-profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newBio, newName }),
        });
    }
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setEditMode(false);
        updateData();
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
                    <div>
                        <label htmlFor="about" className="mb-1 block text-gray-200">
                            About
                        </label>
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
                            onClick={(e) => {
                                e.preventDefault();
                                return setEditMode(true)
                            }}
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

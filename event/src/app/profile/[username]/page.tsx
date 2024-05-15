"use client";
import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Profile = ({ params }: { params: { username: string } }) => {
  const [profileData, setProfileData] = useState({
    _id: "",
    name: "",
    email: "",
    about: "",
    img: "/stock-user.jpeg",
    role: "",
  });
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);

  const { userData } = useContext(UserContext);

  const fetchData = React.useCallback(async () => {
    const response = await fetch(`/api/users/${params.username}`);
    const data = await response.json();
    console.log(data);
    if (!data.data) {
      router.push("/404");
      return;
    }
    if (!data.data.profile_pic) {
      data.data.profile_pic = "/stock-user.jpeg";
    }
    return setProfileData((prevState) => ({
      ...prevState,
      _id: data.data._id,
      name: data.data.fullname,
      email: data.data.email,
      about: data.data.bio,
      img: data.data.profile_pic,
    }));
  }, [params.username, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData, userData]);

  const updateData = async () => {
    const newBio = profileData.about;
    const newName = profileData.name;

    const res = await fetch("/api/users/update-user-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newBio, newName }),
    });

    if (!res.ok) {
      console.log("res not ok");
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setEditMode(false);
    updateData();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
     <div className="flex w-full max-w-screen-md flex-col gap-12 px-12 sm:flex-row rounded-lg bg-gradient-to-r from-pink-100 to-rose-200 p-8 shadow-md">
  {/* Left panel starts here */}
  <div className="mx-auto mt-8">
    <div className="flex h-36 w-36 flex-col items-center justify-center">
      <Image
        className="rounded-full"
        src={profileData.img ?? "/stock-user.jpeg"}
        alt="profile pic"
        width={150}
        height={150}
      />
    </div>
    <div className="text-center text-base">
      <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">
        {profileData.name}
      </h3>
      <p className="text-base font-semibold leading-6 text-indigo-600">
        {profileData.role}
      </p>
    </div>
  </div>
  {/* Left panel ends here */}

  {/* Right panel starts here */}
  <div className="w-full">
    <div className="flex justify-between px-4 sm:px-0">
      <h3 className="text-lg font-semibold leading-7 text-gray-900">
        Profile Information
      </h3>
      {userData?.userId === profileData._id && (
        <div>
          {editMode ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-md bg-gradient-to-r from-red-500 to-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                return setEditMode(true);
              }}
              className="w-full rounded-md bg-gradient-to-r from-red-500 to-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            >
              Edit Profile
            </button>
          )}
        </div>
      )}
    </div>
    <div className="mt-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-base font-medium leading-6 text-gray-900">
            Full name
          </dt>
          {editMode ? (
            <input
              type="text"
              name="name"
              id="name"
              value={profileData.name}
              onChange={handleChange}
              className="h-8 w-full rounded-md px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring focus:ring-blue-500 sm:col-span-2"
              required
            />
          ) : (
            <dd className="mt-1 h-8 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profileData.name}
            </dd>
          )}
        </div>

        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-base font-medium leading-6 text-gray-900">
            Email address
          </dt>
          <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {profileData.email}
          </dd>
        </div>

        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-base font-medium leading-6 text-gray-900">
            Bio
          </dt>
          {editMode ? (
            <textarea
              name="about"
              id="about"
              value={profileData.about}
              onChange={handleChange}
              rows={5}
              className="h-32 w-full rounded-md px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring focus:ring-blue-500 sm:col-span-2"
              required
            />
          ) : (
            <dd className="mt-1 h-32 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profileData.about}
            </dd>
          )}
        </div>
      </dl>
    </div>
  </div>
  {/* Right panel ends here */}
</div>

    </>
  );
};

export default Profile;

"use client";
import React from "react";

type UserContextType = {
  userData: UserData;
  login: (user: UserData) => void;
  logout: () => void;
};

type UserData = {
  fullname: string;
  email: string;
  username: string;
  isSubscribed: boolean;
} | null;

export const UserContext = React.createContext<UserContextType>({
  userData: null,
  login: () => {},
  logout: () => {},
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = React.useState<UserData>(null);

  const login = (user: UserData) => {
    setUserData(user);
  };

  const logout = () => {
    setUserData(null);
  };

  const value = {
    userData,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

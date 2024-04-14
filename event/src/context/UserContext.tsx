"use client";
import React from "react";

type UserContextType = {
  userData: UserData;
  login: (user: UserData) => void;
  logout: () => void;
};

export type UserData = {
  //   fullname: string;
  //   email: string;
  userId: string;
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

  const login = React.useCallback((user: UserData) => {
    setUserData(user);
  }, []);

  const logout = React.useCallback(() => {
    setUserData(null);
  }, []);

  const value = {
    userData,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

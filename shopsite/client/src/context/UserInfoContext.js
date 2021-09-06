import React, { useContext, useState } from "react";
import jwtDecode from "jwt-decode";
const UserInfoContext = React.createContext();
const UserInfoUpdateContext = React.createContext();
const RoleContext = React.createContext();

export function useUserInfo() {
  return useContext(UserInfoContext);
}

export function useUpdateUserInfo() {
  return useContext(UserInfoUpdateContext);
}
export function useRoleContext() {
  return useContext(RoleContext);
}
export function UserInfoProvider({ children }) {
  const [, setUserInfo] = useState(sessionStorage.getItem("UserInfo"));

  return (
    <UserInfoContext.Provider value={sessionStorage.getItem("UserInfo")}>
      <UserInfoUpdateContext.Provider value={setUserInfo}>
        <RoleContext.Provider
          value={
            !!sessionStorage.getItem("UserInfo")
              ? jwtDecode(sessionStorage.getItem("UserInfo")).role
              : "Guest"
          }
        >
          {children}
        </RoleContext.Provider>
      </UserInfoUpdateContext.Provider>
    </UserInfoContext.Provider>
  );
}

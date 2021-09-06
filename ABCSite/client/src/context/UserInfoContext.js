import React, { useContext, useState } from 'react'
const UserInfoContext = React.createContext();
const UserInfoUpdateContext = React.createContext();
 
export function useUserInfo(){
    return useContext(UserInfoContext)
}
 
export function useUpdateUserInfo(){
    return useContext(UserInfoUpdateContext)
}

export function UserInfoProvider({ children }) {
    const [, setUserInfo] = useState(sessionStorage.getItem('UserInfo'))
 
    return (
        <UserInfoContext.Provider value={sessionStorage.getItem('UserInfo')}>
            <UserInfoUpdateContext.Provider value={setUserInfo}>
                {children}
            </UserInfoUpdateContext.Provider>
        </UserInfoContext.Provider>)
}
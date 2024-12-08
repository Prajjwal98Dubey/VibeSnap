/* eslint-disable react/prop-types */
import { useState } from "react";
import UserDetailsContext from "./UserDetails";

function UserDetailsContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserDetailsContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export default UserDetailsContextProvider;

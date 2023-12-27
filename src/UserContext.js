import { useState } from "react";
import { createContext } from "react";
const UserContext = createContext();
function UserProvider({ children }) {
  const [jwt, setJwt] = useState("");
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider
      value={{
        jwt: jwt,
        setJwt: setJwt,
        role: role,
        setRole: setRole,
        username: username,
        setUsername: setUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
export { UserContext };

import React, { useContext } from "react";

const UserContext = React.createContext();

const useUser = () => {
  const { isLogged, setIsLogged, darkTheme, setDarkTheme } =
    useContext(UserContext);
  return { isLogged, setIsLogged, darkTheme, setDarkTheme };
};

function StateProvider({
  children,
  isLogged,
  setIsLogged,
  darkTheme,
  setDarkTheme,
}) {
  return (
    <UserContext.Provider
      value={{ isLogged, setIsLogged, darkTheme, setDarkTheme }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { StateProvider, useUser };

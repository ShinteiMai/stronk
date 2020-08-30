import React, { useState, useEffect, useContext, useMemo } from "react";
import { AsyncStorage } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
// import Application from "./navigation/index";

import { UserContext } from "./Contexts/UserContext";
import { isAuthContext } from "./Contexts/isAuthContext";
import { isLoadingContext } from "./Contexts/isLoadingContext";
import { CheckAuthStatus } from "./components/Auth/CheckAuth";
import Dummy from "./tools-buffer/dummy";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // const { isLoading, isLoadingMessage, setIsLoading, setIsLoadingMessage } = useContext(isLoadingContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessage, setIsLoadingMessage] = useState(" ");
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({
    id: "",
    email: "",
  });

  // const userValues = useMemo(() => ({ user, setUser }), [user, setUser]);

  const userValues = {
    ...user,
    setUser,
  };

  // const isAuthValues = {
  //   isAuth,
  //   setIsAuth,
  // };

  const isAuthValues = useMemo(() => ({
    isAuth,
    setIsAuth,
  }), [isAuth, setIsAuth]);

  // const isLoadingValues = {
  //   isLoading,
  //   isLoadingMessage,
  //   setIsLoading,
  // setIsLoadingMessage,
  // };

  const isLoadingValues = useMemo(() => ({
    isLoading,
    isLoadingMessage,
    setIsLoading,
    setIsLoadingMessage,
  }), [isLoading, isLoadingMessage, setIsLoading, setIsLoadingMessage]);

  useEffect(() => {
    const checkAuth = async () => await CheckAuthStatus({ setUser, setIsAuth });
    checkAuth();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <isLoadingContext.Provider value={isLoadingValues}>

          <UserContext.Provider value={userValues}>
            <isAuthContext.Provider value={isAuthValues}>
              <PaperProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </PaperProvider>
            </isAuthContext.Provider>
          </UserContext.Provider>
        </isLoadingContext.Provider>
      </SafeAreaProvider>
    );
  }
}
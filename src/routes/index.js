import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { TabRoutes } from "./tabs.routes";
import { LoginScreen } from "../screens/Login";
import Toast from 'react-native-toast-message'


export function Routes() {

  const [isLogged, setIsLogged] = useState(false)

  const handleLoginSuccess = () => {
    setIsLogged(true);
  };

  return (

    <>

      <NavigationContainer>

        {
          isLogged ? (
            <TabRoutes />
          ) : (
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          )
        }



      </NavigationContainer>

    </>

  )
}
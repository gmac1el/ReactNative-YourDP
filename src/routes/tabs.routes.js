import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

// import { Justificativa } from "../screens/Justificativa";

import JustificativaForm from '../screens/Justificativa/index'

import { Home } from "../screens/Home";
import { Ferias } from "../screens/Ferias";
import { ContraCheque } from "../screens/ContraCheque";

const { Screen, Navigator } = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 15,
          color: '#2D1CC6',
          marginBottom: 10
        }
      }}
    >
      <Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarStyle: {
            height: 75,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {
              width: 4,
              height: 8,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            borderTopLeftRadius: 30.5,
            borderTopRightRadius: 30.5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            overflow: 'hidden',

          },
          tabBarIcon: ({ focused }) => {
            const iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={25} color='#2D1CC6' />;
          }
        }}
        component={Home}

      />

      <Screen
        name="ContraCheque"
        options={{
          headerShown: false,
          tabBarStyle: {
            height: 75,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {
              width: 4,
              height: 8,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            borderTopLeftRadius: 30.5,
            borderTopRightRadius: 30.5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            overflow: 'hidden',

          },
          tabBarIcon: ({ focused }) => {
            const iconName = focused ? 'reader' : 'reader-outline';
            return <Ionicons name={iconName} size={25} color='#2D1CC6' />;
          }
        }}
        component={ContraCheque}

      />

      <Screen
        name="Ausência"
        options={{
          headerShown: false,
          tabBarStyle: {
            height: 75,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {
              width: 4,
              height: 8,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            borderTopLeftRadius: 30.5,
            borderTopRightRadius: 30.5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            overflow: 'hidden',

          },
          tabBarIcon: ({ focused }) => {
            const iconName = focused ? 'document-attach' : 'document-attach-outline';
            return <Ionicons name={iconName} size={25} color='#2D1CC6' />;
          }
        }}
        component={JustificativaForm}
      />

      <Screen
        name="Férias"
        options={{
          headerShown: false,
          tabBarStyle: {
            height: 75,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {
              width: 4,
              height: 8,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            borderTopLeftRadius: 30.5,
            borderTopRightRadius: 30.5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            overflow: 'hidden',

          },
          tabBarIcon: ({ focused }) => {
            const iconName = focused ? 'airplane' : 'airplane-outline';
            return <Ionicons name={iconName} size={25} color='#2D1CC6' />;
          }
        }}
        component={Ferias}

      />

    </Navigator>
  )
}
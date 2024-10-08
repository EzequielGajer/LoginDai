import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './react/screens/LoginScreen';
import RegisterScreen from './react/screens/RegisterScreen'; // Importar la pantalla de registro
import EventsScreen from './react/screens/EventsScreen';
import DetalleEventsScreen from './react/screens/DetalleEventsScreen.js';
import { Ionicons } from "@expo/vector-icons";



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="DetalleEvents" component={DetalleEventsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

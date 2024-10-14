import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Navigation container para envolver la navegación
import { createStackNavigator } from '@react-navigation/stack'; // Stack navigator
// import { createNativeStackNavigator } from '@react-navigation/native'; // Stack navigator
// const Stack= createNativeStackNavigator();
// // Tus pantallas
import { SafeAreaProvider,useSafeAreaInsets } from 'react-native-safe-area-context';

import LoginScreen from './react/screens/LoginScreen';
import RegisterScreen from './react/screens/RegisterScreen'; 
import EventsScreen from './react/screens/EventsScreen';
import DetalleEventsScreen from './react/screens/DetalleEventsScreen.js';
import CategoriasScreen from './react/screens/CategoriaScreen.js'; // Revisa el nombre

// Crear el Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"> {/* Define la pantalla inicial */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="EventsScreen" component={EventsScreen} />  {/* Asegúrate de que los nombres coincidan */}
        <Stack.Screen name="DetalleEventsScreen" component={DetalleEventsScreen} />
        <Stack.Screen name="CategoriasScreen" component={CategoriasScreen} /> {/* Nombre cambiado a 'CategoriasScreen' */}
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>

  );
}

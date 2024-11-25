// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native'; // Navigation container para envolver la navegación
// import { createStackNavigator } from '@react-navigation/stack'; // Stack navigator
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// // Importar las pantallas
// import LoginScreen from './react/screens/LoginScreen';
// import RegisterScreen from './react/screens/RegisterScreen'; 
// import EventsScreen from './react/screens/EventsScreen';
// import DetalleEventsScreen from './react/screens/DetalleEventsScreen'; 
// import CategoriaScreen from './react/screens/CategoriaScreen'; // Corregido nombre del archivo

// // Crear el Stack Navigator
// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login"> {/* Define la pantalla inicial */}
//           {/* Asegúrate de que no hay nada extraño entre estos Stack.Screen */}
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Register" component={RegisterScreen} />
//           <Stack.Screen name="EventsScreen" component={EventsScreen} />
//           <Stack.Screen name="DetalleEventsScreen" component={DetalleEventsScreen} />
//           <Stack.Screen name="CategoriaScreen" component={CategoriaScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );  
// }
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './react/screens/LoginScreen';
import RegisterScreen from './react/screens/RegisterScreen'; // Importar la pantalla de registro
import EventsScreen from './react/screens/EventsScreen';
import DetalleEventsScreen from './react/screens/DetalleEventsScreen.js';
import CategoriaScreen from './react/screens/CategoriaScreen.js';

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
        <Stack.Screen name="CategoriaScreen" component={CategoriaScreen} />
        {/* <Stack.Screen name="EventsCategoryScreen" component={EventsCategoryScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
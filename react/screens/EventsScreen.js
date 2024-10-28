import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getEventos } from "../../utils/api";
import { NavigationContainer } from '@react-navigation/native'; // Navigation container para envolver la navegación
import { createStackNavigator } from '@react-navigation/stack'; // Stack navigator

const EventsScreen = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchEventos = async () => {
    try {
      const data = await getEventos();
      const uniqueEventos = Array.from(new Set(data.events.map(e => e.id))) // Elimina duplicados
        .map(id => data.events.find(e => e.id === id));
      setEventos(uniqueEventos); // Almacena los eventos únicos
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const renderEventItem = (item) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.eventDetails}>
          Fecha: {new Date(item.start_date).toLocaleDateString()}
        </Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate("DetalleEvents", { eventId: item.id })}
        >
          <Text style={styles.moreButtonText}>Ver más</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>EVENTOS</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {eventos.length > 0 ? (
          eventos.map(renderEventItem)
        ) : (
          <Text style={styles.noEventsText}>No hay eventos disponibles</Text>
        )}
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    alignItems: 'center',
  },
  eventName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  eventDetails: {
    fontSize: 12,
    color: '#888',
    marginBottom: 20,
  },
  moreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 30,
  },
  noEventsText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
});
//cambiarlo y probar este
// export default EventsScreen;
// import React, { useState, useEffect } from "react";
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native"; // useRoute para obtener parámetros de navegación
// import axios from "axios";

// const EventsScreen = () => {
//   const [eventos, setEventos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { category } = route.params || {}; // Obtén el parámetro category de la ruta

//   const fetchEventos = async () => {
//     try {
//       // Seleccionar la URL según si category tiene valor o no
//       const url = category
//         ? "https://famous-abnormally-calf.ngrok-free.app/api/event-category/searchEvents"
//         : "https://famous-abnormally-calf.ngrok-free.app/api/event";

//       const params = category ? { category } : {}; // Incluye el parámetro de categoría si está presente

//       // Solicitud con axios
//       const response = await axios.get(url, { params });
//       const uniqueEventos = Array.from(new Set(response.data.events.map(e => e.id))) // Elimina duplicados
//         .map(id => response.data.events.find(e => e.id === id));
//       setEventos(uniqueEventos);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error al obtener los eventos:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEventos();
//   }, [category]); // Llama a fetchEventos cada vez que category cambia

//   const renderEventItem = (item) => (
//     <View key={item.id} style={styles.card}>
//       <View style={styles.cardContent}>
//         <Text style={styles.eventName}>{item.name}</Text>
//         <Text style={styles.eventDescription} numberOfLines={2}>
//           {item.description}
//         </Text>
//         <Text style={styles.eventDetails}>
//           Fecha: {new Date(item.start_date).toLocaleDateString()}
//         </Text>
//         <TouchableOpacity
//           style={styles.moreButton}
//           onPress={() => navigation.navigate("DetalleEvents", { eventId: item.id })}
//         >
//           <Text style={styles.moreButtonText}>Ver más</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>EVENTOS</Text>
//       <ScrollView contentContainerStyle={styles.listContainer}>
//         {eventos.length > 0 ? (
//           eventos.map(renderEventItem)
//         ) : (
//           <Text style={styles.noEventsText}>No hay eventos disponibles</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#444',
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: 15,
//     padding: 20,
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   cardContent: {
//     alignItems: 'center',
//   },
//   eventName: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#007bff',
//     marginBottom: 10,
//   },
//   eventDescription: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   eventDetails: {
//     fontSize: 12,
//     color: '#888',
//     marginBottom: 20,
//   },
//   moreButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   moreButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   listContainer: {
//     paddingBottom: 30,
//   },
//   noEventsText: {
//     textAlign: 'center',
//     color: '#888',
//     fontSize: 16,
//     marginTop: 20,
//   },
// });

// export default EventsScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native'; // Navigation container para envolver la navegación
import { createStackNavigator } from '@react-navigation/stack'; // Stack navigator

const DetalleEventsScreen = ({ route, navigation }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const baseUrl = "https://famous-abnormally-calf.ngrok-free.app"; 
  const { eventId } = route.params;

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      let url = `${baseUrl}/api/event/${eventId}`;
      // console.log('url', url);
      // console.log('eventId', eventId);
      const response = await axios.get(url);
      console.log('datos', response.data);
      setEvent(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los detalles del evento:", error);
      Alert.alert("Error", "Hubo un problema al obtener los detalles del evento.");
      setLoading(false);
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
  };

  const handleSubscribe = async (eventId, showAlert) => {
    setLoadingAction(true);
    try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
            showAlert("Error", "No estás autenticado. Por favor, inicia sesión.");
            return;
        }

        // Realiza la solicitud de suscripción y verifica solo el estado
        const response = await axios.post(`${baseUrl}/api/event/${eventId}/enrollment`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 201) {
            showAlert("Suscripción exitosa", "¡Te has suscrito al evento con éxito!");
        } else {
            showAlert("Error", "Hubo un problema al suscribirse. Inténtalo nuevamente.");
        }
    } catch (error) {
        console.error("Error al suscribirse:", error);
        showAlert("Error", "No se pudo realizar la suscripción");
    } finally {
        setLoadingAction(false);
    }
};


//   const handleUnsubscribe = async (eventId, showAlert) => {
//     setLoadingAction(true);
//     try {
//         // Realiza la solicitud de desuscripción sin token en las cabeceras
//         await axios.delete(`${baseUrl}/api/event/${eventId}/enrollment`);

//         showAlert("Desuscripción exitosa", 'Te has desuscrito del evento.');
//     } catch (error) {
//         console.error("Error al desuscribirse:", error);
//         showAlert("Error", "No se pudo realizar la desuscripción");
//     } finally {
//         setLoadingAction(false);
//     }
// };

  
  


  // const handleSubscribe = async () => {
  //   setLoadingAction(true);
  //   try {
  //     await axios.post(`${baseUrl}/api/event/${eventId}/enrollment`);
  //     showAlert(event.name, 'Suscripción exitosa!');
  //   } catch (error) {
  //     console.error("Error al suscribirse:", error);
  //     showAlert("Error", "No se pudo realizar la suscripción");
  //   } finally {
  //     setLoadingAction(false);
  //   }
  // };

  // const handleUnsubscribe = async () => {
  //   setLoadingAction(true);
  //   try {
  //     await axios.delete(`${baseUrl}/api/event/${eventId}/enrollment/attended`);
  //     showAlert(event.name, 'Te has desuscrito del evento.');
  //   } catch (error) {
  //     console.error("Error al desuscribirse:", error);
  //     showAlert("Error", "No se pudo realizar la desuscripción");
  //   } finally {
  //     setLoadingAction(false);
  //   }
  // };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
    }
    
    if (!event) {
    return (
      <View style={styles.container}>
      <Text style={styles.errorText}>Error al cargar los detalles del evento</Text>
      </View>
    );
    }
  
  const isFutureEvent = new Date(event.start_date) > new Date();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EVENTO</Text>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={styles.eventDate}>{new Date(event.start_date).toLocaleDateString()}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
        <View style={styles.eventDetails}>
          <Text style={styles.detailText}>Categoría: {event.id_event_category}</Text>
          <Text style={styles.detailText}>Ubicación: {event.id_event_location}</Text>
          <Text style={styles.detailText}>Duración en minutos: {event.duration_in_minutes}</Text>
          <Text style={styles.detailText}>Precio: ${event.price}</Text>
          <Text style={styles.detailText}>Capacidad: {event.max_assistance}</Text>
        </View>

        {isFutureEvent ? (
          <View style={styles.subscriptionContainer}>
            <TouchableOpacity
              style={[styles.button, event.subscribed ? styles.unsubscribeButton : styles.subscribeButton]}
              onPress={event.subscribed ? handleUnsubscribe : handleSubscribe}
              disabled={loadingAction}
            >
              <Text style={styles.buttonText}>
                {event.subscribed ? 'DESUSCRIBIRSE' : 'SUSCRIBIRSE'}
              </Text>
            </TouchableOpacity>
            
          </View>
        ) : (
          <View style={styles.attendeesContainer}>
            <Text style={styles.attendeesTitle}>INSCRITOS</Text>
            <FlatList
              data={event.attended}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.attendeeItem}>
                  <Text style={styles.attendeeName}>{item.name}</Text>
                  <Ionicons
                    name={item.attended ? "checkmark-circle" : "close-circle"}
                    size={24}
                    color={item.attended ? "#4CAF50" : "#F44336"}
                  />
                </View>
              )}
            />
          </View>
          
        )}
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Events')}>
          <Ionicons name="calendar-outline" size={24} color="#4c669f" />
          <Text style={styles.tabText}>Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
                style={styles.tabItem} 
                onPress={() => navigation.navigate('CategoriaScreen')}  // Asegúrate que el nombre coincide con App.js
              >
                <Ionicons name="search-outline" size={24} color="#4c669f" />
                <Text style={styles.tabText}>Categorías</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons name="person-outline" size={24} color="#4c669f" />
          <Text style={styles.tabText}>Perfil</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Login')}>
          <Ionicons name="menu-outline" size={24} color="#4c669f" />
          <Text style={styles.tabText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventContent: {
    flex: 1,
    padding: 16,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  eventDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  eventDetails: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 8,
  },
  subscriptionContainer: {
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeButton: {
    backgroundColor: '#4CAF50',
  },
  unsubscribeButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attendeesContainer: {
    flex: 1,
  },
  attendeesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  attendeeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  attendeeName: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default DetalleEventsScreen;

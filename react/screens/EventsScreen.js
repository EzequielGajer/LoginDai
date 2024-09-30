import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getEventos } from "../../utils/api";
 // Importa la función de la API

const EventsScreen = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchEventos = async () => {
    console.log("Buscando eventos")
    try {
      const data = await getEventos(); // Llama a la función getEventos desde api.js
      console.log("Datos recibidos:", data.events.length); // Para depuración
      setEventos(data.events); // Asumimos que los eventos están en data.events
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
    <TouchableOpacity
      key={item.id}
      style={styles.eventContainer}
      onPress={() =>
        navigation.navigate("DetalleEventosScreen", { eventId: item.id })
      }
    >
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.eventDetails}>
        Fecha: {new Date(item.start_date).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#f0f0f0', // Fondo gris claro
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24,
      textAlign: 'center',
      color: '#333', // Color de texto
    },
    input: {
      height: 45,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 12,
      backgroundColor: '#fff', // Fondo blanco para los campos de entrada
    },
    errorText: {
      color: 'red',
      marginBottom: 16,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#007bff', // Color de fondo del botón
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff', // Color de texto del botón
      fontSize: 16,
      fontWeight: 'bold',
    },
    registerButton: {
      marginTop: 20,
      alignItems: 'center',
    },
    registerText: {
      color: '#007bff',
      fontSize: 14,
      textDecorationLine: 'underline',
    },
  });

  
export default EventsScreen;

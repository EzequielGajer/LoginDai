import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CategoriaScreen = () => {
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = "https://famous-abnormally-calf.ngrok-free.app";

  useEffect(() => {
    categoriasFetch();
  }, []);

  const categoriasFetch = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/event-category`);
      console.log(response.data); // Para depurar la respuesta de la API
      setCategorias(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al mostrar las categorias", error);
      Alert.alert("Error", "Error al mostrar las categorias.");
      setLoading(false);
    }
  };

  const handlePress = (categoria) => {
    navigation.navigate('EventsScreen', { categoria });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoriaItem} onPress={() => handlePress(item.name)}>
      <Text style={styles.categoriaText}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CATEGORÍAS</Text>
      <FlatList
        data={categorias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
    color: '#4c669f'
  },
  categoriaItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  categoriaText: {
    fontSize: 18,
    color: '#333'
  }
});

export default CategoriaScreen;

import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native'; // Navigation container para envolver la navegación
import { createStackNavigator } from '@react-navigation/stack'; // Stack navigator

// Datos de categorías
const categorias = [
  { id: '1', nombre: 'Deportivos' },
  { id: '2', nombre: 'Educativos' },
  { id: '3', nombre: 'Empresariales' },
  { id: '4', nombre: 'Gastronómicos' },
  { id: '5', nombre: 'Museos' },
  { id: '6', nombre: 'Obras Teatrales' },
  { id: '7', nombre: 'Recitales' },
  { id: '8', nombre: 'Sociales' }
];

const CategoriaScreen = () => {
  const navigation = useNavigation();

  const handlePress = (categoria) => {
    navigation.navigate('EventsScreen', { categoria });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoriaItem} onPress={() => handlePress(item.nombre)}>
      <Text style={styles.categoriaText}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CATEGORÍAS</Text>
      <FlatList
        data={categorias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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

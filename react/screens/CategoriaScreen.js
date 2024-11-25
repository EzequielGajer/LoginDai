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
     flex: 1,     padding: 16,
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
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import Navbar from '../components/Navbar'; //fijarse que hacer con esto


// export default function CategoriaScreen({ navigation }) {
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchCategories();
//   }, []);
// // chequear esta funcion
//   const fetchCategories = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (!token) {
//         setError('No se encontró el token');
//         return;
//       }
// //cambiar el link de ngrok
//       const response = await axios.get('https://open-moderately-silkworm.ngrok-free.app/api/event-category', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setCategories(response.data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleCategoryPress = (categoryId) => {
//     navigation.navigate('EventsByCategoryScreen', { categoryId });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>CATEGORÍAS</Text>
//       </View>
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//       <FlatList
//         data={categories}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item.id)}>
//             <Text style={styles.categoryText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       <Navbar />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     backgroundColor: '#cfc0fe',
//     padding: 16,
//     marginTop: 40,
//   },
//   headerText: {
//     textAlign: 'center',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 12,
//   },
//   categoryItem: {
//     padding: 12,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 8,
//     marginVertical: 6,
//   },
//   categoryText: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });
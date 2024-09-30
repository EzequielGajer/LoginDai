import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { register } from '../../utils/api.js';


const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
        /*
         const response = await axios.post('https://famous-abnormally-calf.ngrok-free.app/api/user/register', {
              'first_name': "Ronitossssoo",
              'last_name': "Chmielevsky",
              'username': "roni@gmail.com",
              'password': "ronchm124"
          });
        */

          /*
            const response = await axios.post('https://famous-abnormally-calf.ngrok-free.app/api/user/register', {
                'first_name': nombre,
                'last_name':apellido,
                'username':username,
                'password':password
              });
          */
         const response = await register(nombre, apellido, username, password);

      if (response.success) {
        Alert.alert('Registro Exitoso', 'Te has registrado correctamente.');
        // Aquí redirigimos al login
        navigation.navigate('Events');
      } else {
        Alert.alert('Error', 'No se pudo registrar el usuario.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema durante el registro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRACION</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTRARSE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5f3dc4',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegisterScreen;

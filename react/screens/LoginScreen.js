import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseUrl = 'https://famous-abnormally-calf.ngrok-free.app';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('pablo.ulman@ort.edu.ar');
  const [password, setPassword] = useState('pabulm101');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Attempting to log in with:', { username, password });
      const response = await axios.post(`${baseUrl}/api/user/login`, { username, password });
      console.log('Login response:', response.data);
  
      if (response.data.success) {
        const token = response.data.token;
        await AsyncStorage.setItem('authToken', token); // Guarda el token
        alert('Login completado');
        navigation.navigate('Events');
      } else {
        const errorMessage = response.data.message || 'Error desconocido';
        setError(errorMessage);
        console.log('Error message from response:', errorMessage);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.log('Error caught in catch block:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Botón para redirigir a la pantalla de registro */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Si no tienes cuenta, regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
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

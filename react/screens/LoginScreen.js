import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { login } from '../../utils/api';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('pablo.ulman@ort.edu.ar');
  const [password, setPassword] = useState('pabulm101');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Attempting to log in with:', { username, password });
      const response = await login(username, password);
      console.log('Login response:', response);
  
      if (response.success) {
        alert('Login completado');
        navigation.navigate('Events');

      } else {
        // Manejar otros casos de error
        const errorMessage = response.message || 'Error desconocido'; 
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

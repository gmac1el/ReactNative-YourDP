import React, { useState } from "react";



import * as SecureStore from 'expo-secure-store';

import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";

import axios from 'axios';

export function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {

    try {
      setIsLoading(true);



      const response = await axios.post('https://api-yourdp.onrender.com/auth/user', {
        email,
        password,
      });

      console.log(response)

      if (response.data.token) {
        await SecureStore.setItemAsync('token', response.data.token);
        await SecureStore.setItemAsync('idUser', response.data.idUser);
        onLoginSuccess();
      } else {
        Alert.alert('Erro', response.data.message);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error('Erro ao fazer login:', err);

      Alert.alert('Erro', 'Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.heading}>Login</Text> */}
      <Image style={styles.imageLogo} source={require('../../../assets/LogoApp.webp')} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />


      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.textBtn}>Entrar</Text>
      </TouchableOpacity>
      {isLoading && <ActivityIndicator />}
    </SafeAreaView>
  );



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  btn: {
    backgroundColor: '#2D1CC6',
    borderRadius: 20,
    width: 355,
    height: 58,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 10,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  textBtn: {
    fontWeight: '500',
    fontSize: 24,
    color: '#FFFFFF',
  },
  imageLogo: {
    marginBottom: 20,
  }
});
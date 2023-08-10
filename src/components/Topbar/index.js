import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';



import * as SecureStore from 'expo-secure-store';
import Toast from "react-native-toast-message";
export function TopBar({ onUserDataLoaded }) {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Recupere o token usando o expo-secure-store
        const token = await SecureStore.getItemAsync('token');
        const id = await SecureStore.getItemAsync('idUser');

        if (token) {

          const response = await fetch(`https://api-yourdp.onrender.com/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            onUserDataLoaded(data);
            // console.log(data)
            setUserData(data);
          } else {
            // Lidere com a resposta de erro da API
            Toast.show({
              type: "error",
              text1: "Erro ao obter dados do usuário",
              text2: "Ocorreu um erro na solicitação",
            });
          }
        } else {
          // Lidere o caso em que não há token armazenado
          Toast.show({
            type: "error",
            text1: "Erro de autenticação",
            text2: "Você não está autenticado",
          });
        }
      } catch (error) {
        // Lidere os erros de rede ou outros erros
        Toast.show({
          type: "error",
          text1: "Erro ao obter dados do usuário",
          text2: error.message,
        });
      }
    };

    fetchUserData();
  }, []);


  const userDataName = userData?.msg?.name ? userData.msg.name : 'Carregando...'
  // console.log(userDataName);

  // console.log(userData)


  return (


    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

      <View style={styles.topBar}>
        <View style={styles.contentUser}>
          <Image style={styles.userImage} source={require('./../../../assets/iconDefautlt.jpg')} />
          <Text style={styles.userName}>{userDataName}</Text>
        </View>
        <View style={styles.contentInfo}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </View>

      </View>

    </View>



  )
}



const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 90,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 100,
    marginBottom: 40

  },
  contentUser: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  },
  contentInfo: {

  },
});
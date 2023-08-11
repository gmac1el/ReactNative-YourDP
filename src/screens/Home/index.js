import React, { useState, useEffect } from "react";
import { Container } from "../Styles";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'

import * as SecureStore from 'expo-secure-store';

// import * as SecureStore from 'expo-secure-store';
// import jwt from 'jsonwebtoken';
// import { Buffer } from "buffer";
// import Constants from 'expo-constants';
// import jwtDecode from 'jwt-decode';
// import { Buffer } from "buffer"




import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  watchHeadingAsync,
  LocationAccuracy
} from 'expo-location'

import MapView, { Marker } from "react-native-maps";


import { TopBar } from "../../components/Topbar";
import { DateComponent } from "./components/DateComponent";
import { ButtonPoint } from "../../components/Button";
import { InputInfo } from "./components/InputInfo";




export function Home() {

  //Senac Lat: -8.052366292279732, Long:-34.88525659188676
  //Casa latitude: -7.9895394, longitude: -34.8621279,



  const RADIUS = 700; // raio em metros
  const FIXED_LOCATION = {
    latitude: -7.9895394,
    longitude: -34.8621279,
  };


  //Calcula a distance entre os locais
  function calculateDistance(location1, location2) {
    const { latitude: lat1, longitude: lon1 } = location1;
    const { latitude: lat2, longitude: lon2 } = location2;
    const R = 6371e3; // raio da Terra em metros
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  const [location, setLocation] = useState(null);
  const [canPunch, setCanPunch] = useState(false);


  //PERMISSÃO DE USAR A LOCALIZAÇÃO
  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      if (currentPosition && currentPosition.coords) {
        setLocation(currentPosition);
      } else {
        console.error('Localização inválida ou ausente.');
      }
    }
  }


  useEffect(() => {
    requestLocationPermissions();
  }, []);

  //ATUALIZA A LOCALIZAÇÃO
  useEffect(() => {

    watchHeadingAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
    }, (response) => {
      console.log("Nova localização:", response)
      setLocation(response)
    });


  }, [])


  //VERIFICA SE A LOCALIZAÇÃO EXISTE E CALCULA A DISTÂNCIA
  // useEffect(() => {
  //   async function checkLocation() {
  //     if (location && location.coords) {
  //       const distance = calculateDistance(location.coords, FIXED_LOCATION);
  //       setCanPunch(distance >= RADIUS);
  //       // console.log(distance)
  //     }
  //   }

  //   checkLocation();
  // }, [location]);


  const [modalVisible, setModalVisible] = useState(false);


  const [userData, setUserData] = useState(null);

  // async function fetchModalData() {
  //   try {
  //     const id = await SecureStore.getItemAsync('idUser');

  //     // Verificar se o ID é válido antes de fazer a chamada à API
  //     if (id) {
  //       const response = await fetch(`https://api-yourdp.onrender.com/user/${id}`);
  //       const data = await response.json();
  //       setUserData(data.msg.ponto);
  //     } else {
  //       console.error('ID do usuário não encontrado.');
  //     }
  //   } catch (error) {
  //     console.error('Erro ao buscar informações do modal:', error);
  //   }
  // }

  const fetchListPonto = async () => {
    const id = await SecureStore.getItemAsync('idUser');

    try {

      const response = await fetch(`https://api-yourdp.onrender.com/user/${id}/listPontos`, {
        'Content-Type': 'application/json',
      })

      const data = await response.json()
      const newData = await data.msg.slice(1)
      setUserData(newData)
      console.log(data)

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchListPonto()
  }, [])

  const handleUserDataLoaded = (data) => {

  };

  function handleModalVisible() {
    setModalVisible(true)
    // fetchModalData()
    fetchListPonto()
  }



  console.log(userData)

  return (
    <Container>


      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollStyle} style={{ width: '100%' }}>

        <TopBar onUserDataLoaded={handleUserDataLoaded} />

        <View style={styles.mapContainer}>
          {
            location &&
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >

              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}

              />

            </MapView>
          }
        </View>

        <DateComponent />

        <ButtonPoint
          TextBtn={'Bater Ponto'}
          Status={canPunch}
        />

        <TouchableOpacity onPress={handleModalVisible} style={styles.btnRelato}><Text style={styles.text}>Últimos Registros</Text><Ionicons name="arrow-down" size={24} color="#000" /></TouchableOpacity>



      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>


          <View style={styles.table}>
            {/* Cabeçalho da tabela */}
            <View style={styles.tableRow}>
              <Text style={styles.tableHeaderCell}>data</Text>
              <Text style={styles.tableHeaderCell}>Entrada</Text>
              <Text style={styles.tableHeaderCell}>Pausa</Text>
              <Text style={styles.tableHeaderCell}>Volta</Text>
              <Text style={styles.tableHeaderCell}>Saida</Text>
            </View>

            {/* Dados da tabela */}
            {userData ? (
              userData.map((item) => (
                <View key={item._id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.data}</Text>
                  <Text style={styles.tableCell}>{item.entrada}</Text>
                  <Text style={styles.tableCell}>{item.intervalo}</Text>
                  <Text style={styles.tableCell}>{item.volta}</Text>
                  <Text style={styles.tableCell}>{item.saida}</Text>
                </View>
              ))
            ) : (
              <Text>Aguardando carregamento dos dados...</Text>
            )}
          </View>
          <TouchableOpacity style={styles.iconModal} title="Fechar Modal" onPress={() => setModalVisible(false)}>
            <Text style={styles.textModal}>x</Text>
          </TouchableOpacity>
        </View>
      </Modal>


    </Container>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 400,
  },
  mapContainer: {
    marginTop: -40,
    marginBottom: 30,
    width: '100%',
    height: 410,
    borderBottomWidth: 4,
    borderBottomColor: '#2D1CC6',
    borderTopWidth: 4,
    borderTopColor: '#2D1CC6',
    alignItems: "center",
    justifyContent: 'center',

  },
  scrollStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnRelato: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 355,
    height: 58,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  iconModal: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 50,
  },
  textModal: {
    fontWeight: '500',
    fontSize: 30,
    color: '#FFFFFF',
  },
  modalContainer: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // cor de fundo do modal (semi-transparente)
  },
  table: {
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 10,
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: '#CCCCCC',
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
})



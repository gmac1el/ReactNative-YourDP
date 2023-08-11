import { View, Button, StyleSheet, TouchableOpacity, Text, Alert, Modal } from "react-native";
import Toast from 'react-native-toast-message';
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

import * as LocalAuthentication from 'expo-local-authentication';

import { useState, useEffect } from "react";

import * as SecureStore from 'expo-secure-store';

import { DateComponent } from "../../screens/Home/components/DateComponent";

export function ButtonPoint(props) {
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Aviso',
      text2: 'Você está fora da área da empresa'
    });
  }

  const [isAuth, setIsAuth] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  async function verifyAvailableAuthentication() {
    const auth = await LocalAuthentication.hasHardwareAsync();
    console.log(auth);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(types.map(type => LocalAuthentication.AuthenticationType[type]));
  }

  async function handleAuthent() {
    const isBiometric = await LocalAuthentication.isEnrolledAsync();

    if (!isBiometric) {
      return Alert.alert('Error', 'Nenhuma biometria encontrada');
    }

    const authBiometric = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autenticação de biometria',
      fallbackLabel: 'Error na autenticação de biometria'
    });

    setIsAuth(authBiometric.success);
    setModalVisible(true); // Exibir o modal ao autenticar com sucesso
  }

  useEffect(() => {
    verifyAvailableAuthentication();
  }, [])

  const [date, setDate] = useState(new Date());
  const timeOptions = { hour: 'numeric', minute: 'numeric' }

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdatePoint = async () => {
    const token = await SecureStore.getItemAsync('token');
    const id = await SecureStore.getItemAsync('idUser');
    console.log(token, id);
    const url = `https://api-yourdp.onrender.com/user/${id}/updatePoint`;
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString([], timeOptions);

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ponto: {
          data: dateString,
          entrada: timeString,
          intervalo: "00:00",
          volta: "00:00",
          saida: "00:00"
        }
      })
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (data.msg) {
        Alert.alert(data.msg);
      } else {
        Alert.alert('Erro ao cadastrar o ponto');
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleUpdateLastPoint = async () => {
    const token = await SecureStore.getItemAsync('token');
    const id = await SecureStore.getItemAsync('idUser');
    console.log(token, id);
    const url = `https://api-yourdp.onrender.com/user/${id}/updateLastPoint`;
    const timeString = date.toLocaleTimeString([], timeOptions);

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        saida: timeString
      })
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (data.msg) {
        Alert.alert(data.msg);
      } else {
        Alert.alert('Erro ao cadastrar o ponto');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUpdateBreak = async () => {
    const token = await SecureStore.getItemAsync('token');
    const id = await SecureStore.getItemAsync('idUser');
    console.log(token, id);
    const url = `https://api-yourdp.onrender.com/user/${id}/updateBreak`;
    const timeString = date.toLocaleTimeString([], timeOptions);

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intervalo: timeString
      })
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (data.msg) {
        Alert.alert(data.msg);
      } else {
        Alert.alert('Erro ao cadastrar o ponto');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUpdateBreakLast= async () => {
    const token = await SecureStore.getItemAsync('token');
    const id = await SecureStore.getItemAsync('idUser');
    console.log(token, id);
    const url = `https://api-yourdp.onrender.com/user/${id}/updateBreakLast`;
    const timeString = date.toLocaleTimeString([], timeOptions);

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        volta: timeString
      })
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (data.msg) {
        Alert.alert(data.msg);
      } else {
        Alert.alert('Erro ao cadastrar o ponto');
      }
    } catch (error) {
      console.log(error);
    }
  };



  const ShowNotification = props.Status ? showToast : handleAuthent;

  //PEGAR TEMPO 
  const timeStringModal = date.toLocaleTimeString([], timeOptions);

  return (
    <View>
      <TouchableOpacity onPress={ShowNotification} style={[styles.btn, props.Status && styles.btnBlock]}>
        <Text style={styles.textBtn}>{props.TextBtn}</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>

          <Text style={styles.titleModal}>Escolha o tipo de ponto:</Text>

          <Text style={styles.timeModal}>{timeStringModal}</Text>

          <View style={styles.viewCardButton}>

            <TouchableOpacity style={styles.cardButton} onPress={handleUpdatePoint}>
              <View style={styles.titleCardButton}>
                <Text style={[styles.textCardButton, { fontSize: 35 }]}>1</Text>
                <Text style={[styles.textCardButton, { fontWeight: '400' }]}>Entrada</Text>
              </View>

              <View style={styles.iconCardButton}>
                <Ionicons name="log-in-outline" size={50} color="#ffff" />
              </View>

            </TouchableOpacity>

            <TouchableOpacity style={[styles.cardButton, { backgroundColor: '#00B4D8' }]} onPress={handleUpdateUpdateBreak}>
              <View style={styles.titleCardButton}>
                <Text style={[styles.textCardButton, { fontSize: 35, color: '#001d3d' }]}>2</Text>
                <Text style={[styles.textCardButton, { fontWeight: '400', color: '#001d3d' }]}>Pausa</Text>
              </View>

              <View style={styles.iconCardButton}>
                <Ionicons name="pause-outline" size={50} color="#001d3d" />
              </View>

            </TouchableOpacity>
          </View>

          <View style={[styles.viewCardButton, { marginTop: 15 }]}>

            <TouchableOpacity style={[styles.cardButton, { backgroundColor: '#90E0EF' }]}  onPress={handleUpdateUpdateBreakLast}>
              <View style={styles.titleCardButton}>
                <Text style={[styles.textCardButton, { fontSize: 35, color: '#001d3d' }]}>3</Text>
                <Text style={[styles.textCardButton, { fontWeight: '400', color: '#001d3d' }]}>Retorno</Text>
              </View>

              <View style={styles.iconCardButton}>
                <Ionicons name="play-outline" size={50} color="#001d3d" />
              </View>

            </TouchableOpacity>

            <TouchableOpacity style={[styles.cardButton, { backgroundColor: '#03045E' }]} onPress={handleUpdateLastPoint}>
              <View style={styles.titleCardButton}>
                <Text style={[styles.textCardButton, { fontSize: 35 }]}>4</Text>
                <Text style={[styles.textCardButton, { fontWeight: '400' }]}>Saida</Text>
              </View>

              <View style={styles.iconCardButton}>
                <Ionicons name="log-out-outline" size={50} color="#fff" />
              </View>

            </TouchableOpacity>
          </View>




          {/* <View style={styles.cardModal}>
            <Text style={styles.titleModal}>Entrada:</Text>
            <DateComponent />
            <TouchableOpacity style={styles.btnModal} onPress={handleUpdatePoint}>
              <Text style={styles.textBtn}>Bater ponto</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardModal}>
            <Text style={styles.titleModal}>Saida:</Text>
            <DateComponent />
            <TouchableOpacity style={styles.btnModal} onPress={handleUpdateLastPoint}>
              <Text style={styles.textBtn}>Bater ponto</Text>
            </TouchableOpacity>
          </View> */}

          {/* <View style={styles.cardModal}>
            <Text style={styles.titleModal}>Saida:</Text>
            <DateComponent />
            <TouchableOpacity style={styles.btnModal} onPress={handleUpdateLastPoint}>
              <Text style={styles.textBtn}>Bater ponto</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardModal}>
            <Text style={styles.titleModal}>Saida:</Text>
            <DateComponent />
            <TouchableOpacity style={styles.btnModal} onPress={handleUpdateLastPoint}>
              <Text style={styles.textBtn}>Bater ponto</Text>
            </TouchableOpacity>
          </View> */}


          <TouchableOpacity style={styles.iconModal} title="Fechar Modal" onPress={() => setModalVisible(false)}>
            <Text style={styles.textModal}>x</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
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

  btnModal: {
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

  },

  viewCardButton: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 50
  },

  cardButton: {
    backgroundColor: "#0077B6",
    width: 150,
    height: 220
  },

  titleCardButton: {
    flexDirection: "column",
    padding: 20,

  },

  textCardButton: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 800
  },

  iconCardButton: {
    flexDirection: "row",
    paddingRight: 15,
    paddingTop: 15,
    justifyContent: "flex-end"
  },

  iconModal: {
    position: 'absolute',
    top: -40,
    right: 0,
    padding: 50,
  },

  titleModal: {
    color: "#000",
    fontWeight: "400",
    fontSize: 24
  },

  timeModal: {
    color: "#000",
    fontWeight: "700",
    fontSize: 30,
    marginTop: 10
  },

  cardModal: {
    flexDirection: "column",
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },

  textModal: {
    fontWeight: '500',
    fontSize: 30,
    color: '#000',
  },

  textBtn: {
    color: '#fff',
  },

  btnBlock: {
    backgroundColor: '#a5a8bf'
  },

  textBtn: {
    fontWeight: '500',
    fontSize: 24,
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff' // cor de fundo do modal (semi-transparente)
  },

})

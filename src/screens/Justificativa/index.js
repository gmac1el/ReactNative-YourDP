import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Modal, SafeAreaView, KeyboardAvoidingView, Platform, Image, FlatList } from 'react-native';
import ItemAusenciaList from './components/ItemAusenciaList';
import { FAB } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { TopBar } from '../../components/Topbar';

import ModalContent from './components/ModalContents';

import { Container } from '../Styles';

import * as SecureStore from 'expo-secure-store';


const JustificativaForm = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState(null);

  const [userDataAusencia, setUserDataAusencia] = useState(null);

  const handleUserDataLoaded = (data) => {
    setUserData(data.msg.ponto);
  };

  const fetchData = async () => {
    const id = await SecureStore.getItemAsync('idUser');

    try {
      const response = await fetch(`https://api-yourdp.onrender.com/user/${id}/listAusencia`,
        {
          'Content-Type': 'application/json',

        });
      const data = await response.json();
      const udateData = data.msg.slice(1)
      setUserDataAusencia(udateData);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    // Chama a função fetchData inicialmente ao montar o componente
    fetchData();


  }, []);


  const handleModalClose = () => {
    setModalVisible(false);
    fetchData(); // Atualiza os dados das ausências após fechar o modal
  };

  console.log(userDataAusencia)

  const renderItem = ({ item }) => (
    <View style={{ width: '100%', paddingBottom: 25, flexDirection: 'row', gap: 40 }}>
      {item.arquivo && <Image source={{ uri: item.arquivo }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
      <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
        <Text style={{ fontWeight: 700 }}>Data: {item.dia}</Text>
        <Text>Explicação: {item.explicacao}</Text>
        <Text>Motivo: {item.motivo}</Text>
      </View>

    </View>
  );

  return (


    <Container>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollStyle} style={{ width: '100%' }}>
        <TopBar onUserDataLoaded={handleUserDataLoaded} />









        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}

        >

          <View style={styles.modalContainer}>

            <ModalContent onModalClose={handleModalClose} />

            <TouchableOpacity style={styles.iconModal} title="Fechar Modal" onPress={() => setModalVisible(false)}>
              <Text style={[styles.textModal, { fontWeight: 700, fontSize: 25, marginRight: 10 }]}>x</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.container}>
          
          </View> */}


        </Modal>






      </ScrollView>


      <FlatList
        style={{}}
        data={userDataAusencia}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
       
        initialScrollIndex={0}
        ListEmptyComponent={<Text>Sem justificativas</Text>}
      />




      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        label='Adicionar Ausência'
        color='#ffff'

      />

    </Container>


  );


};

export default JustificativaForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2D1CC6'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  iconModal: {
    position: 'absolute',
    top: -40,
    right: 0,
    padding: 50,
  },
});
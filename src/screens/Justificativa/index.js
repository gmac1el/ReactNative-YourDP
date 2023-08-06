import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Modal, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

import { FAB } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { TopBar } from '../../components/Topbar';

import ModalContent from './components/ModalContents';

import { Container } from '../Styles';


const JustificativaForm = () => {
  const [motivo, setMotivo] = useState('');
  const [data, setData] = useState('');
  const [observacao, setObservacao] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    console.log('Motivo:', motivo);
    console.log('Data:', data);
    console.log('Observação:', observacao);
  };

  const handleUploadImage = () => {
    console.log('Imagem enviada');
  };

  const [userData, setUserData] = useState(null);

  const handleUserDataLoaded = (data) => {
    setUserData(data.msg.ponto);
  };



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

            <ModalContent />

            <TouchableOpacity style={styles.iconModal} title="Fechar Modal" onPress={() => setModalVisible(false)}>
              <Text style={[styles.textModal, {fontWeight: 700, fontSize: 25, marginRight: 10}]}>x</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.container}>
          
          </View> */}


        </Modal>






      </ScrollView>


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
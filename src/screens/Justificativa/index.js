import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { TopBar } from '../../components/Topbar';

import { Container } from '../Styles';

const JustificativaForm = () => {
  const [motivo, setMotivo] = useState('');
  const [data, setData] = useState('');
  const [observacao, setObservacao] = useState('');

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

        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.motivoSection}>
              <Text style={styles.label}>Justificativa</Text>
              <TextInput
                style={styles.inputAusencia}
                value={motivo}
                onChangeText={setMotivo}
                placeholder="Motivo"
              />
            </View>

            <View style={styles.inputDateFerias}>
              <Text style={styles.label}>Data de Solicitação</Text>
              <TextInput
                style={styles.inputDate}
                value={data}
                onChangeText={setData}
                placeholder="Data"
              />
            </View>

            <View style={styles.observation}>
              <Text style={styles.label}>Observação</Text>
              <TextInput
                style={styles.subject}
                value={observacao}
                onChangeText={setObservacao}
                placeholder="Digite aqui..."
                multiline
              />
            </View>

            <TouchableOpacity style={styles.search} onPress={handleUploadImage}>
              <Text style={styles.btnText}>Subir imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btnText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

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
  form: {
    width: '100%',
  },
  motivoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  inputAusencia: {
    backgroundColor: '#F7F7F9',
    borderRadius: 14,
    width: '100%',
    height: 56,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputDateFerias: {
    width: '100%',
    marginBottom: 10,
  },
  inputDate: {
    backgroundColor: '#F7F7F9',
    borderRadius: 14,
    width: '100%',
    height: 56,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  observation: {
    width: '100%',
    marginBottom: 10,
  },
  subject: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  search: {
    width: 335,
    height: 56,
    backgroundColor: '#F7F7F9',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btn: {
    width: 335,
    height: 56,
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#2D1CC6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '700',
  },

});
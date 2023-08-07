import React, { useState } from "react";

import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Modal, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
//import * as Permissions from 'expo-permissions'; //
import * as MediaLibrary from 'expo-media-library';
import * as SecureStore from 'expo-secure-store';


import { TextInput } from 'react-native-paper';






export default function ModalContent() {

  const [motivo, setMotivo] = useState('');
  const [dataInput, setData] = useState('');
  const [observacao, setObservacao] = useState('');

  const [imageUrl, setImageUrl] = useState(null);

  // const handleSubmit = () => {
  //   console.log('Motivo:', motivo);
  //   console.log('Data:', data);
  //   console.log('Observação:', observacao);
  // };

  const handleUploadImage = () => {
    console.log('Imagem enviada');
  };

  const [userData, setUserData] = useState(null);

  // const handleUserDataLoaded = (data) => {
  //   setUserData(data.msg.ponto);
  // };


  const pickFromGalary = async () => {
    // Request permission to access the camera roll
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === 'granted') {
      // If permission is granted, launch the image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        // Use the "assets" array instead of "uri" to access selected asset(s)
        let selectedAsset = result.assets[0]; // Assuming only one asset is selected
        

        setImageUrl(result.uri);


        let newFile = {
          uri: selectedAsset.uri,
          type: `test/${selectedAsset.uri.split(".")[1]}`,
          name: `test.${selectedAsset.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
        Alert.alert('Imagem carregada com sucesso!');
      }
    } else {
      Alert.alert('Você deve dar permissão para executar');
    }
  };

  const handleUpload = (image) => {
    const data = new FormData(); // fetch ucun data hazirlayiriq
    data.append('file', image);  // cloudinary ucun img file,hansiki imgpicker den gelir
    data.append('upload_preset', 'ml_default'); // cloudinary ucun preset ti teyin edirik
    data.append('cloud_name', 'dkt07q4bz'); // cloudinary ucun cloud ad
    fetch("https://api.cloudinary.com/v1_1/dkt07q4bz/image/upload", { method: 'post', body: data })
      .then(res => res.json())
      .then(data => { inputHndl('picture', data.url); }); // cloudinary yuklenenden sora gelen datani state guncelliyirik,data cloudinaryden gelir
  }


  const sendImageUrlToServer = async () => {
    if (imageUrl) {
      try {

        const id = await SecureStore.getItemAsync('idUser');
        const token = await SecureStore.getItemAsync('token')

        const response = await fetch(`https://api-yourdp.onrender.com/user/${id}/ausencia`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ausencia:{
            dia: dataInput,
            motivo: motivo,
            explicacao: observacao,
            arquivo: imageUrl,
            statusAusencia: false
          } }),
        });

        const data = await response.json();
        console.log('POST response:', data);
        // Aqui você pode fazer o tratamento necessário após a resposta do POST
        Alert.alert('Ausencia enviada');

      } catch (error) {
        console.error('Error on POST request:', error);
      }
    } else {
      Alert.alert('Por favor, carregue uma imagem antes de enviar.');
    }
  };


  return (
    <View style={styles.form}>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Define o comportamento para iOS e Android
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Offset vertical (opcional)
      >

      </KeyboardAvoidingView>
      <SafeAreaView style={styles.form}>

        <View style={styles.motivoSection}>
          {/* <Text style={styles.label}>Justificativa</Text> */}
          <TextInput
            style={styles.inputAusencia}
            value={motivo}
            onChangeText={setMotivo}
            label='Motivo'
            mode='outlined'
          />
        </View>

        <View style={styles.inputDateFerias}>
          {/* <Text style={styles.label}>Data de Solicitação</Text> */}
          <TextInput
            style={styles.inputDate}
            value={dataInput}
            onChangeText={setData}
            label="Data"
            mode='outlined'
          />
        </View>

        <View style={styles.observation}>
          {/* <Text style={styles.label}>Observação</Text> */}
          <TextInput
            style={styles.subject}
            value={observacao}
            onChangeText={setObservacao}

            multiline
            label="Observação"
            mode='outlined'
          />
        </View>

        <TouchableOpacity style={styles.search} onPress={pickFromGalary}>
          <Text style={[styles.btnText, { color: '#2D1CC6' }]}>Subir imagem</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={sendImageUrlToServer}>
          <Text style={styles.btnText}>Enviar</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    zIndex: 1000
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
  subject: {
    width: '100%',
    height: 200,

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
    marginTop: 20
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
  observation: {
    width: '100%'
  }
})
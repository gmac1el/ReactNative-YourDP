import { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View, Image, Alert, FlatList } from "react-native"

import { TopBar } from "../../components/Topbar"
import { Container } from "../Styles"

import * as SecureStore from 'expo-secure-store';

export function Ferias() {

  const [userData, setUserData] = useState(null);
  const [userListFerias, setUserListFerias] = useState({})

  const handleUserDataLoaded = (data) => {
    setUserData(data.msg.ponto);
  };


  const fetchListFerias = async () => {
    const id = await SecureStore.getItemAsync('idUser');

    try {

      const response = await fetch(`https://api-yourdp.onrender.com/user/${id}/listFerias`, {
        'Content-Type': 'application/json',
      })

      const data = await response.json()
      const newData = await data.msg.slice(1)
      setUserListFerias(newData)
      console.log(data)

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchListFerias()
  }, [])


  const renderCardFerias = ({ item }) => {

    return (
      <View style={styles.card}>
        <Image source={require('../../../assets/card.png')} style={[styles.image, { alignSelf: 'center' }]} />
        <Text style={styles.text}>Férias Solicitadas</Text>
        <Text style={styles.text0}>Dias de Férias</Text>
        <Text style={styles.text1}>Status</Text>
        <Text style={styles.text3} >{item.status == false ? 'Solicitação \n Pendente' : 'Solicitação \n aprovada'}</Text>
        <Text style={styles.text4}>Início das Férias</Text>
        <Text style={styles.text5}>Término das Férias</Text>
        <Text style={styles.text6}>{item.inicio}</Text>
        <Text style={styles.text7}>{item.fim}</Text>
        <Text style={styles.text2}>{item.dias}</Text>
      </View>
    )

  }

  return (
    <Container>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollStyle} style={{ width: '100%' }}>
        <TopBar onUserDataLoaded={handleUserDataLoaded} />


      
        
      </ScrollView>
      <FlatList
        style={{marginTop: 0, paddingTop:0}}
        data={userListFerias}
        keyExtractor={(item) => item._id}
        renderItem={renderCardFerias}
        showsVerticalScrollIndicator={false} 
        initialNumToRender={renderCardFerias.length == 0 ? 0 : renderCardFerias.length}
        initialScrollIndex={0}
      />

    </Container>
  )
}

const styles = StyleSheet.create({

  scrollStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingBottom: 77,
  },
  gridIcons: {
    textAlign: 'center',
    display: 'grid',
    textDecorationLine: 'underline',
    color: '#04488d',
  },
  card: {
    marginTop: 40,
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    position: 'absolute',
    top: '30%',
    left: '24%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 20,
  },
  text0: {
    position: 'absolute',
    top: '46%',
    left: '24%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 16,
    color: '#c3c3c3',
  },
  text1: {
    position: 'absolute',
    top: '46%',
    left: '66%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 16,
    color: '#c3c3c3',
  },
  text2: {
    position: 'absolute',
    top: '57%',
    left: '25%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 16,
    color: '#fff'
  },
  text3: {
    marginRight: 50,
    position: 'absolute',
    top: '57%',
    left: '66%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 16,
    textAlign: 'left',
    color: '#fff'
  },
  text4: {
    position: 'absolute',
    top: '85%',
    left: '24%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 16,
    color: '#c3c3c3',
  },
  text5: {
    position: 'absolute',
    top: '85%',
    left: '66%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 16,
    color: '#c3c3c3',
    width: 148,
  },
  text6: {
    position: 'absolute',
    top: '97%',
    left: '25%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 16,
    color: '#fff'
  },
  text7: {
    position: 'absolute',
    top: '97%',
    left: '66%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 16,
    color: '#fff'
  }



})



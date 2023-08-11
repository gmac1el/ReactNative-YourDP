import { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, Image, View, FlatList } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from "../../components/Topbar"

import { Container } from "../Styles"
import * as SecureStore from 'expo-secure-store'; 

import DownloadButton from "./components/ButtonDownload";

export function ContraCheque() {

  const [userData, setUserData] = useState(null);
  const [userListDoc, setUserListDoc] = useState({})


  const fetchListDoc = async () => {
    const id = await SecureStore.getItemAsync('idUser');

    try {

      const response = await fetch(`https://api-yourdp.onrender.com/user/${id}/listContraCheque`, {
        'Content-Type': 'application/json',
      })

      const data = await response.json()
      const newData = await data.msg.slice(1)
      setUserListDoc(newData)
      console.log(data)

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchListDoc()
  }, [])


  const handleUserDataLoaded = (data) => {
    setUserData(data.msg.ponto);
  };

  const renderCardDoc = ({ item }) => {

    return (
      <View style={[styles.cardDoc, { marginBottom: 35}]}>

        <DownloadButton url={item.arquivoContracheque} />

        <View style={{ flexDirection: 'column', gap: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: 700, color: '#001d3d' }}>Contracheque</Text>

          <Text>Data:{item.diaArquivo}</Text>

          <Text style={{ fontSize: 12, color: '#777777' }}>Faça o download clicando no icone</Text>
        </View>

      </View>
    )

  }


  return (
    <Container>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollStyle} style={{ width: '100%' }}>
        <TopBar onUserDataLoaded={handleUserDataLoaded} />

        {/* <View style={styles.container}>
          <Text style={styles.title}>Contracheque</Text>

          <View style={styles.navData}>
            <View style={styles.dataList}>
              <Text>JAN/2023</Text>
            </View>

            <View style={styles.contentList}>
              <Image source={require('../../../assets/contraCheque.png')} />

              <Text>Fazer download</Text>

              <View>
                <Image source={require('../../../assets/downLoad.png')} />
              </View>
            </View>
          </View>

        </View> */}

        {/* <View style={styles.cardDoc}>



          <DownloadButton url="https://res.cloudinary.com/dkt07q4bz/raw/upload/v1687922331/Template_Fatura_Brasil_av1yg8.docx" />

          <View style={{ flexDirection: 'column', gap: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: 700, color: '#001d3d' }}>Contracheque</Text>


            <Text>Data:</Text>


            <Text style={{ fontSize: 12, color: '#777777' }}>Faça o download clicando no icone</Text>
          </View>

        </View> */}


      </ScrollView>
      <FlatList
        style={{ marginTop: 0, paddingTop: 0}}
        data={userListDoc}
        keyExtractor={(item) => item._id}
        renderItem={renderCardDoc}
        showsVerticalScrollIndicator={false}
        initialNumToRender={renderCardDoc.length == 0 ? 0 : renderCardDoc.length}
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingBottom: 75,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 34,
    textAlign: 'center',
    color: '#1B1E28',
  },
  dataList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  contentList: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    borderRadius: 20
  },
  cardDoc: {
    flexDirection: 'row',

    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#90E0EF",
    borderRadius: 7,

    gap: 27,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  cardDocDownload: {
    flexDirection: 'column',

    gap: 15,
    backgroundColor: '#03045E',
    padding: 25
  },
  cardDocInfos: {
    flexDirection: 'column',

    gap: 15,
    paddingLeft: 10,

    height: "100%"
  }

})
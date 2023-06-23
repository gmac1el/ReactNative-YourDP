import { useState } from "react";
import { ScrollView, Text, StyleSheet, Image, View } from "react-native"

import { TopBar } from "../../components/Topbar"
import { Container } from "../Styles"

export function ContraCheque() {

  const [userData, setUserData] = useState(null);

  const handleUserDataLoaded = (data) => {
    setUserData(data.msg.ponto);
  };

  return (
    <Container>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollStyle} style={{ width: '100%' }}>
        <TopBar onUserDataLoaded={handleUserDataLoaded} />

        <View style={styles.container}>
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
        </View>

      </ScrollView>

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
  },


})
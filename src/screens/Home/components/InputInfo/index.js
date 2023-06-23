import { View, StyleSheet, Text } from "react-native";

export function InputInfo(props) {
  return (
    <View style={styles.input}>

      <Text style={styles.text}>{props.Date}</Text>
      <Text style={styles.text}>-</Text>
      <Text style={styles.text}>{props.Hour}</Text>

    </View>
  )
}


const styles = StyleSheet.create({
  input: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5

  },

  text: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

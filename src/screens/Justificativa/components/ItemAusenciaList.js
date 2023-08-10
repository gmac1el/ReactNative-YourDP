import React from "react";
import { View, Text } from "react-native";

export default function ItemAusenciaList({Item}) {
  return (
    <View>
      <Text>{Item.motivo}</Text>
    </View>
  )
}
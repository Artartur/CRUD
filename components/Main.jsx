import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { MainStyles } from "../utils/styles";
import { useNavigation } from "@react-navigation/native";

export default function Main() {
  const navigate = useNavigation();

  return (
    <>
      <View style={MainStyles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={MainStyles.containerButton}>
          <TouchableOpacity
            onPress={() => navigate.navigate("ViewData")}
            style={MainStyles.buttons}
          >
            <Text>Usuarios cadastrados</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate.navigate("Form")}
            style={MainStyles.buttons}
          >
            <Text>Cadastrar usuario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

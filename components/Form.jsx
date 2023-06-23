import React, { useState } from "react";
import { Alert, TextInput, Text, TouchableOpacity, View } from "react-native";
import { MainStyles } from "../utils/styles";
import { useNavigation } from "@react-navigation/native";
import axios from "../server/axios";

export default function Form() {
  const formData = {
    description: "",
    name: "",
  };
  const navigate = useNavigation();
  const [data, setData] = useState(formData);

  const handleInputChange = (name, value) => {
    setData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:3000/Users", {
        description: data.description,
        name: data.name,
      })
      .then(() => {
        Alert.alert("Usuario cadastrado com sucesso!");
        navigate.navigate("Main");
      })
      .catch((err)=>Alert.alert("Houve algum erro ao cadastrar", err));
  };

  return (
    <>
      <View style={MainStyles.container}>
        <View style={MainStyles.containerButton}>
          <TextInput
            name="name"
            onChangeText={(value) => handleInputChange('name', value)}
            placeholder="Name"
            style={MainStyles.inputs}
            value={data.name}
          />
          <TextInput
            editable
            name="description"
            numberOfLines={4}
            multiline
            onChangeText={(value) => handleInputChange('description', value)}
            placeholder="Description"
            style={MainStyles.inputs}
            value={data.description}
          />
          <TouchableOpacity onPress={onSubmit} style={MainStyles.buttons}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

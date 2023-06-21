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

  const handleInputChange = (value) => {
    setData((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:3000/register", {
        description: data.description,
        name: data.name,
      })
      .then(() => {
        Alert.alert("Usuario cadastrado com sucesso!");
        navigate.navigate("Main");
      })
      .catch(Alert.alert("Houve algum erro ao cadastrar"));
  };

  return (
    <>
      <View style={MainStyles.container}>
        <View style={MainStyles.containerButton}>
          <TextInput
            name="name"
            onChangeText={handleInputChange}
            placeholder="Name"
            style={MainStyles.inputs}
            value={data.name}
          />
          <TextInput
            editable
            name="description"
            numberOfLines={4}
            multiline
            onChangeText={handleInputChange}
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

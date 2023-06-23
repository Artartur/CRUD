import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MainStyles } from "../utils/styles";
import axios from "../server/axios";
import { useNavigation } from "@react-navigation/native";

export default function ViewData() {
  const [data, setData] = useState([]);
  const navigate = useNavigation();

  const deleteData = (id) => {
    axios
      .delete("http://localhost:3000/Users/" + id)
      .then((res) => {
        setData(res.data);
        Alert.alert("Usuario deletado com sucesso");
        navigate.navigate("Main");
      })
      .catch((err) => {
        Alert.alert("Aconteceu algum problema ao excluir esse usuario");
        console.error(err);
      });
  };

  const getDatas = () => {
    axios
      .get("http://localhost:3000/Users")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getDatas();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={MainStyles.row}>
        <Text style={MainStyles.column}>{item.name}</Text>
        <Text>{item.description}</Text>
        <TouchableOpacity
          style={{ backgroundColor: "green", padding: 5 }}
        >
          <Text>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteData(item.id)}
          style={{ backgroundColor: "red", padding: 5 }}
        >
          <Text>Excluir</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={MainStyles.container}>
        <View
          style={{
            borderWidth: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            width: "80%",
          }}
        >
          <Text>Name</Text>
          <Text>Description</Text>
          <Text>Editar</Text>
          <Text>Excluir</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) =>
            item && item.id ? item.id.toString() : index.toString()
          }
          renderItem={renderItem}
          style={MainStyles.table}
        />
      </View>
    </>
  );
}


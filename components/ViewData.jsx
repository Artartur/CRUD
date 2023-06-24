import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MainStyles } from "../utils/styles";
import axios from "../server/axios";
import { useNavigation } from "@react-navigation/native";

export default function ViewData() {
  const [data, setData] = useState([]);
  const [hideModal, showModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
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

  const updateData = (id, formData) => {
    const updatedValues = {
      description: formData.description,
      name: formData.name,
    };

    axios
      .put("http://localhost:3000/Users/" + id, updatedValues)
      .then((res) => {
        const updatedData = data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              name: res.data.name,
              description: res.data.description,
            };
          }
          return item;
        });
        setData(updatedData);
        navigate.navigate("Main");
        Alert.alert("Dados atualizados com sucesso");
        showModal(false);
      })
      .catch((err) => {
        Alert.alert("Ocorreu um erro ao atualizar os dados");
        console.error(err);
      });
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
          onPress={() => {
            showModal(true);
            setSelectedItemId(item.id);
          }}
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

        {hideModal && (
          <Modal handleSubmit={updateData} selectedItemId={selectedItemId} />
        )}

      </View>
    </>
  );
}

const Modal = ({ handleSubmit, selectedItemId }) => {
  const formData = {
    description: "",
    name: "",
  };

  const [data, setData] = useState(formData);

  const handleInputChange = (name, value) => {
    setData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    handleSubmit(selectedItemId, data);
  };

  return (
    <>
      <View style={MainStyles.containerButton}>
        <TextInput
          name="name"
          onChangeText={(value) => handleInputChange("name", value)}
          placeholder="Name"
          style={MainStyles.inputs}
          value={data.name}
        />
        <TextInput
          editable
          name="description"
          numberOfLines={4}
          multiline
          onChangeText={(value) => handleInputChange("description", value)}
          placeholder="Description"
          style={MainStyles.inputs}
          value={data.description}
        />
        <TouchableOpacity onPress={onSubmit} style={MainStyles.buttons}>
          <Text>Editar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

import { StatusBar, StyleSheet } from "react-native";

export const MainStyles = StyleSheet.create({
  buttons: {
    backgroundColor: "blue",
    height: 50,
    marginTop: 30,
    width: "80%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
    width: "100%",
  },

  containerButton: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
  },

  containerInputs: {
    width: "100%",
  },

  inputs: {
    alignItems: "center",
    backgroundColor: "gray",
    color: "white",
    fontWeight: "bold",
    height: 50,
    justifyContent: "flex-start",
    marginTop: 30,
    paddingLeft: 10,
    width: "80%",
  },

  row:{
    alignItems:"center",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    padding: 20,
  },

  table:{
    width: "80%",
    height: "100%",
  }
});

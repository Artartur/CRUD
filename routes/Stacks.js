import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Form from "../components/Form";
import Main from "../components/Main";

const { Navigator, Screen } = createStackNavigator();

export default function Stacks() {
  return (
    <>
      <Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
        <Screen name={"Form"} component={Form}/>
        <Screen name={"Main"} component={Main}/>
      </Navigator>
    </>
  );
}
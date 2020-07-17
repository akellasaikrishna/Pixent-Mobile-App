import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import Navigation from "./components/navigation";
import * as Font from "expo-font";
import dataSharingService from "./components/helpers/dataSharingService";

interface state {
  isFontLoaded: boolean;
}

export default class App extends React.Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFontLoaded: false,
    };
    AsyncStorage.getItem("user").then((user) => {
      if (user) {
        dataSharingService.setUser(JSON.parse(user));
      }
    });
  }
  async componentDidMount() {
    await Font.loadAsync({
      Montserrat: require("./assets/Montserrat-Regular.ttf"),
    });
    this.setState({ isFontLoaded: true });
  }
  render() {
    return (
      <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
        {this.state.isFontLoaded ? (
          <Navigation />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="small" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

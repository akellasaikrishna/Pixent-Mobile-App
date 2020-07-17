import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  ToastAndroid,
  AsyncStorage,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Header from "./common/header";
import dataSharingService from "./helpers/dataSharingService";

interface state {
  email: string;
  password: string;
  confirmPassword: string;
  isError: boolean;
}
const googleLogo = {
  uri: "https://pluspng.com/img-png/google-logo-png-open-2000.png",
};
const facebookLogo = {
  uri: "https://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19750.png",
};
const dimensions = Dimensions.get("window");
export default class Login extends Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      isError: false,
    };
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#FFFFFF" }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            style={{
              width: dimensions.width * 1,
              height: dimensions.width * 0.7,
              flexDirection: "row",
            }}
            source={require("../assets/background.png")}
          >
            {/* <Header navigation={this.props.navigation} /> */}
          </ImageBackground>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#FFFFFF",
                bottom: 120,
                fontFamily: "Montserrat",
              }}
            >
              Welcome!
            </Text>
            <Text
              style={{
                fontWeight: "normal",
                fontSize: 16,
                color: "#FFFFFF",
                bottom: 110,
                flexWrap: "wrap",
                width: 280,
                textAlign: "center",
                fontFamily: "Montserrat",
              }}
            >
              {/* Find a WERKKER near you */}
            </Text>
          </View>
          <View
            style={{
              width: dimensions.width,
              alignItems: "center",
            }}
          >
            <View style={{ bottom: 35 }}>
              <TextInput
                placeholderTextColor={this.state.isError ? "red" : "#616161"}
                style={{
                  width: dimensions.width / 1.25,
                  height: 55,
                  paddingLeft: 25,
                  borderRadius: 55,
                  color: "#616161",
                  fontSize: 16,
                  textAlign: "left",
                  backgroundColor:
                    Platform.OS == "android" ? "#FFFFFF" : "#EEEEEE",
                  elevation: 3,
                  fontFamily: "Montserrat",
                }}
                placeholder="Email *"
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
              />
            </View>
            <View style={{ bottom: 20 }}>
              <TextInput
                secureTextEntry={true}
                placeholderTextColor={this.state.isError ? "red" : "#616161"}
                style={{
                  width: dimensions.width / 1.25,
                  height: 55,
                  paddingLeft: 25,
                  borderRadius: 55,
                  color: "#616161",
                  fontSize: 16,
                  textAlign: "left",
                  backgroundColor:
                    Platform.OS == "android" ? "#FFFFFF" : "#EEEEEE",
                  elevation: 3,
                  fontFamily: "Montserrat",
                }}
                placeholder="Password *"
                value={this.state.password}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.login()}
                style={{
                  backgroundColor: "#205CBE",
                  width: dimensions.width / 1.35,
                  padding: 15,
                  borderRadius: 55,
                  elevation: 10,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 18,
                    textAlign: "center",
                    fontWeight: "600",
                    fontFamily: "Montserrat",
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 20 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
                style={{
                  width: dimensions.width / 1.55,
                }}
              >
                <Text
                  style={{
                    color: "#205CBE",
                    fontSize: 18,
                    textAlign: "left",
                    fontWeight: "600",
                    fontFamily: "Montserrat",
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{ textAlign: "center", color: "#BDBDBD", fontSize: 18 }}
              >
                Or
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: "#616161",
                  fontSize: 18,
                  fontFamily: "Montserrat",
                }}
              >
                Continue with
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 20,
                width: dimensions.width / 3.1,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.button}
                // onPress={() => this.facebookSignInAsync()}
              >
                <View
                  style={{
                    padding: Math.round(dimensions.width) / 55,
                    borderRadius: 50,
                    backgroundColor:
                      Platform.OS == "android" ? "#FFFFFF" : "#EEEEEE",
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                    }}
                    source={facebookLogo}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                // onPress={() => this.googleSignInAsync()}
              >
                <View
                  style={{
                    padding: Math.round(dimensions.width) / 55,
                    borderRadius: 50,
                    backgroundColor:
                      Platform.OS == "android" ? "#FFFFFF" : "#EEEEEE",
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                    }}
                    source={googleLogo}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: 18,
                  color: "#616161",
                  fontFamily: "Montserrat",
                }}
              >
                Don't have an account yet?
              </Text>
            </View>
            <View style={{ paddingVertical: 20 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Register")}
                style={{
                  backgroundColor: "#EEEEEE",
                  width: dimensions.width / 1.35,
                  padding: 15,
                  borderRadius: 55,
                  elevation: 6,
                }}
              >
                <Text
                  style={{
                    color: "#205CBE",
                    fontSize: 18,
                    textAlign: "center",
                    fontWeight: "600",
                    fontFamily: "Montserrat",
                  }}
                >
                  Signup for free
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  login = () => {
    const res = {
      fName: "John",
      lName: "Dow",
      sid: "11122223333444555666777888",
    };
    dataSharingService.setUser(res);
    AsyncStorage.setItem("user", JSON.stringify(res));
    ToastAndroid.show("Logged In successfully", 1000);
    this.props.navigation.navigate("Home");
  };
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Platform.OS == "android" ? "#FFFFFF" : "#EEEEEE",
    elevation: 5,
    borderRadius: 55,
    padding: 10,
    alignItems: "center",
  },
});

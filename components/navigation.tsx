import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  AsyncStorage,
  ToastAndroid,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import DataSharingService from "./helpers/dataSharingService";
import { ScrollView } from "react-native-gesture-handler";
import Dashboard from "./dashboard";
import Login from "./login";
const config = require("./helpers/config.json");

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const dimensions = Dimensions.get("screen");

interface state {
  fname: string;
  lname: string;
  auth_token: string;
  profilePic: any;
}

const linking = {
  prefixes: ["https://app.example.com"],
};

export default class Navigation extends Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      auth_token: "",
      profilePic: null,
    };
  }
  componentDidMount() {
    DataSharingService.getUser.subscribe((data: any) => {
      if (data != {}) {
        this.loadVitals(data);
      } else {
        this.setState({ auth_token: "" });
      }
    });
    DataSharingService.getProfilePic.subscribe((data: any) => {
      if (data != null) {
        this.setState({ profilePic: data });
      }
    });
  }
  loadVitals(data: any) {
    this.setState({ auth_token: data["sid"] });
    this.setState({ fname: data["fname"], lname: data["lname"] });
  }
  render() {
    if (this.state.auth_token && this.state.auth_token.length > 0) {
      return (
        <NavigationContainer linking={linking}>
          <Drawer.Navigator
            drawerContent={(props) => this.customDrawerContent(props)}
            drawerContentOptions={{
              activeTintColor: "rgba(#FFFFFF, #FFFFFF, #FFFFFF, 0.1)",
              activeBackgroundColor: "rgba(#FFFFFF, #FFFFFF, #FFFFFF, 0.1)",
              labelStyle: {
                color: "white",
                fontSize: Math.round(dimensions.width / 25),
                fontFamily: "Montserrat",
                textDecorationStyle: "solid",
              },
            }}
            drawerType="slide"
            drawerStyle={{
              width: Math.round(dimensions.width / 1.15),
            }}
          >
            <Drawer.Screen
              name="Home"
              component={Dashboard}
              options={{
                drawerIcon: () => (
                  <Image
                    source={require("../assets/drawer/home.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25, marginLeft: 20 }}
                  />
                ),
              }}
            />
            {/* <Drawer.Screen
              name="WERKK Orders"
              component={this.WerkkOrdersStack}
              options={{
                drawerIcon: () => (
                  <Image
                    source={require("../assets/drawer/werkk.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25, marginLeft: 20 }}
                  />
                ),
                unmountOnBlur: true,
              }}
            /> */}
          </Drawer.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => this.customDrawerContent(props)}
            drawerContentOptions={{
              activeTintColor: "rgba(#FFFFFF, #FFFFFF, #FFFFFF, 0.1)",
              activeBackgroundColor: "rgba(#FFFFFF, #FFFFFF, #FFFFFF, 0.1)",
              labelStyle: {
                color: "white",
                fontSize: Math.round(dimensions.width / 25),
                fontFamily: "Montserrat",
                textDecorationStyle: "solid",
              },
            }}
            drawerType="slide"
            drawerStyle={{
              width: Math.round(dimensions.width / 1.15),
            }}
          >
            <Drawer.Screen
              name="Home"
              component={Dashboard}
              options={{
                drawerIcon: () => (
                  <Image
                    source={require("../assets/drawer/home.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25, marginLeft: 20 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Sign In"
              component={Login}
              options={{
                drawerIcon: () => (
                  <Image
                    source={require("../assets/icon.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25, marginLeft: 20 }}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      );
    }
  }

  /**
   * MyAccountStack contains all screens related to account
   */
  // MyAccountStack = () => {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="MyAccount"
  //         component={MyAccount}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="UpdatePassword"
  //         component={UpdatePassword}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="UpdateProfile"
  //         component={UpdateProfile}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="InviteFriends"
  //         component={InviteFriends}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="DeactivateAccount"
  //         component={DeactivateAccount}
  //         options={{ headerShown: false }}
  //       />
  //     </Stack.Navigator>
  //   );
  // };

  /**
   * The custom content header adds the logo/Profile Image, userename and other
   * information on the top of the drawer navigator slider.
   */
  customDrawerContent = (props: any) => {
    return (
      <LinearGradient
        // start={[0, 1]}
        // end={[1, 0]}
        colors={["#004586", "#02265A"]}
        style={{ flex: 1 }}
      >
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.auth_token && this.state.auth_token.length > 0 ? (
              <View
                style={{
                  alignItems: "center",
                  paddingTop: 40,
                  paddingBottom: 10,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                // onPress={() => {
                //   props.navigation.navigate("My Account");
                // }}
                >
                  {this.state.profilePic == null ? (
                    <Image
                      style={{
                        height: 90,
                        width: 90,
                        borderRadius: 55,
                        borderColor: "#BDBDBD",
                        borderWidth: 3,
                        marginHorizontal: 25,
                      }}
                      source={require("../assets/icon.png")}
                    />
                  ) : (
                    <View style={{ padding: 2 }}>
                      <Image
                        style={{
                          height: 90,
                          width: 90,
                          borderRadius: 55,
                          borderColor: "#BDBDBD",
                          borderWidth: 3,
                          marginHorizontal: 25,
                        }}
                        source={require("../assets/icon.png")}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => {
                  //   props.navigation.navigate("My Account");
                  // }}
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                      color: "#FFFFFF",
                      fontSize: 22,
                      fontFamily: "Montserrat",
                    }}
                  >
                    {this.state.fname}
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      color: "#FFFFFF",
                      fontSize: 22,
                      fontFamily: "Montserrat",
                    }}
                  >
                    {this.state.lname}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <View
              style={{
                flex: 1,
                borderTopWidth: 1,
                borderTopColor: "rgba(255, 255, 255, 0.15)",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255, 255, 255, 0.15)",
              }}
            >
              <DrawerContent {...props} />
              {/* {this.state.auth_token && this.state.auth_token.length > 0 ? (
                <TouchableOpacity
                  // onPress={() => this.Logout()}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    bottom: 20,
                    marginLeft: 20,
                  }}
                >
                  <Image
                    source={require("../assets/icon.png")}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      marginHorizontal: 17.5,
                    }}
                  />
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: Math.round(dimensions.width / 25),
                      marginHorizontal: 17.5,
                      fontFamily: "Montserrat",
                    }}
                  >
                    Sign Out
                  </Text>
                </TouchableOpacity>
              ) : null} */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  };
}

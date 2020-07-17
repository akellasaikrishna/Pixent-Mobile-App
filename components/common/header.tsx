import React, { Component, Fragment } from "react";
import {
  Platform,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface state {
  notificationCount: number;
  authToken: string;
}

const dimensions = Dimensions.get("screen");
export default class Header extends Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      notificationCount: 0,
      authToken: "",
    };
  }
  componentDidMount() {}
  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            paddingTop: Platform.OS === "android" ? 40 : 0,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: this.props.title ? "#FFFFFF" : "transparent",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 15,
              width: 55,
              backgroundColor: "#3F51B5",
              borderTopRightRadius: 55,
              borderBottomRightRadius: 55,
              elevation: 20,
            }}
            onPress={this.props.navigation.openDrawer}
          >
            <FontAwesome5 name="bars" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View
            style={{
              position: "relative",
              width: Math.round(dimensions.width) - 110,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Text
                style={{
                  width: Math.round(dimensions.width / 1.4),
                  textAlign: "center",
                  color: "#205CBE",
                  fontWeight: "bold",
                  fontSize: Math.round(dimensions.width / 18),
                  fontFamily: "Montserrat",
                }}
              >
                {this.props.title}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

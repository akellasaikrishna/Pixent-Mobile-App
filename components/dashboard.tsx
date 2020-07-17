import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  BackHandler,
} from "react-native";
import Header from "./common/header";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import WebView from "react-native-webview";
const gamesFile = require("./helpers/games.json");

interface state {
  games: any;
  selectedGame: string;
  backButtonRegistered: boolean;
  screenOrientation: number;
}

const dimensions = Dimensions.get("window");
export default class Dashboard extends Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      games: [],
      selectedGame: "",
      backButtonRegistered: false,
      screenOrientation: 1,
    };
  }
  backButtonHandler = () => {
    if (this.state.selectedGame.length > 0) {
      setTimeout(() => {
        this.setState({ selectedGame: "" });
      }, 1000);
    }
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
    this.setState({
      games: gamesFile["games"],
    });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {this.state.selectedGame.length == 0 ? (
          <Fragment>
            <View>
              <Header title="LOBBY" navigation={this.props.navigation} />
            </View>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  {this.state.games &&
                    this.state.games.map((item: any, key: any) => {
                      const image =
                        item["gameCode"] == "swanhouse"
                          ? require("../assets/swanhouse.png")
                          : item["gameCode"] == "aaposquest"
                          ? require("../assets/aaposquest.png")
                          : item["gameCode"] == "fabulousfairies"
                          ? require("../assets/fabulousfairies.png")
                          : item["gameCode"] == "9planetshockers"
                          ? require("../assets/9planetshockers.png")
                          : require("../assets/bookofamduat.png");
                      return (
                        <TouchableOpacity
                          style={{
                            marginVertical: 9,
                            backgroundColor: "white",
                          }}
                          key={key}
                          onPress={() => {
                            this.setState({ selectedGame: item.link });
                          }}
                        >
                          <View
                            style={{
                              width: 160,
                              height: 160,
                              borderRadius: 20,
                              margin: 5,
                              backgroundColor: "#FFFFFF",
                              justifyContent: "center",
                              overflow: "hidden",
                            }}
                          >
                            <View>
                              <Image
                                source={image}
                                style={{
                                  width: 160,
                                  height: 160,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                position: "absolute",
                                backgroundColor: "#FFFFFF",
                                borderTopRightRadius: 20,
                                bottom: -1,
                              }}
                            >
                              <View
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: 110,
                                  height: 55,
                                }}
                              >
                                <Text
                                  style={
                                    Platform.OS == "android"
                                      ? {
                                          color: "#616161",
                                          fontWeight: "bold",
                                          padding: 5,
                                          fontSize: 14,
                                          fontFamily: "Montserrat",
                                          textAlign: "center",
                                          textAlignVertical: "center",
                                        }
                                      : {
                                          color: "#616161",
                                          fontWeight: "bold",
                                          padding: 5,
                                          fontSize: 14,
                                          fontFamily: "Montserrat",
                                        }
                                  }
                                >
                                  {item.name}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </View>
            </ScrollView>
          </Fragment>
        ) : (
          <Fragment>
            <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              style={{
                width: "100%",
              }}
              source={{
                uri: this.state.selectedGame,
              }}
            />
          </Fragment>
        )}
      </View>
    );
  }
}

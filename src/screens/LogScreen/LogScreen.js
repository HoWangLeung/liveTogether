import { View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import useLog from "../../services/useLog";
import { Surface, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import Utils from "../../utils/Utils";
import commonStyles from "../../utils/CommonStyle";
import Void from "./void.png";
import { useSelector } from "react-redux";
import Animated from "react-native-reanimated";
import { FadeIn } from "react-native-reanimated";
import LoadingScreen from "../Common/LoadingScreen";
const LogScreen = () => {
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const { data, loading, setLoading } = useLog();

  const getScreen = () => {
    if (!loading && data && data.length > 0) {
      return (
        <View style={{ marginBottom: "auto", width: "100%" }}>
          {data.map((log) => {
            return (
              <Surface key={log.id} style={styles.surface} elevation={4}>
                <View key={log.id} style={{}}>
                  <Text style={styles.textSpace}>
                    {Utils.formatDate(log.createdDate, "DD-MM-YYYY HH:mm")}
                  </Text>
                  <Text style={styles.textSpace}>
                    Category:
                    <Text style={{ fontWeight: "bold" }}>{log.category}</Text>
                  </Text>
                  <Text style={styles.textSpace}>{log.message}</Text>
                </View>
              </Surface>
            );
          })}
        </View>
      );
    } else if (!loading && data.length == 0) {
      return (
        <View style={styles.imageContainer}>
          <Image source={Void} style={[styles.logLogo]} />
          <Text style={{ fontWeight: 600, fontSize: 18 }}>No Data</Text>
        </View>
      );
    }
    return <LoadingScreen />;
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        entering={FadeIn}
      >
        {getScreen()}
      </Animated.View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  surface: {
    padding: 8,
    height: "auto",
    margin: 20,
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 15,
  },
  textSpace: commonStyles.textSpace,
  logLogo: {
    // width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default LogScreen;

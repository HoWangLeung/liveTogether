import { View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import useLog from "../../services/useLog";
import { Surface, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import Utils from "../../utils/Utils";
const LogScreen = () => {
  const { data } = useLog();

  return (
    <ScrollView style={styles.root}>
      {data.map((log) => {
        return (
          <Surface key={log.id} style={styles.surface} elevation={4}>
            <View style={{ padding: "25 0" }}>
              <Text>
                {Utils.formatDate(log.createdDate, "DD-MM-YYYY HH:mm")}
              </Text>
              <Text>{log.message}</Text>
            </View>
          </Surface>
        );
      })}

      {(!data || data.length == 0) && (
        <View>
          <Text>No Data</Text>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: "white",
    height: "100%",
  },
  surface: {
    padding: 8,
    height: 50,
    margin: 20,
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 15,
  },
});
export default LogScreen;

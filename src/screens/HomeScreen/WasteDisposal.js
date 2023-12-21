import { View, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Button, Card, Text, Surface } from "react-native-paper";
import CustomCardContent from "../../components/CustomCardContent/CustomCardContent";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import commonStyles from "../../utils/CommonStyle";
import useBin from "../../services/useBin";

const WasteDisposal = ({ bins, setBins, groupInfo }) => {
  const navigation = useNavigation();
  const binService = useBin();
  const onDonePressed = async (e, i) => {
    let token = await AsyncStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let binId = bins[i].id;

    axios
      .post(
        `${BASE_URL}/liveTogether/api/bins/wasteDisposal/${binId}`,
        {},
        config
      )
      // .then(res=> res.json())
      .then((result) => {
        binService.fetchBins({
          groupId:groupInfo.id
        }).then((d)=>{
          setBins(d)
        })
      })
      .catch((e) => {});
  };

  const onEditPressed = (e, i) => {
    navigation.navigate("EditWasteDisposalScreen", {
      bin: bins[i],
    });
  };

  const getContent = () => {
    return (
      <View>
        <Text style={styles.titleLarge} variant="titleLarge">Waste Disposal</Text>
        <View style={[styles.container]}>
          {bins &&
            bins.map((item, i) => (
              <CustomCardContent
                onEditPressed={(e) => onEditPressed(e, i)}
                groupInfo={groupInfo}
                type="binRemoval"
                onDonePressed={onDonePressed}
                key={item.id}
                i={i}
                item={item}
              />
            ))}
        </View>
      </View>
    );
  };

  return <View>{getContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  box: {
    // width: 50,
    //height: 100,
  },
  logo: {},
  listButton: {
    float: "right",
  },
  listItemView: {},
  listItem: {
    backgroundColor: "blue",
    borderRadius: "20",
  },
  titleLarge: commonStyles.titleLarge,
});
export default WasteDisposal;

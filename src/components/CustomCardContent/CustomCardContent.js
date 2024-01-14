import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Text, Card, Surface, Avatar, Modal } from "react-native-paper";
import Utils from "../../utils/Utils";
import { BIN_COLLECTION } from "../../utils/Constants";
import { useSelector } from "react-redux";
const CustomCardContent = ({
  item,
  onDonePressed,
  onEditPressed,
  i,
  type,
  modal,
  hideModal,
  groupInfo,
}) => {
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  
  const getUser = (type, item) => {
    if (!groupInfo || !groupInfo.users) {
      return "";
    }

    let user;
    switch (type) {
      case "binCollection":
        user = groupInfo.users.find((d) => d.id === item.binCollection.current);
        if (!user) {
          return "";
        }

        return user;
      case "binRemoval":
        user = groupInfo.users.find((d) => d.id === item.binRemoval.current);
        if (!user) {
          return "";
        }

        return user;
      default:
        return "Default"
   
    }
  };

  const formatName = (username) => {
    if (!username) {
      return "";
    }
    const maxLength = 8;
    if (username.length > maxLength) {
      const truncated = username.substring(0, maxLength) + "...";
      return truncated;
    } else {
      return username;
    }
  };

  return (
    <Surface style={styles.cardContainer} elevation={4}>
      <View style={styles.cardContent}>
        <View style={{ flexDirection: "row", flexBasis: "auto" }}>
          <Avatar.Icon
            size={45}
            icon="delete"
            color={item.color}
            style={{ backgroundColor: "white", marginRight: 5 }}
          />
        </View>
        <View style={{ flexDirection: "row", flexBasis: 200 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 500 }}>{item.displayName}</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text>{`${formatName(
                getUser(type, item).username
              )} 's turn`}</Text>
            </View>

            {type === "binCollection" && (
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text>{`${Utils.formatDate(
                  item.binCollection.nextCollectionDate,
                  "DD-MM-YYYY"
                )}`}</Text>
              </View>
            )}
          </View>
        </View>

        <View>
          <Button onPress={(e) => onEditPressed(e, i)}> Edit</Button>
        </View>

        <Button onPress={(e) => onDonePressed(e, i)}>
          {getUser(type, item).id === userDetail.id ? "Done" : "Assist"}
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {},

  cardContainer: {
    padding: 8,
    marginBottom: 10,
    marginTop: 10,
    height: 80,
    width: "95%",
    // alignItems: "space",
    justifyContent: "center",
    borderRadius: "20px",
    backgroundColor: "#F1F6F9",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 5,
  },
});

export default CustomCardContent;

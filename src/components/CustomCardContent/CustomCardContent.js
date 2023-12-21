import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Text, Card, Surface, Avatar, Modal } from "react-native-paper";
import Utils from "../../utils/Utils";
import { BIN_COLLECTION } from "../../utils/Constants";
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
  const getUserNameByType = (type, item) => {
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
        return formatName(user.email);
      case "binRemoval":
        user = groupInfo.users.find((d) => d.id === item.binRemoval.current);
        if (!user) {
          return "";
        }
        return formatName(user.email);
      default:
        break;
    }
  };

  const formatName = (email) => {
    const maxLength = 8;
    if (email.length > maxLength) {
      const truncatedEmail = email.substring(0, maxLength) + "...";
      return truncatedEmail;
    } else {
      return email;
    }
  };

  return (
    <Surface style={styles.cardContainer} elevation={4}>
      <View style={styles.cardContent}>
        <View style={{ flexDirection: "row", flexBasis: "auto" }}>
          <Avatar.Icon
            size={50}
            icon="delete"
            color={item.color}
            style={{ backgroundColor: "white" }}
          />
        </View>
        <View style={{ flexDirection: "row", flexBasis: 200 }}>
          <View style={{ flex: 1 }}>
            <Text>{item.displayName}</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text>{`${getUserNameByType(type, item)} 's turn`}</Text>
              {type === "binCollection" && (
                <Text style={{ marginLeft: 5 }}>{`${Utils.formatDate(
                  item.binCollection.nextCollectionDate
                )}`}</Text>
              )}
            </View>
          </View>
        </View>

        <View>
          <Button onPress={(e) => onEditPressed(e, i)}> Edit</Button>
        </View>

        <View>
          <Button onPress={(e) => onDonePressed(e, i)}> Done</Button>
        </View>
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
    marginLeft: 20,
  },
});

export default CustomCardContent;

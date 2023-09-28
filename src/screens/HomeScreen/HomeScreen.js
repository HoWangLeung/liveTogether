import { View, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  withTheme,
  Text,
  ListItem,
  Avatar,
} from "@rneui/themed";
const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },
];
const HomeScreen = () => {
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bins/")
      // .then(res=> res.json())
      .then((result) => {
        setData(result.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("e", e);
      });
    return () => {};
  }, []);

  const onDonePressed = (e, i) => {
    let binId = data[i].id;
    console.log("binId", binId);
    axios
      .post(`http://localhost:8080/api/bins/${binId}`)
      // .then(res=> res.json())
      .then((result) => {
        console.log("resultData",result);
        setData(result.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const getContent = () => {
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View>
        {data.map((item, i) => (
          <ListItem containerStyle={{}} key={item.id}>
            <ListItem.Content>
              <View style={styles.listItemView}>
                <ListItem.Title>{item.type}</ListItem.Title>
                <ListItem.Subtitle>
                  CURRENT:{item.currentUser.username}
                </ListItem.Subtitle>
                <Text>NEXT:{item.nextUser.username}</Text>
              </View>
            </ListItem.Content>
            <Button
              onPress={(e) => onDonePressed(e, i)}
              buttonStyle={styles.listButton}
              title="Done"
            />
          </ListItem>
        ))}
      </View>
    );
  };

  return <View>{getContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
export default HomeScreen;

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

function Nav(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.group}>
        <View style={styles.rect}>
          <View style={styles.icon1Row}>
            <FontAwesomeIcon name="user" style={styles.icon1}></FontAwesomeIcon>
            <FontAwesomeIcon name="plus" style={styles.icon2}></FontAwesomeIcon>
            <FontAwesomeIcon
              name="search"
              style={styles.icon4}
            ></FontAwesomeIcon>
            <IoniconsIcon
              name="md-settings"
              style={styles.icon3}
            ></IoniconsIcon>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  group: {
    // width: 375,
    // height: 75
  },
  rect: {
    width: 375,
    height: 75,
    // backgroundColor: "rgba(210,210,210,1)",
    // flexDirection: "row"
  },
  icon1: {
    color: "rgba(61,61,61,1)",
    fontSize: 28,
    height: 40,
    width: 28,
    overflow: "visible",
  },
  icon2: {
    color: "rgba(61,61,61,1)",
    fontSize: 41,
    height: 40,
    width: 34,
    overflow: "visible",
    marginLeft: 53,
    marginBottom: 5
  },
  icon4: {
    color: "rgba(61,61,61,1)",
    fontSize: 28,
    height: 40,
    width: 28,
    marginLeft: 56,
    overflow: "visible",
  },
  icon3: {
    color: "rgba(61,61,61,1)",
    fontSize: 31,
    height: 40,
    width: 28,
    marginLeft: 41,
    overflow: "visible",
  },
  icon1Row: {
    height: 45,
    flexDirection: "row",
    alignItems: "flex-end",
    flex: 1,
    marginRight: 18,
    marginLeft: 89,
    marginBottom: 13,
    overflow: "visible",
  }
});

export default Nav;

import { StyleSheet } from "react-native";

import { accent } from "../consts";

/****************************
 * Stylesheet for Header.js *
 ****************************/
 export const headerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '25%',
    paddingTop: '1%',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: accent,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  imageL: {
    marginBottom: 'auto',
    marginTop: 'auto',
    marginRight: 'auto',
    marginLeft: 0,
    height: '90%',
    width: 55,
    resizeMode: 'contain'
  },
  imageR: {
    marginBottom: 'auto',
    marginTop: 'auto',
    marginRight: -6,
    marginLeft: 'auto',
    height: '90%',
    width: 55,
    resizeMode: 'contain'
  },
  pasta: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 40,
    fontWeight: 'bold'
  }
});
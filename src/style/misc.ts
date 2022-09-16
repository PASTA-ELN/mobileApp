import { StyleSheet } from "react-native";

import { mainColor, textColor } from "./consts";

/*************************************
 * Stylesheet for miscellaneous items*
 *************************************/
 export const misc = StyleSheet.create({
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    color: mainColor
  },
  centered: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  text: {
    color: textColor
  },
  icon: {
    color: textColor
  }
});
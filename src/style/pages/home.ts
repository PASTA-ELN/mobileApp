import { StyleSheet } from "react-native";

import { accent, bordercolor, mainColor, SCREEN_HEIGHT, textColor } from "../consts";

/**************************
 * Stylesheet for Home.js *
 **************************/
 export const homeStyle = StyleSheet.create({
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: '5%',
    color: textColor
  },
  container: {
    height: SCREEN_HEIGHT * 0.9,
    paddingBottom: 10
  },
  outer: {

  },
  inner: {
    width: '90%',
    height: 50,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 5,
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: mainColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10
  },
  text: {
    color: textColor,
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 20
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 10,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  bottomBar: {
    height: '8%',
    borderTopColor: bordercolor,
    borderTopWidth: 1,
    backgroundColor: accent,
    flexDirection: 'row'
  },
  directionIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: '7%',
  }
});
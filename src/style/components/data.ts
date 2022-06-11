import { StyleSheet } from "react-native";

import { bordercolor, mainColor, SCREEN_HEIGHT, SCREEN_WIDTH, textColor } from "../consts";

/**************************
 * Stylesheet for Data.js *
 **************************/
 export const dataStyle = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT
  },
  header: {
    flexDirection: 'row',
    paddingTop: 2.5,
    paddingBottom: 2.5
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 'auto',
    marginTop: 'auto',
    marginLeft: 10,
    color: textColor
  },
  subHeading: {
    marginTop: 'auto',
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 15
  },
  leftContainer: {
    width: SCREEN_WIDTH * 0.55
  },
  rightContainer: {
    width: SCREEN_WIDTH * 0.45,
    paddingLeft: 10,
    paddingRight: 0,
    marginRight: 10,
    marginLeft: 'auto'
  },
  backIcon: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  backButtonContainer: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  goBackText: {
    fontSize: 20
  },
  ButtonContainer: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 5,
    marginTop: 2.5,
    marginBottom: 2.5,
    backgroundColor: mainColor,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 20
  },
  icon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 5
  },
  dataField: {
    height: '100%',
    backgroundColor: mainColor,
    borderTopColor: bordercolor,
    borderTopWidth: 1,
    padding: 10
  },
  basicEntry: {
    minHeight: 20,
    borderColor: bordercolor,
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: SCREEN_WIDTH - 20
  },
  markdown: {
    maxHeight: `${SCREEN_WIDTH - 20}`,
    maxWidth: `${SCREEN_WIDTH - 20}`
  },
  cameraContainer: {
    backgroundColor: mainColor,
    marginTop: (SCREEN_HEIGHT / 2 - SCREEN_WIDTH / 2),
    marginBottom: 'auto'
  }
});

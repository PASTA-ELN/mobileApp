import { StyleSheet } from "react-native";

import { bordercolor, mainColor, SCREEN_HEIGHT, textColor } from "../consts";

/****************************
 * Stylesheet for Config.js *
 ****************************/
 export const configStyle = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  },
  outer: {
    borderRadius: 10,
    backgroundColor: mainColor,
    marginBottom: 30,
  },
  middle: {
    flexDirection: 'row',
    marginLeft: 25
  },
  inner: {
    width: '90%',
    height: 45,
    flexDirection: 'row',
    borderBottomColor: bordercolor,
    borderBottomWidth: 0.5,
    marginLeft: 10
  },
  innerBottom: {
    width: '90%',
    height: 45,
    flexDirection: 'row',
    marginLeft: 10
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 15,
    color: textColor
  },
  dropDownOuter: {
    width: '50%',
    paddingLeft: 20
  },
  dropDown: {
    height: 30,
    marginTop: 7.5,
    marginBottom: 7.5,
    marginLeft: 'auto',
    marginRight: 10,
    zIndex: 5
  },
  dropDownContainer: {
    marginTop: 7,
    marginRight: 10,
    zIndex: 5
  },
  iconFrame: {
    height: 25,
    width: 25,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: -10,
    marginRight: 5,
    backgroundColor: 'darkgrey',
    borderRadius: 5
  },
  icon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 10
  },
  iconText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 40,
    backgroundColor: 'grey',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  profilePicText: {
    fontSize: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: textColor
  },
  profileInfo: {
    marginLeft: 20,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  usernameText: {
    marginRight: 'auto',
    fontSize: 20,
    color: textColor
  },
  chevron: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 0,
    color: textColor
  },
  login: {
    height: SCREEN_HEIGHT * 0.9,
    backgroundColor: 'white'
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: mainColor
  },
  subText:{
    flexDirection:'row'
  }
});
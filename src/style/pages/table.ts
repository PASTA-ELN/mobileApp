import { StyleSheet } from "react-native";

import { accent, bordercolor, mainColor, SCREEN_HEIGHT, textColor } from "../consts";

/***************************
 * Stylesheet for Table.js *
 ***************************/
 export const tableStyle = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    height: SCREEN_HEIGHT * 0.9
  },
  outer: {
    width: '100%',
    borderTopColor: bordercolor,
    borderRightColor: bordercolor,
    borderTopWidth: 1,
    borderRightWidth: 1
  },
  row: {
    backgroundColor: accent,
    flexDirection: 'row',
    width: '100%',
    minHeight: 40
  },
  row1: {
    backgroundColor: mainColor,
    flexDirection: 'row',
    width: '100%',
    minHeight: 40
  },
  cell: {
    width: '33.3%',
    paddingLeft: 2,
    borderBottomColor: bordercolor,
    borderLeftColor: bordercolor,
    borderBottomWidth: 1,
    borderLeftWidth: 1
  },
  header: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    height: 30,
    borderTopColor: textColor,
    borderRightColor: textColor,
    borderTopWidth: 1,
    borderRightWidth: 1
  },
  heading: {
    width: '33.3%',
    borderBottomColor: textColor,
    borderLeftColor: textColor,
    borderBottomWidth: 1,
    borderLeftWidth: 1
  },
  headingText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20
  },
  sorter: {
    flexDirection: 'row',
    paddingTop: 1
  },
  sortIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 5
  }
});
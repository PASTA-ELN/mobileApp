import { StyleSheet } from "react-native";

import { accent, bordercolor, mainColor, SCREEN_HEIGHT, secondary, textColor } from "../consts";

/***************************
 * Stylesheet for Table.js *
 ***************************/
 export const tableStyle = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.9
  },
  outer: {
    width: '100%'
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
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    height: 30
  },
  heading: {
    width: '33.3%'
  },
  headingText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 15,
    color: mainColor
  },
  sorter: {
    flexDirection: 'row',
    paddingTop: 1
  },
  sortIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 5,
    color: mainColor
  },
  colHead: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

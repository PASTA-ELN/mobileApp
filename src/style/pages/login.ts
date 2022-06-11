import { StyleSheet } from "react-native";

/***************************
 * Stylesheet for Login.js *
 ***************************/
 export const loginStyle = StyleSheet.create({
  outer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 250,
    height: 350,
    padding: 10,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 20,
  },
  pasta: {
    marginLeft: 60,
    marginRight: 'auto',
    fontSize: 30,
    fontWeight: 'bold'
  },
  input: {
    fontSize: 15,
    height: 38,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    color: 'black',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5
  },
  password: {
    fontSize: 15,
    height: 38,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    color: 'black',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5,
    width: 226
  },
  eye: {
    marginLeft: -35,
    marginTop: 13
  },
  checkbox: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  checkboxText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 15
  },
  button: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 0
  },
  qr: {
    width: 30,
    height: 30,
    marginTop: 'auto',
    marginRight: 0,
    marginLeft: 'auto'
  }
});
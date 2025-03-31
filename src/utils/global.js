import React from 'react';
import { showSnackBar } from '@prince8verma/react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, View, Text, Image, StyleSheet } from 'react-native';

import IconM from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconFT from 'react-native-vector-icons/Fontisto';
import IconI from 'react-native-vector-icons/Ionicons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import NetInfo from '@react-native-community/netinfo';
import Loader from '../utility/loader';
import constants from './constants';

import { Dimensions } from 'react-native';
import colors from '../styles/colors';
import repos from '../repos/repos';
import fonts from './fonts';



const styles = StyleSheet.create({
  loaderCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // errorText:{
  //   fontSize:fonts._12,
  //   fontFamily:fonts.FONT_FAMILY.Regular,
  //   color:colors.SECONDARY
  // },

});

const VALID_EMAIL_iD_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VALID_PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,20}$/;

const VALID_POSITIVE_NUMBER_REGEX =
  /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;

export default global = {

  getValidEmailIDRegex() {
    return VALID_EMAIL_iD_REGEX;
  },

  getPasswordRegex() {
    return VALID_PASSWORD_REGEX;
  },

  getPositiveNumberRegex() {
    return VALID_POSITIVE_NUMBER_REGEX;
  },

  isValidPositiveNumber(number) {
    let pattern = VALID_POSITIVE_NUMBER_REGEX;
    return pattern.test(number);
  },

  async storeItem(key, item) {
    try {
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  },

  getItem(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key).then(
        keyValue => {
          // console.log("Key value: " + keyValue); //Display key value
          const item = JSON.parse(keyValue);
          resolve(item ? item : null);
        },
        error => {
          resolve(false);
          console.log('isLoggedIn error :: ' + JSON.stringify(error)); //Display error
        },
      );
    });
  },


  showMessage(text, error = true, toolbar = true, long = false) {
    showMessage(text, error, toolbar, long);
  },

  isOnline() {
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then(state => {
        // console.log('Connection type', state.type);
        // console.log('Is connected?', state.isConnected);
        resolve(state.isConnected);
      });
    });
  },

  showAlert(
    title,
    description,
    onOkay,
    onCancel,
    txtYes = 'Yes',
    txtNo = 'No',
    cancelable = false,
  ) {
    console.log('showAlert called!');

    Alert.alert(
      title,
      description,
      [
        {
          text: txtYes,
          onPress: () => {
            console.log('showAlert onOkay!');
            if (onOkay) onOkay();
          },
        },
        {
          text: txtNo,
          onPress: () => {
            if (onCancel) onCancel();
          },
          style: 'cancel',
        },
        // { text:  , onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: cancelable },
    );
  },

  drawIcon(iconType, icon, size, colorNew) {
    switch (iconType) {
      case constants.IC_IONiCONS:
        return <IconI name={icon} size={size} color={colorNew} />;
      case constants.IC_MATERIAL:
        return <IconM name={icon} size={size} color={colorNew} />;
      case constants.IC_FONTISTO:
        return <IconFT name={icon} size={size} color={colorNew} />;
      case constants.IC_MATERIAL_COMMUNITY:
        return <IconMC name={icon} size={size} color={colorNew} />;
      default:
        // font awsome
        return <IconF name={icon} size={size} color={colorNew} />;
    }
  },

  getLoader() {
    return (
      <View style={[styles.loaderCenter]}>
        <Loader />
      </View>
    );
  },

  getValidateText(text) {
    return <Text style={styles.errorText}>{text}</Text>;
  },

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  },

  getExceptionMessage() {
    let errorResponse = {
      message: 'something went Wrong',
    };

    return errorResponse;
  },

};


function getIcon(from) {
  switch (from) {
    case constants.NO_INTERNET:
      return require('../assets/images/Internet_access_error.png');

    case constants.UNKNOWN_ERROR:
      return require('../assets/images/unknown_error.png');
    default:
      return require('../assets/images/no_data_found.png');
  }
}

// function showMessage(message, error = true, toolbar = true, long = false) {
//   console.log('snackbar message: ', message);

//   showSnackBar({
//     message: message,
//     textColor: '#FFF', // message text color
//     position: 'top', // enum(top/bottom).
//     confirmText: '', // button text.
//     buttonColor: '#03a9f4', // default button text color
//     duration: long ? 4000 : 2000,
//     topMargin: 56, // (in ms), duartion for which snackbar is visible.
//     animationTime: 250, // time duration in which snackbar will complete its open/close animation.
//     backgroundColor: error ? colors.SECONDARY : colors.PRIMARY, //background color for snackbar
//     // onConfirm: () => { }, //  perform some task here on snackbar button press.
//   });
//   // }
// }

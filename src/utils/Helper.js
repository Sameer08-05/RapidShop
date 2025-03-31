// import DocumentPicker from 'react-native-document-picker';
import AppStyles from '../styles/AppStyles';
import fonts, { heightPixel, widthPixel } from './fonts';
import { Camera } from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import DeviceInfo from 'react-native-device-info';
import { ArrowLeft2 } from 'iconsax-react-native';
import Ripple from 'react-native-material-ripple';

const { Text, Image, View, Dimensions, Alert, Linking } = require('react-native');

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD_REGX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const NUMBER_REGX = /^-?\d*\.?\d+$/;

const _getValidateText = (text, center) => {
  return (
    <Text
      style={{
        fontSize: 12,
        color: colors.RED,
        alignSelf: center ? 'center' : 'flex-start',
        paddingLeft: 5,
      }}>
      {text}
    </Text>
  );
};

const getAccessbility = (label, type) => {
  switch (type) {
    case Constants.ACESSBILITY_LABEL.BUTTON:
      return {
        label: `Button_${label}`,
      };
    case Constants.ACESSBILITY_LABEL.TEXTINPUT:
      return {
        label: `textInput${label}`,
      };

    default:
      return {
        label: label,
      };
  }
};

const toSentenceCase = (str) => {
  return str?.toLowerCase()?.split(' ')?.map(function (word) {
    return word?.charAt(0)?.toUpperCase() + word?.slice(1);
  })?.join(' ');
}

const _isEmpty = obj => {
  return Object.keys(obj).length === 0;
};

// const getTabIcon = (name, color, focused) => {
//   let image = null;
//   switch (name) {
//     case 'Consignments':
//       image = require('../assets/home.png');
//       break;
//     case 'Sync':
//       image = require('../assets/dashboard.png');
//       break;
//     case 'Profile':
//       image = require('../assets/user.png');
//       break;
//     default:
//       break;
//   }

//   return (
//     <>
//       <Image
//         source={image}
//         style={[{tintColor: color, height: 20, width: 20}]}
//         resizeMode="contain"
//       />

//       <Text
//         style={{
//           color: AppStyles.colorSet['light'].mainTextColor,
//           paddingTop: 2,
//           fontSize: fonts._12,
//         }}>
//         {name}
//       </Text>
//     </>
//   );
// };

// const _getFilePicker = async () => {
//   try {
//     const res = await DocumentPicker.pick({
//       type: DocumentPicker.types.images,
//       allowMultiSelection: true,
//     });
//     console.log('RES', res);

//     return res;
//   } catch (err) {
//     console.log('_getFilePicker', err);
//     return null;
//   }
//   // onUpload(res);
// };

const _getHorizontalPadding = padding => {
  return <View style={{ width: widthPixel(padding) }} />;
};

const _getVerticalPadding = padding => {
  return <View style={{ height: heightPixel(padding) }} />;
};

const backBtn = (onBackPress) => {

  return (

    <View style={{ height: heightPixel(55), backgroundColor: "white", justifyContent: "center", paddingHorizontal: widthPixel(20) }} >

      <Ripple onPress={onBackPress} style={{ height: heightPixel(24), width: widthPixel(24), justifyContent: "center", alignItems: "center" }} >

        <ArrowLeft2 size="18" color="black" />

      </Ripple>

    </View>

  )

}




const colors = {
  buttonBackground: '#78787A99',
  RED: '#F44336',
  _NEW: '#FF0867',
  _SELLING_FAST: '#000000',
  _RESTOCKED: '#FF8017',
  _OVERSIZED: '#30CF6E',
  _BEST_SELLER: '#0B62FC',
  _RIBBLE: '#414040',
  TRANS_BLACK: 'rgba(0,0,0,0.2)',
  _DARK_GRAY: '#848282',
};

const _getOldDate = () => {
  const currentDate = new Date();
  const one23YearsAgo = new Date(currentDate);
  one23YearsAgo.setFullYear(currentDate.getFullYear() - 123);
  // console.log(one23YearsAgo);
  return one23YearsAgo;
};

function checkKeys(object, pattern) {
  console.log('object', object, pattern);
  const regex = new RegExp(pattern);
  const result = {};

  Object.keys(object).forEach(key => {
    if (regex.test(key)) {
      result[key] = object[key];
    }
  });

  console.log('result', result);

  return Object.values(result).every(
    value => value != '' && value != undefined,
  );
}

async function deleteFile(path) {
  try {
    await RNFS.unlink(path);
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

const getRegionFromCoordinates = coordinates => {
  // console.log("getRegionFromCoordinates", coordinates)
  if (!Array.isArray(coordinates) || coordinates.length === 0) {
    return null; // Return null for invalid input
  }

  let minLat = coordinates[0].latitude;
  let maxLat = coordinates[0].latitude;
  let minLng = coordinates[0].longitude;
  let maxLng = coordinates[0].longitude;

  for (let i = 1; i < coordinates.length; i++) {
    const { latitude, longitude } = coordinates[i];

    // Update minimum and maximum values
    minLat = Math.min(minLat, latitude);
    maxLat = Math.max(maxLat, latitude);
    minLng = Math.min(minLng, longitude);
    maxLng = Math.max(maxLng, longitude);
  }

  const region = {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: maxLat - minLat + 0.01, // Add a small buffer
    longitudeDelta: maxLng - minLng + 0.01,
  };

  return region;
};

const deviceInfo = () => {
  return new Promise((resolve, reject) => {
    Promise.all([DeviceInfo.getModel(), DeviceInfo.getUniqueId()])
      .then(([model, id]) => {
        console.log('Model:', model);
        console.log('Unique ID:', id);
        const deviceInfo = {
          model: model,
          uniqueId: id,
        };
        resolve(deviceInfo);
      })
      .catch(error => {
        console.error('Error retrieving device info:', error);
        reject(error);
      });
  });
};

export {
  _getValidateText,
  colors,
  EMAIL_REGEX,
  PASSWORD_REGX,
  NUMBER_REGX,
  checkKeys,
  _getHorizontalPadding,
  _getVerticalPadding,
  getRegionFromCoordinates,
  _getOldDate,
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  _isEmpty,
  deleteFile,
  deviceInfo,
  backBtn,
  getAccessbility,
  toSentenceCase
};

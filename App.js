
import React, { useEffect } from 'react';
import {
  LogBox,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';

import SnackBar from '@prince8verma/react-native-snackbar';
import RootContainer from './src/navigations/RootContainer';
import { Provider } from 'react-redux';


const showStatusBar = Platform.OS === 'ios' ? true : false;

const App = () => {


  useEffect(() => {
    LogBox.ignoreAllLogs();
    LogBox.ignoreLogs(["Warning: This synthetic"]);
  }, []);

  return (
    <View
      style={{ flex: 1, backgroundColor: "white" }}
    >

      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} >

        {
          showStatusBar &&
          <StatusBar barStyle={"dark-content"} />
        }

        <RootContainer />

      </SafeAreaView>


      <SnackBar id={"Root_App"} />

    </View>
  );
};


export default App;

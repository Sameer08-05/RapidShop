import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './MainStack';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ProductDetails from '../screens/screen/ProductDetails';
import OnBoardStack from './OnBoardStack';
import Splash from '../screens/onBoard/Splash';

const Stack = createNativeStackNavigator();

export default function RootContainer() {

  return (

    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="onBoard" component={OnBoardStack} />
          <Stack.Screen name="MainStack" component={MainStack} />
          <Stack.Screen name="DetailPage" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
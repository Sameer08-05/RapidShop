import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import LoginScreen from '../screens/onBoard/LoginScreen';


const OnboardStack = createNativeStackNavigator();


const OnBoardStack = () => {


  return (
    <OnboardStack.Navigator>
      <OnboardStack.Screen
        options={{ headerShown: false }}
        name="LoginScreen" component={LoginScreen}
      />
    </OnboardStack.Navigator>
  )
}

export default OnBoardStack

const styles = StyleSheet.create({})
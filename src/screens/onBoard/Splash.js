import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {

  useEffect(() => {
    checkLoginStatus();
  }, [])

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userCredential = await AsyncStorage.getItem('userCredential');
      let route = 'onBoard';
      if (isLoggedIn || userCredential) {
        route = 'MainStack';
      }

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: route }],
        });
      }, 1000);
    } catch (error) {
      console.error('Error getting login status:', error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
      <Text style={{ color: "black" }} >RapidShop</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})
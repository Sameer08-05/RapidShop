import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import AllOrders from '../screens/orders/AllOrders';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const MainStack = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          borderTopWidth: 0,
          tabBarInactiveTintColor: 'grey',
          tabBarActiveTintColor: 'black',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialIcons name="home" size={20} color="grey" />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={AllOrders}

        options={{
          headerShown: false,
          title: 'Orders',
          tabBarIcon: () => (
            <MaterialIcons name="shopping-cart" size={20} color="grey" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

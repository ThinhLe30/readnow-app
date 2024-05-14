import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Health from '../screens/Health';
import Business from '../screens/Business';
import Sports from '../screens/Sports';
import Tech from '../screens/Tech';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#3C5B6F',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Health"
        component={Health}
        options={{
          tabBarActiveTintColor: '#3C5B6F',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Tech"
        component={Tech}
        options={{
          tabBarActiveTintColor: '#3C5B6F',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="hardware-chip" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Business"
        component={Business}
        options={{
          tabBarActiveTintColor: '#3C5B6F',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="logo-usd" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Sports"
        component={Sports}
        options={{
          tabBarActiveTintColor: '#3C5B6F',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="basketball" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

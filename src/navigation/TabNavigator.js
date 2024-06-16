import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Short from '../screens/Short';
import Profile from '../screens/Profile';
import Checklist from '../screens/Checklist';
const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#1D5868',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#1D5868',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Short"
        component={Short}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#1D5868',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="flash" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Checklist"
        component={Checklist}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#1D5868',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="bookmark" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#1D5868',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

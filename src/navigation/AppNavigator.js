import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import Login from '../components/LoginModal';
import {EventRegister} from 'react-native-event-listeners';
import theme from '../config/theme';
import themeContext from '../config/themeContext';
import {LoginRequiredContext} from '../hooks/loginContext';
import TabNavigator from './TabNavigator';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AppNavigator = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const context = useContext(LoginRequiredContext);
  useEffect(() => {
    let eventListener = EventRegister.addEventListener('themeChange', data => {
      setIsEnabled(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  return (
    <themeContext.Provider
      value={isEnabled === true ? theme.light : theme.dark}>
      <NavigationContainer
        theme={isEnabled === true ? DarkTheme : DefaultTheme}>
        <TabNavigator />
      </NavigationContainer>
      {context.isLoginRequired && (
        <>
          <AnimatedPressable
            entering={FadeIn}
            exiting={FadeOut}
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1,
            }}
            onPress={() =>
              context.handleLoginRequired(false)
            }></AnimatedPressable>
          <Login />
        </>
      )}
    </themeContext.Provider>
  );
};

export default AppNavigator;

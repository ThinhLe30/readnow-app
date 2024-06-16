import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {Text, View} from 'react-native';
import React from 'react';
import CommonLogin from './CommonLogin';
const Login = () => {
  return (
    <Animated.View
      entering={SlideInDown.springify().damping(15)}
      exiting={SlideOutDown}
      style={{
        backgroundColor: 'white',
        padding: 24,
        height: 550,
        width: '100%',
        position: 'absolute',
        bottom: -20 * 1.1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 100,
      }}>
      <View className="flex flex-col items-center justify-center h-full">
        <Text className="text-2xl font-bold text-black">Welcome back</Text>
        <CommonLogin />
      </View>
    </Animated.View>
  );
};
export default Login;

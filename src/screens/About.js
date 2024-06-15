import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {signInWithGoogle} from '../config/auth';
const About = () => {
  const handleSignIn = async () => {
    const userInfo = await signInWithGoogle();
    setUserInfo(userInfo?.user?.id);
  };
  return (
    <View style={styles.center}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>{userInfo || ''}</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          onPress={handleSignIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default About;

import React, {useContext} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {AuthRequirement} from './AuthRequired';
import {AuthContext} from '../hooks/authContext';
GoogleSignin.configure({
  webClientId:
    '466657629133-86eq1rqpmhbe2uraea4l6mhf3pu8554s.apps.googleusercontent.com',
});
const Profile = () => {
  const {userInfo, logout} = useContext(AuthContext);
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      logout();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  if (!userInfo) {
    return <AuthRequirement />;
  }
  console.log(userInfo);
  return (
    <View
      className="flex flex-col justify-center items-center"
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;

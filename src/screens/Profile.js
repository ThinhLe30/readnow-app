import React, {useContext} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {jwtDecode} from 'jwt-decode';
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
  const userDecoded = jwtDecode(userInfo);
  console.log(userDecoded);

  return (
    // <View
    //   className="flex flex-col justify-center items-center"
    //   style={{
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //   }}>
    //   <Button title="Sign Out" onPress={signOut} />
    // </View>
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{uri: userDecoded.photo}} style={styles.profileImage} />
        <Text style={styles.profileName}>{userDecoded.name}</Text>
        <Text style={styles.profileStatus}>⚡ {userDecoded.role}</Text>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactText}>Google ID</Text>
        <Text style={styles.contactDetail}>{userDecoded.authId}</Text>
        <Text style={styles.contactText}>Mail</Text>
        <Text style={styles.contactDetail}>{userDecoded.email}</Text>
      </View>

      {/* <Button title="Sign Out" onPress={signOut} /> */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={signOut}
        className="
          absolute 
          bottom-5">
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </TouchableOpacity>
      <Image
        source={require('../assets/img/news-pana.png')}
        style={styles.banaImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150, // Increased size
    height: 150, // Increased size
    borderRadius: 75, // Half of the width/height to make it a circle
    marginBottom: 10,
  },
  banaImage: {
    width: 300, // Increased size
    height: 300, // Increased size
    marginBottom: 10,
    alignSelf: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  profileStatus: {
    fontSize: 14,
    color: '#888',
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactText: {
    fontSize: 14,
    color: '#888',
  },
  contactDetail: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  options: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#1D5868',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;

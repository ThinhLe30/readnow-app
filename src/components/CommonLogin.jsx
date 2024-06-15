import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import {signInWithGoogle} from '../config/auth';
import {useMutation} from '@tanstack/react-query';
import apiInstance from '../apis/News';
import {AuthContext} from '../hooks/authContext';
const CommonLogin = () => {
  const {height} = Dimensions.get('window');
  const {login} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(true);
  const mutation = useMutation({
    mutationFn: newTodo => {
      return apiInstance.post('/auth/login/google/v2', newTodo);
    },
  });
  useEffect(() => {
    if (mutation.isSuccess) {
      console.log(mutation?.data?.data?.token);
      login(mutation.data?.data?.token);
    }
  }, [mutation.isSuccess]);
  const handleSignIn = async () => {
    const userInfo = await signInWithGoogle();
    console.log({
      authId: userInfo?.user?.id,
      name: userInfo?.user?.name,
      email: userInfo?.user?.email,
      photo: userInfo?.user?.photo,
    });

    mutation.mutate({
      authID: userInfo?.user?.id,
      name: userInfo?.user?.name,
      email: userInfo?.user?.email,
      photo: userInfo?.user?.photo,
    });
  };
  return (
    <View className="flex-1 justify-center items-center">
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        onPress={handleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 5,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default CommonLogin;

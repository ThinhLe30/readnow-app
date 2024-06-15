import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

function AuthProvider({children}) {
  const [userInfo, setUserInfo] = useState('');

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setUserInfo(token);
      } catch (error) {
        console.error('Failed to load user info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async token => {
    try {
      setUserInfo(token);
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Failed to save user info:', error);
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUserInfo(null);
    } catch (error) {
      console.error('Failed to remove user info:', error);
    }
  };

  const contextValue = {
    userInfo,
    login,
    logout,
    loading,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
export {AuthContext, AuthProvider};

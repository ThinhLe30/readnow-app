import React, {useState, useContext} from 'react';
import {View, Text, Switch, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '../config/themeContext';

export default function CustomDrawerContent(props) {
  //Theme
  const theme = useContext(themeContext);
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: theme.headerColor,
          alignItems: 'center',
          marginTop: -4,
          marginBottom: 10,
        }}>
        <Image
          source={require('../assets/img/header-logo-book.png')}
          style={{
            width: 20,
            height: 20,
            backgroundColor: theme.headerColor,
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            alignItems: 'center',
          }}>
          ReadNow
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
          backgroundColor: theme.headerColor,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <Ionicons name="moon" size={25} color={theme.iconColor} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.iconColor,
            alignItems: 'center',
          }}>
          Dark Mode
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#ffffff' : '#E4F2EF'}
          value={isEnabled}
          onValueChange={value => {
            setIsEnabled(value);
            EventRegister.emit('themeChange', value);
          }}
          style={{
            marginTop: -13,
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

import {View, Image, Text, StyleSheet} from 'react-native';
import themeContext from '../config/themeContext';
import React, {useContext} from 'react';
const NotFound = () => {
  const theme = useContext(themeContext);
  return (
    <View>
      <Image
        source={require('../assets/img/no-data.png')}
        style={styles.banaImage}
      />
      <Text
        style={{
          fontSize: 20,
          color: theme.textColor,
          textAlign: 'center',
        }}>
        No articles found
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  banaImage: {
    width: 300, // Increased size
    height: 300, // Increased size
    marginBottom: 10,
    alignSelf: 'center',
  },
});
export default NotFound;

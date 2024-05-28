import moment from 'moment';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import themeContext from '../config/themeContext';
import React, {useContext} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

function Detail({item, onPress}) {
  const {width} = useWindowDimensions();
  var resTitle = item.title;
  const theme = useContext(themeContext);
  const source = {
    html: item.content,
  };
  var resDesc = '';
  if (item.content === null) {
    resDesc = 'null';
  } else {
    resDesc = item.content;
  }

  return (
    <View style={styles.mainCard}>
      <ImageBackground
        source={item.imageURL ? {uri: item.imageURL} : null}
        style={styles.cardBGImage}>
        <View style={{height: 300}} />
        <ScrollView style={styles.cardContent}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: theme.textColor,
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              {resTitle}
            </Text>
            <RenderHtml source={source} contentWidth={width} />
            {/* <Text style={{color: theme.textColor, fontSize: 15, marginTop: 15}}>
              {resDesc}
            </Text>
            <Text style={{color: theme.textColor, fontSize: 15, marginTop: 15}}>
              {resDesc}
            </Text> */}
          </View>
          <View>
            <Text
              style={{
                color: theme.textColor,
                fontSize: 15,
                paddingTop: 10,
                fontWeight: 'bold',
              }}>
              {item.author === null ? 'Legit Source' : item.author}
            </Text>
            <Text
              style={{
                color: theme.textColor,
                fontSize: 15,
                marginTop: 10,
                paddingBottom: 30,
              }}>
              🕘 {moment(item.publishedAt).format('MMMM Do YYYY, h:mm a')}
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
  },
  cardBGImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
});

export default Detail;

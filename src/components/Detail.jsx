import moment from 'moment';
import {View, StyleSheet, Text} from 'react-native';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import themeContext from '../config/themeContext';
import React, {useContext} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {ImageHeaderScrollView} from 'react-native-image-header-scroll-view';

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
      <ImageHeaderScrollView
        maxHeight={200}
        minHeight={100}
        headerImage={{uri: item.imageURL}}
        renderForeground={() => (
          <View
            style={{
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
        )}>
        <ScrollView style={styles.cardContent}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: theme.textColor,
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {resTitle}
            </Text>
            <RenderHtml
              source={source}
              contentWidth={width}
              baseStyle={styles.baseStyle}
            />
          </View>
          <View>
            <Text
              style={{
                color: theme.textColor,
                fontSize: 15,
                // paddingTop: 10,
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
      </ImageHeaderScrollView>
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
  baseStyle: {
    fontSize: 18,
    textAlign: 'justify',
    fontWeight: 'normal',
  },
});

export default Detail;

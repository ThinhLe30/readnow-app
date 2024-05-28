import React, {useContext, useState} from 'react';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  Share,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import themeContext from '../config/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Detail from './Detail';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

function Card({item, onPress}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [iconColor, setIconColor] = useState('#3C5B6F');
  const [iconBackground, setIconBackground] = useState('heart-outline');
  const [animateModal, setanimateModal] = useState(false);

  //handleShare
  const handleShare = () => {
    const {url, title} = item; //get url and title form our prop
    var message = `${title} \n\n Read More ${url} \n\n Shared via The NewsXTimes`; // custome message
    return Share.share(
      {title, message, url: message},
      {dialogTitle: `Share ${title}`},
    );
  };

  const toggleSavedForLater = () => {
    setIconBackground(iconBackground === 'heart' ? 'heart-outline' : 'heart');
    setIconColor(
      iconBackground === 'heart' ? theme.textColor : theme.headerColor,
    );
  };

  const theme = useContext(themeContext);
  return (
    <View>
      <TouchableNativeFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View
          style={{
            margin: 20,
            borderRadius: 15,
            backgroundColor: theme.cardBackground,
            height: 300,
            overflow: 'hidden',
            elevation: 3,
          }}>
          <View>
            <Image
              source={
                item.imageURL
                  ? {uri: item.imageURL}
                  : require('../assets/img/defaultNews.jpeg')
              }
              style={styles.image}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'transparent',
                padding: 5,
              }}
              onPress={toggleSavedForLater}>
              <Ionicons name={iconBackground} color={iconColor} size={35} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              width: width,
              marginHorizontal: width * 0.03,
              marginVertical: width * 0.03,
              fontSize: 20,
              fontWeight: 'bold',
              color: theme.textColor,
              maxWidth: width * 0.85,
            }}
            numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.author}>
            {item.author ? item.author : 'Not Available'}
          </Text>
          <Text style={styles.desc} numberOfLines={2}>
            {item.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: theme.headerColor,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                width: 120,
                padding: 2,
                elevation: 3,
                marginLeft: 10,
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 10,
                  color: 'white',
                }}>
                🕘 {moment(item.publishedAt).format('MMMM Do YYYY')}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="eye-outline"
                color={theme.textColor}
                size={20}
                style={{marginRight: 5}}
              />
              <Text style={{fontSize: 14, color: theme.textColor}}>
                {item.viewCount}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="arrow-up-circle-outline"
                color={theme.textColor}
                size={20}
                style={{marginRight: 5}}
              />
              <Text style={{fontSize: 14, color: theme.textColor}}>
                {item.viewCount}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                marginRight: 10,
              }}
              onPress={handleShare}>
              <Ionicons name="share-social" color={theme.textColor} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableNativeFeedback>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        statusBarTranslucent={false}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            marginTop: 5,
            overflow: 'hidden',
            flexDirection: 'column',
          }}>
          <Button
            title="Close"
            onPress={() => setModalVisible(!modalVisible)}
            color={'#252525'}
          />

          <View style={{flex: 1}}>
            <Detail item={item} />
          </View>
          <Button title="Share" onPress={handleShare} color={'#3C5B6F'} />
        </View>
      </Modal> */}
      <SwipeUpDownModal
        modalVisible={modalVisible}
        PressToanimate={animateModal}
        //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
        ContentModal={
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              marginTop: 5,
              overflow: 'hidden',
              flexDirection: 'column',
            }}>
            <View style={{flex: 1}}>
              <Detail item={item} />
            </View>
          </View>
        }
        HeaderStyle={styles.headerContent}
        ContentModalStyle={styles.Modal}
        HeaderContent={
          <View style={styles.containerHeader}>
            <Ionicons name="chevron-down-outline" size={40} />
          </View>
        }
        onClose={() => {
          setModalVisible(false);
          setanimateModal(false);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: width,
    height: height * 0.16,
    // resizeMode: 'cover',
  },
  author: {
    width: width,
    marginTop: -10,
    marginHorizontal: width * 0.03,
    color: 'darkgray',
  },
  desc: {
    width: width,
    marginTop: 5,
    marginHorizontal: width * 0.03,
    color: 'gray',
    maxWidth: width * 0.8,
  },
  containerContent: {flex: 1, marginTop: 40},
  containerHeader: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    // backgroundColor: '#F1F1F1',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  headerContent: {
    marginTop: 0,
  },
  Modal: {
    // backgroundColor: '#005252',
    marginTop: 0,
  },
});

export default Card;

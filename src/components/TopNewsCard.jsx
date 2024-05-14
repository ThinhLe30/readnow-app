import {useTheme} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  Share,
  Button,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Linking,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeContext from '../config/themeContext';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

function Card({item, onPress}) {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useContext(themeContext);
  //onPress={() => Linking.openURL(item.url)} >

  //handleShare
  const handleShare = () => {
    const {url, title} = item; //get url and title form our prop
    var message = `${title} \n\n Read More ${url} \n\n Shared via The NewsXTimes`; // custome message
    return Share.share(
      {title, message, url: message},
      {dialogTitle: `Share ${title}`},
    );
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <View className="relative">
          <Image
            source={{
              uri:
                item.imageURL ||
                'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            }}
            style={{
              width: width * 0.8,
              height: height * 0.22,
              marginRight: 20,
            }}
            resizeMode="cover"
            className="rounded-3xl"
          />
          {/* Title and Author */}
          <View className="absolute bottom-6 left-4 justify-end h-[80%]">
            <View className=" space-y-1">
              <View className=" max-w-[98%]">
                <Text className="text-white text-base font-semibold capitalize">
                  {item.title.length > 60
                    ? item.title.slice(0, 58) + '...'
                    : item.title.split('-')[0] || 'N/A'}
                </Text>
              </View>

              <View className="">
                <Text className="text-neutral-300 text-sm font-medium">
                  {item?.author?.length > 20
                    ? item.author.slice(0, 20) + '...'
                    : item.author}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* <TouchableNativeFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View
          style={{
            margin: 20,
            borderRadius: 15,
            backgroundColor: theme.cardBackground,
            width: 200,
            height: 210,
            overflow: 'hidden',
            elevation: 3,
          }}>
          <Image source={{uri: item.imageURL}} style={styles.image} />
          <Text
            style={{
              width: width,
              marginHorizontal: width * 0.03,
              marginVertical: width * 0.03,
              fontSize: 15,
              fontWeight: 'bold',
              color: theme.textColor,
              maxWidth: width * 0.45,
            }}
            numberOfLines={2}>
            {item.title ? item.title : 'Not Available'}
          </Text>
          <Text style={styles.author}>
            {' '}
            {item.author ? item.author : 'Not Available'}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                backgroundColor: theme.headerColor,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                width: 130,
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
                🕘 {moment(item.publishedAt).format('MMMM Do YYYY, h:mm a')}
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
      </TouchableNativeFeedback> */}
      <Modal
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
          <View>
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
              color={'#252525'}
            />
            <Button title="Share" onPress={handleShare} color={'#DA3349'} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 100,
  },
  author: {
    width: width,
    marginTop: -10,
    marginHorizontal: width * 0.03,
    color: 'darkgray',
    maxWidth: width * 0.4,
  },
});

export default Card;

//cardBackground

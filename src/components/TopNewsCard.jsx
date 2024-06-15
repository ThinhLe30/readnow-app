import React, {useContext, useState} from 'react';
import {
  Modal,
  Share,
  Button,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import themeContext from '../config/themeContext';

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
  function handleClick(item) {}

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <View className="relative">
          <Image
            source={
              item.imageURL
                ? {uri: item.imageURL}
                : require('../assets/img/defaultNews.jpeg')
            }
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

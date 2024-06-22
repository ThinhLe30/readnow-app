import React, {useContext, useState, useEffect} from 'react';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
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
import NewsDetail from './NewsDetail';
import moment from 'moment';
import {AuthContext} from '../hooks/authContext';
import {LoginRequiredContext} from '../hooks/loginContext';
import newAPI from '../apis/News';
const {width, height} = Dimensions.get('window');

function ShortCard({item, onPress}) {
  const [modalVisible, setModalVisible] = useState(false);
  const {userInfo} = useContext(AuthContext);
  const context = useContext(LoginRequiredContext);
  const [animateModal, setanimateModal] = useState(false);
  const [isChecked, setIsChecked] = useState(item.isChecked);
  const [isVoted, setIsVoted] = useState(item.isVoted);
  const formatNumber = num => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };
  const source = {
    html: item.content,
  };

  useEffect(() => {
    setIsChecked(item.isChecked);
  }, [item.isChecked]);
  useEffect(() => {
    setIsVoted(item.isVoted);
  }, [item.isVoted]);

  function computeTimeDifference() {
    let displayTime;
    const now = moment().add(7, 'hours');
    const publishedTime = moment(item.publishedAt);
    const timeDifferenceInMinutes = now.diff(publishedTime, 'minutes');
    const timeDifferenceInHours = now.diff(publishedTime, 'hours');
    const timeDifferenceInDays = now.diff(publishedTime, 'days');

    if (timeDifferenceInMinutes < 1) {
      displayTime = 'Just now';
    } else if (timeDifferenceInMinutes < 60) {
      displayTime = `${timeDifferenceInMinutes} min later`;
    } else if (timeDifferenceInHours < 24) {
      displayTime = `${timeDifferenceInHours} hour${
        timeDifferenceInHours > 1 ? 's' : ''
      } later`;
    } else {
      displayTime = `${timeDifferenceInDays} day${
        timeDifferenceInDays > 1 ? 's' : ''
      } ago`;
    }
    return displayTime;
  }

  //handleShare
  const handleShare = () => {
    const {url, title} = item; //get url and title form our prop
    var message = `${title} \n\n Read More ${url} \n\n Shared via ReadNow`; // custome message
    return Share.share(
      {title, message, url: message},
      {dialogTitle: `Share ${title}`},
    );
  };
  useEffect(() => {
    setIsChecked(item.isChecked);
  }, [item.isChecked]);

  const toggleSavedForLater = async () => {
    if (!userInfo) {
      context.handleLoginRequired(true);
    } else {
      try {
        await newAPI.post(`article-interact/checklist/${item.id}`).then(() => {
          notChecked = !isChecked;
          setIsChecked(notChecked);
          item.isChecked = notChecked;
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function handleVotePress() {
    if (!userInfo) {
      context.handleLoginRequired(true);
    } else {
      try {
        await newAPI.post(`article-interact/vote/${item.id}`).then(() => {
          notVoted = !isVoted;
          setIsVoted(notVoted);
          item.isVoted = notVoted;
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const theme = useContext(themeContext);
  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}>
      <TouchableNativeFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View
          style={{
            position: 'relative',
            margin: 20,
            borderRadius: 15,
            backgroundColor: theme.cardBackground,
            height: height - 140,
            flex: 1,
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
            {/* <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'transparent',
                padding: 5,
              }}
              onPress={toggleSavedForLater}>
              <Ionicons
                name={isChecked ? 'bookmark' : 'bookmark-outline'}
                color={theme.headerColor}
                size={30}
              />
            </TouchableOpacity> */}
          </View>

          <Text
            style={{
              width: width,
              marginHorizontal: width * 0.03,
              marginVertical: width * 0.03,
              fontSize: 20,
              // fontStyle: 'bold',
              color: theme.textColor,
              maxWidth: width * 0.85,
            }}
            className="font-bold"
            numberOfLines={2}>
            {item.title}
          </Text>
          {/* <Text style={styles.author}>
            {item.author ? item.author : 'Not Available'}
          </Text> */}
          <View className="flex-row items-center flex">
            <Text style={styles.author}>
              {item.author ? item.author : 'Not Available'}
            </Text>

            <View
              style={{
                backgroundColor: theme.headerColor,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                width: 80,
                padding: 2,
                elevation: 3,
                marginTop: -10,
              }}>
              <Text
                style={{
                  fontSize: 10,
                  color: 'white',
                }}>
                {item.category.name}
              </Text>
            </View>
          </View>
          <Text style={styles.desc} numberOfLines={5} className="italic">
            {item.summary}
          </Text>
          <Text style={styles.content} numberOfLines={14}>
            {item.striptContent}
          </Text>
          {/* <RenderHTML
            source={source}
            contentWidth={width}
            baseStyle={styles.baseStyle}
          /> */}
          <View
            className="
            absolute  w-full
            bottom-2"
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
                🕘 {computeTimeDifference()}
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
                {formatNumber(item.viewCount)}
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
                {formatNumber(item.voteCount)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
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
              <NewsDetail item={item} />
            </View>
          </View>
        }
        HeaderStyle={styles.headerContent}
        ContentModalStyle={styles.Modal}
        HeaderContent={
          <View style={styles.containerHeader}>
            <Ionicons name="chevron-down-outline" size={40} color={'black'} />
          </View>
        }
        onClose={() => {
          setModalVisible(false);
          setanimateModal(false);
        }}
      />

      <View className=" rounded-full items-center justify-center flex-col absolute bottom-16 right-5 bg-transparent">
        <TouchableOpacity
          className="bg-gray-100 p-2 m-3 rounded-full"
          onPress={toggleSavedForLater}>
          <Ionicons
            name={isChecked ? 'bookmark' : 'bookmark-outline'}
            color={isChecked ? theme.headerColor : 'black'}
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleVotePress}
          className="bg-gray-100 p-2 m-2 rounded-full">
          <Ionicons
            name={isVoted ? 'chevron-up-circle' : 'chevron-up-circle-outline'}
            color={isVoted ? theme.headerColor : 'black'}
            size={25}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-100 p-2 m-3 rounded-full"
          onPress={handleShare}>
          <Ionicons name="share-outline" color="black" size={25} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: width,
    height: height * 0.3,
  },
  author: {
    marginTop: -10,
    marginHorizontal: width * 0.03,
    color: 'gray',
  },
  desc: {
    width: width,
    marginTop: 5,
    marginHorizontal: width * 0.03,
    color: 'black',
    maxWidth: width * 0.85,
    textAlign: 'justify',
    // fontStyle: 'italic',
  },
  content: {
    width: width,
    marginTop: 5,
    marginHorizontal: width * 0.03,
    color: 'black',
    maxWidth: width * 0.85,
    textAlign: 'justify',
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
  baseStyle: {
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 20,
    color: 'black',
    marginHorizontal: width * 0.03,
    marginVertical: width * 0.03,
    height: height * 0.25,
  },
});

export default ShortCard;

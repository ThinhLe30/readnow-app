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
  Pressable,
} from 'react-native';
import themeContext from '../config/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Detail from './Detail';
import moment from 'moment';
import {AuthContext} from '../hooks/authContext';
import {LoginRequiredContext} from '../hooks/loginContext';
import RenderHTML from 'react-native-render-html';
import newAPI from '../apis/News';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const {width, height} = Dimensions.get('window');

function ShortCard({item, onPress}) {
  const [modalVisible, setModalVisible] = useState(false);
  const {userInfo} = useContext(AuthContext);
  const context = useContext(LoginRequiredContext);
  const [animateModal, setanimateModal] = useState(false);
  const [isChecked, setIsChecked] = useState(item.isChecked);
  const source = {
    html: item.content,
  };

  const now = moment();
  const publishedTime = moment(item.publishedAt);
  const timeDifferenceInMinutes = now.diff(publishedTime, 'minutes');
  const timeDifferenceInHours = now.diff(publishedTime, 'hours');
  const timeDifferenceInDays = now.diff(publishedTime, 'days');

  let displayTime;

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
            <TouchableOpacity
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
            </TouchableOpacity>
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
          <Text style={styles.author}>
            {item.author ? item.author : 'Not Available'}
          </Text>
          <Text style={styles.desc} numberOfLines={5} className="italic">
            {item.summary}
          </Text>
          {/* <Text style={styles.content} numberOfLines={18}>
            {item.content}
          </Text> */}
          <RenderHTML
            source={source}
            contentWidth={width}
            baseStyle={styles.baseStyle}
          />
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
                🕘 {displayTime}
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
                {item.voteCount}
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
            <Ionicons name="chevron-down-outline" size={40} color={'#FFFFFF'} />
          </View>
        }
        onClose={() => {
          setModalVisible(false);
          setanimateModal(false);
        }}
      />
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: width,
    height: height * 0.3,
  },
  author: {
    width: width,
    marginTop: -10,
    marginHorizontal: width * 0.03,
    color: 'gray',
  },
  content: {
    width: width,
    marginTop: -10,
    marginHorizontal: width * 0.03,
    color: 'black',
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

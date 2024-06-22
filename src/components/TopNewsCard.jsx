import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import NewsDetail from './NewsDetail';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import Detail from './Detail';
import Login from './LoginModal';
import {LoginRequiredContext} from '../hooks/loginContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TopNewsCard({item}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [animateModal, setanimateModal] = useState(false);
  const context = useContext(LoginRequiredContext);

  const onPress = () => {
    setModalVisible(!modalVisible);
    try {
      newAPI.post(`article-interact/view/${item.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.cardContainer} className="rounded-3xl">
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
          <Image
            source={
              item.imageURL
                ? {uri: item.imageURL}
                : require('../assets/img/defaultNews.jpeg')
            }
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.author}>{item.author}</Text>
              <View style={styles.dot} />
              <Text style={styles.author}>{item.category.name}</Text>
            </View>
            <Text style={styles.title}>
              {item.title.length > 60
                ? item.title.slice(0, 58) + '...'
                : item.title.split('-')[0] || 'N/A'}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

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
            {context.isLoginRequired && (
              <>
                <AnimatedPressable
                  entering={FadeIn}
                  exiting={FadeOut}
                  style={{
                    ...StyleSheet.absoluteFill,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                  }}
                  onPress={() =>
                    context.handleLoginRequired(false)
                  }></AnimatedPressable>
                <Login />
              </>
            )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 20,
    // borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    width: width * 0.8,
    height: height * 0.24,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    color: 'white',
    fontSize: 14,
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
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
    margin: 10,
  },
  tagText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white',
    // marginHorizontal: 5,
    marginRight: 5,
    marginLeft: 5,
  },
});

export default TopNewsCard;

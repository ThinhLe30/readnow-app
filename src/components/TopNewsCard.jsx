// import React, {useContext, useState} from 'react';
// import {
//   Modal,
//   Share,
//   Button,
//   View,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   Image,
//   Dimensions,
//   Text,
// } from 'react-native';
// import themeContext from '../config/themeContext';

// const {width, height} = Dimensions.get('window');

// function Card({item, onPress}) {
//   const [modalVisible, setModalVisible] = useState(false);
//   const theme = useContext(themeContext);
//   //onPress={() => Linking.openURL(item.url)} >

//   //handleShare
//   const handleShare = () => {
//     const {url, title} = item; //get url and title form our prop
//     var message = `${title} \n\n Read More ${url} \n\n Shared via The NewsXTimes`; // custome message
//     return Share.share(
//       {title, message, url: message},
//       {dialogTitle: `Share ${title}`},
//     );
//   };
//   function handleClick(item) {}

//   return (
//     <View>
//       <TouchableWithoutFeedback onPress={() => handleClick(item)}>
//         <View className="relative">
//           <Image
//             source={
//               item.imageURL
//                 ? {uri: item.imageURL}
//                 : require('../assets/img/defaultNews.jpeg')
//             }
//             style={{
//               width: width * 0.8,
//               height: height * 0.22,
//               marginRight: 20,
//             }}
//             resizeMode="cover"
//             className="rounded-3xl"
//           />
//           {/* Title and Author */}
//           <View className="absolute bottom-6 left-4 justify-end h-[80%]">
//             <View className=" space-y-1">
//               <View className=" max-w-[98%]">
//                 <Text className="text-white text-base font-semibold capitalize">
//                   {item.title.length > 60
//                     ? item.title.slice(0, 58) + '...'
//                     : item.title.split('-')[0] || 'N/A'}
//                 </Text>
//               </View>

//               <View className="">
//                 <Text className="text-neutral-300 text-sm font-medium">
//                   {item?.author?.length > 20
//                     ? item.author.slice(0, 20) + '...'
//                     : item.author}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   image: {
//     width: 200,
//     height: 100,
//   },
//   author: {
//     width: width,
//     marginTop: -10,
//     marginHorizontal: width * 0.03,
//     color: 'darkgray',
//     maxWidth: width * 0.4,
//   },
// });

// export default Card;

// //cardBackground

// TopNewsCard.js
import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text,
  Share,
  Pressable,
} from 'react-native';
import themeContext from '../config/themeContext';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import Detail from './Detail';
import Login from './LoginModal';
import {LoginRequiredContext} from '../hooks/loginContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TopNewsCard({item}) {
  const theme = useContext(themeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [animateModal, setanimateModal] = useState(false);
  const context = useContext(LoginRequiredContext);
  const handleShare = () => {
    const {url, title} = item;
    var message = `${title} \n\n Read More ${url} \n\n Shared via The NewsXTimes`;
    return Share.share(
      {title, message, url: message},
      {dialogTitle: `Share ${title}`},
    );
  };
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
            <Text style={styles.title}>
              {item.title.length > 60
                ? item.title.slice(0, 58) + '...'
                : item.title.split('-')[0] || 'N/A'}
            </Text>
            <Text style={styles.author}>
              {item?.author?.length > 20
                ? item.author.slice(0, 20) + '...'
                : item.author}
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
              <Detail item={item} />
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
            <Ionicons name="chevron-down-outline" size={40} color={'#FFFFFF'} />
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    color: 'lightgray',
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
});

export default TopNewsCard;

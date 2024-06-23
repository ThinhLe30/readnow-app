import moment from 'moment';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Share,
  ScrollView,
  Image,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import themeContext from '../config/themeContext';
import React, {useContext, useState} from 'react';

import {LoginRequiredContext} from '../hooks/loginContext';
import newAPI from '../apis/News';

import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../hooks/authContext';

function NewsDetail({item}) {
  const [isChecked, setIsChecked] = useState(item.isChecked);
  const [isVoted, setIsVoted] = useState(item.isVoted);
  const {userInfo} = useContext(AuthContext);
  const {width} = useWindowDimensions();
  const context = useContext(LoginRequiredContext);
  const theme = useContext(themeContext);
  const source = {
    html: item.content,
  };
  async function handleSavePress() {
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
  }

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

  const handleShare = () => {
    const {url, title} = item; //get url and title form our prop
    var message = `${title} \n\n Read More ${url} \n\n Shared via ReadNow`; // custome message
    return Share.share(
      {title, message, url: message},
      {dialogTitle: `Share ${title}`},
    );
  };

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
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.topHeader}>
          <View
            style={styles.rightIcons}
            className="right-0 relative flex-row flex justify-end w-full">
            <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
              <Ionicons name="share-outline" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleVotePress}
              style={styles.iconButton}>
              <Ionicons
                name={
                  isVoted ? 'chevron-up-circle' : 'chevron-up-circle-outline'
                }
                size={30}
                color={isVoted ? theme.headerColor : 'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleSavePress}>
              <Ionicons
                name={isChecked ? 'bookmark' : 'bookmark-outline'}
                size={30}
                color={isChecked ? theme.headerColor : 'black'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.logo}>{item.author}</Text>
          <View style={styles.dot} />
          <Text style={styles.date}>
            {moment(item.publishedAt).format('MMM DD, YYYY')}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.category}>{item.category.name}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          style={styles.image}
          source={{uri: item.imageURL}} // Replace with your image URL
        />
        <Text style={[styles.summary, {color: theme.textColor}]}>
          {item.summary}
        </Text>
        <RenderHtml
          source={source}
          contentWidth={width}
          baseStyle={styles.baseStyle}
        />
      </ScrollView>
      <View className=" rounded-full items-center justify-center  absolute bottom-3 w-full gap-3">
        <View className="rounded-full items-center flex-row px-4 py-2 bg-white">
          <View className="bg-gray-100 p-2 rounded-full">
            <Ionicons name="eye-outline" size={30} color="black" />
          </View>
          <Text style={styles.iconText}>{formatNumber(item.viewCount)}</Text>
          <View className="bg-gray-100 p-2 rounded-full">
            <Ionicons
              name="chevron-up-circle-outline"
              size={30}
              color="black"
            />
          </View>
          <Text style={styles.iconText}>{formatNumber(item.voteCount)}</Text>
          <TouchableOpacity
            onPress={handleShare}
            className="bg-gray-100 p-2 rounded-full">
            <Ionicons name="share-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  logo: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
  },
  date: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
  },
  category: {
    fontSize: 16,
    color: 'black',
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    // textAlign: 'justify',
    color: 'black',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  imageCaption: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 10,
  },
  iconsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  iconWrapper: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'black',
    // marginHorizontal: 5,
    marginRight: 5,
  },
  baseStyle: {
    fontSize: 18,
    // lineHeight: 22,
    color: 'black',
    // textAlign: 'justify',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
  },
  rightIcons: {
    flexDirection: 'row',
  },
  summary: {
    fontSize: 18,
    // lineHeight: 22,
    fontStyle: 'italic',
    // textAlign: 'justify',
    color: 'black',
  },
});

export default NewsDetail;

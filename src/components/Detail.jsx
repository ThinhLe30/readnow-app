// import moment from 'moment';
// import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
// import {useWindowDimensions} from 'react-native';
// import RenderHtml from 'react-native-render-html';
// import themeContext from '../config/themeContext';
// import React, {useContext, useState} from 'react';
// import {ScrollView} from 'react-native-gesture-handler';
// import {ImageHeaderScrollView} from 'react-native-image-header-scroll-view';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// function Detail({item, onPress}) {
//   const [isChecked, setIsChecked] = useState(item.isChecked);
//   const [isVoted, setIsVoted] = useState(item.isVoted);
//   const {width} = useWindowDimensions();
//   var resTitle = item.title;
//   const theme = useContext(themeContext);
//   const source = {
//     html: item.content,
//   };
//   var resDesc = '';
//   if (item.content === null) {
//     resDesc = 'null';
//   } else {
//     resDesc = item.content;
//   }
//   function handleSavePress() {}
//   function handleVotePress() {}

//   return (
//     <View style={styles.mainCard}>
//       <ImageHeaderScrollView
//         maxHeight={200}
//         minHeight={100}
//         headerImage={{uri: item.imageURL}}
//         renderForeground={() => (
//           <View
//             style={{
//               height: 150,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}></View>
//         )}>
//         <ScrollView style={styles.cardContent}>
//           <View style={{flex: 1}}>
//             <Text
//               style={{
//                 color: theme.textColor,
//                 fontSize: 24,
//                 fontWeight: 'bold',
//                 textAlign: 'justify',
//               }}>
//               {resTitle}
//             </Text>
//             <Text
//               style={{
//                 color: theme.textColor,
//                 fontSize: 18,
//                 fontStyle: 'italic',
//                 textAlign: 'justify',
//               }}>
//               {item.summary}
//             </Text>
//             <RenderHtml
//               source={source}
//               contentWidth={width}
//               baseStyle={styles.baseStyle}
//             />
//           </View>
//           <View>
//             <Text
//               style={{
//                 color: theme.textColor,
//                 fontSize: 15,
//                 // paddingTop: 10,
//                 fontWeight: 'bold',
//               }}>
//               {item.author === null ? 'Legit Source' : item.author}
//             </Text>
//             <Text
//               style={{
//                 color: theme.textColor,
//                 fontSize: 15,
//                 marginTop: 10,
//                 paddingBottom: 30,
//               }}>
//               🕘 {moment(item.publishedAt).format('MMMM Do YYYY, h:mm a')}
//             </Text>
//           </View>
//         </ScrollView>
//         <View style={styles.iconContainer}>
//           {/* <TouchableOpacity onPress={handleVotePress} style={styles.iconButton}>
//             <Ionicons
//               name="thumbs-up-outline"
//               size={50}
//               color={theme.textColor}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleSavePress} style={styles.iconButton}>
//             <Ionicons
//               name="bookmark-outline"
//               size={50}
//               color={theme.textColor}
//             />
//           </TouchableOpacity> */}
//         </View>
//       </ImageHeaderScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainCard: {
//     flex: 1,
//   },
//   cardBGImage: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   cardContent: {
//     flex: 2,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//   },
//   baseStyle: {
//     fontSize: 18,
//     textAlign: 'justify',
//     fontWeight: 'lighter',
//   },
//   iconContainer: {
//     position: 'absolute',
//     right: 10,
//     top: '80%',
//     alignItems: 'center',
//   },
//   iconButton: {
//     marginBottom: 20,
//   },
// });

// export default Detail;

import moment from 'moment';
import {View, StyleSheet, Text, TouchableOpacity, Share} from 'react-native';
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

function Detail({item, onPress}) {
  const [isChecked, setIsChecked] = useState(item.isChecked);
  const [isVoted, setIsVoted] = useState(item.isVoted);
  const {userInfo} = useContext(AuthContext);
  const {width} = useWindowDimensions();
  const context = useContext(LoginRequiredContext);
  const theme = useContext(themeContext);
  const source = {
    html: item.content,
  };
  const summary = {
    html: item.summary,
  };
  const title = {
    html: item.title,
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

  return (
    <View style={styles.mainCard}>
      <ImageHeaderScrollView
        maxHeight={250}
        minHeight={150}
        headerImage={{uri: item.imageURL}}>
        <TriggeringView onHide={() => console.log('text hidden')}>
          <View style={styles.cardContent}>
            {/* <Text
              style={[styles.title, {color: theme.textColor}]}
              className="font-bold">
              {item.title}
            </Text> */}
            <RenderHtml
              source={title}
              contentWidth={width}
              baseStyle={styles.title}
            />
            <RenderHtml
              contentWidth={width}
              source={summary}
              baseStyle={styles.summary}
            />
            {/* <Text style={[styles.summary, {color: theme.textColor}]}>
              {item.summary}
            </Text> */}
            <RenderHtml
              source={source}
              contentWidth={width}
              baseStyle={styles.baseStyle}
            />
            <View style={styles.authorContainer}>
              <Text style={[styles.author, {color: theme.textColor}]}>
                {item.author === null ? 'Legit Source' : item.author}
              </Text>
              <Text style={[styles.date, {color: theme.textColor}]}>
                🕘 {moment(item.publishedAt).format('MMMM Do YYYY, h:mm a')}
              </Text>
            </View>
          </View>
        </TriggeringView>
      </ImageHeaderScrollView>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleVotePress} style={styles.iconButton}>
          <Ionicons
            name={isVoted ? 'chevron-up-circle' : 'chevron-up-circle-outline'}
            size={30}
            color={theme.headerColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSavePress} style={styles.iconButton}>
          <Ionicons
            name={isChecked ? 'bookmark' : 'bookmark-outline'}
            size={30}
            color={theme.headerColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
          <Ionicons name={'share-social'} size={30} color={theme.headerColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
  },
  headerForeground: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cardContent: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'justify',
    color: 'black',
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 18,
    lineHeight: 22,
    fontStyle: 'italic',
    textAlign: 'justify',
    marginBottom: 5,
    color: 'black',
  },
  baseStyle: {
    fontSize: 18,
    textAlign: '',
    lineHeight: 22,
    color: 'black',
    textAlign: 'justify',
  },
  authorContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  author: {
    fontSize: 16,
    fontStyle: 'bold',
  },
  date: {
    fontSize: 14,
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  iconButton: {
    padding: 10,
  },
});

export default Detail;

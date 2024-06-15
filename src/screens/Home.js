import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
  ScrollView,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';

import newAPI from '../apis/News';
import Card from '../components/Card';
import TrendNews from '../screens/TrendNews';

import themeContext from '../config/themeContext';

//API call

const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [recent, setRecentNews] = useState([]);
  useEffect(() => {
    getRecentNew();
  }, []);
  function getRecentNew() {
    newAPI
      .get('search/recents')
      .then(async function (response) {
        setRecentNews(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  //Theme
  const theme = useContext(themeContext);

  return (
    <View style={{backgroundColor: theme.backColor}}>
      <View>
        <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              marginTop: 10,
              marginLeft: 20,
              color: theme.textColor,
            }}>
            Trending News
          </Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#DA3349" />
          ) : (
            <TrendNews />
          )}

          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 0.5,
              width: '90%',
              alignSelf: 'center',
              marginTop: 5,
            }}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              marginTop: 10,
              marginLeft: 20,
              color: theme.textColor,
            }}>
            Recent News
          </Text>
          <FlatList
            data={recent}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({item}) => <Card item={item} />}
            style={{marginBottom: 65}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Home;

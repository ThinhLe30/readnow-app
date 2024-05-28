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
    <ScrollView style={{backgroundColor: theme.backColor}}>
      <StatusBar backgroundColor={theme.statusColor} />
      <View
        style={{
          backgroundColor: theme.headerColor,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 10,
          paddingLeft: 10,
          elevation: 8,
        }}>
        <Image
          source={require('../assets/img/header-logo-book.png')}
          style={{
            width: 50,
            height: 50,
            alignSelf: 'flex-start',
            paddingLeft: 10,
            marginLeft: 10,
          }}
        />
        <Text style={styles.mainText}>ReadNow</Text>
      </View>
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
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({item}) => <Card item={item} />}
            style={{marginBottom: 65}}
          />
        </View>
      </View>
    </ScrollView>
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

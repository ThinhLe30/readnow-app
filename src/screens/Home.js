import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';

import newAPI from '../apis/News';
import Card from '../components/Card';
import TrendNews from '../screens/TrendNews';

import themeContext from '../config/themeContext';
import NotFound from './NotFound';

//API call

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isEnd, setEnd] = useState(false);
  const [recent, setRecentNews] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  useEffect(() => {
    getRecentNew();
  }, []);

  function loadMoreArticles() {
    if (loading) return;
    if (isEnd) {
      return;
    }
    if (!nextPage) {
      return;
    }
    setLoading(true);
    newAPI
      .get('search/recents?page=' + nextPage)
      .then(async function (response) {
        const _nextPage = response.data.data.metadata.nextPage;
        if (response.data.data.articles.length > 0) {
          setRecentNews(existingArticles => [
            ...existingArticles,
            ...response.data.data.articles,
          ]);
          if (!_nextPage) {
            setEnd(true);
            return;
          }
          setNextPage(_nextPage);
        } else {
          setArticles([]);
          setNextPage(1);
          setLoading(false);
          setEnd(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }
  function getRecentNew() {
    setLoading(true);
    newAPI
      .get('search/recents?page=1')
      .then(async function (response) {
        setNextPage(response.data.data.metadata.nextPage);
        // console.log(response.data.data.articles);
        setRecentNews(response.data.data.articles);
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
          <TrendNews />

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
          <View>
            <FlatList
              data={recent}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => <Card item={item} />}
              style={{marginBottom: 120}}
              onRefresh={() => getRecentNew()}
              refreshing={loading}
              ListEmptyComponent={NotFound}
              onEndReachedThreshold={1}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              onEndReached={() => {
                if (!this.onEndReachedCalledDuringMomentum) {
                  loadMoreArticles();
                  this.onEndReachedCalledDuringMomentum = true;
                }
              }}
            />
          </View>
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

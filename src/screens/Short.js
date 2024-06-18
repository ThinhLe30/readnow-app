import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import themeContext from '../config/themeContext';
import newAPI from '../apis/News';
import ShortCard from '../components/ShortCard';
import NotFound from './NotFound';
import Animated, {Easing, FadeIn, FadeOut} from 'react-native-reanimated';

const Short = ({navigation}) => {
  useEffect(() => {
    loadFirstPage();
  }, []);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [isEnd, setEnd] = useState(false);
  const theme = useContext(themeContext);

  const {height} = Dimensions.get('window');

  function onRefresh() {
    setEnd(false);
    loadFirstPage();
  }

  function loadMoreArticles() {
    if (isEnd) {
      return;
    }
    setLoading(true);
    newAPI
      .get('search?page=' + nextPage)
      .then(async function (response) {
        const _nextPage = response.data.data.metadata.nextPage;
        if (response.data.data.articles.length > 0) {
          setArticles(existingArticles => [
            ...existingArticles,
            ...response.data.data.articles,
          ]);
          if (!_nextPage) {
            setEnd(true);
            return;
          }
          setNextPage(_nextPage);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  function loadFirstPage() {
    setLoading(true);
    newAPI
      .get('search')
      .then(async function (response) {
        const nextPage = response.data.data.metadata.nextPage;
        setArticles(response.data.data.articles);
        setNextPage(nextPage);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.backColor}]}>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => <ShortCard item={item} />}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
        }}
        onEndReached={() => {
          if (!this.onEndReachedCalledDuringMomentum) {
            loadMoreArticles();
            this.onEndReachedCalledDuringMomentum = true;
          }
        }}
        pagingEnabled
        snapToInterval={height - 100}
        decelerationRate="fast"
        onRefresh={() => onRefresh()}
        refreshing={loading}
        ListFooterComponent={() =>
          loading && <ActivityIndicator size="large" />
        }
        ListEmptyComponent={NotFound}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Short;

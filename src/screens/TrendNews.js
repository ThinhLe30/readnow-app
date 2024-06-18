import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';

import TopNewsCard from '../components/TopNewsCard';
import newAPI from '../apis/News';
import NotFound from './NotFound';

const TrendNews = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [newstech, setNewsTech] = useState([]);

  const width = Dimensions.get('window');
  const cardWidth = width * 0.8 + 20;
  useEffect(() => {
    getNewsFromAPI();
  }, []);

  function getNewsFromAPI() {
    newAPI
      .get('search/trending')
      .then(async function (response) {
        setNewsTech(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  if (!newstech) {
    return null;
  }
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator visible={true} />
      ) : (
        <FlatList
          style={{
            marginTop: 10,
            marginLeft: 20,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={newstech}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <TopNewsCard item={item} />}
          ListEmptyComponent={NotFound}
          refreshing={isLoading}
          onRefresh={() => getNewsFromAPI()}
        />
      )}
    </View>
  );
};

export default TrendNews;

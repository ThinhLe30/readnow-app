import React, {useEffect, useState} from 'react';
import {FlatList, View, ActivityIndicator, Dimensions} from 'react-native';

import TopNewsCard from '../components/TopNewsCard';
import newAPI from '../apis/News';
import NotFound from './NotFound';

const TrendNews = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [newstech, setNewsTech] = useState([]);

  const width = Dimensions.get('window');

  useEffect(() => {
    getNewsFromAPI();
  }, []);

  /* const newsResponse = async() => {
        const response = await newAPI.get('everything?q=tesla&from=2021-07-19&sortBy=publishedAt&apiKey=920deb9f754348c0bec4871fef36d971')
        console.log(response.data)
    } */

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
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({item}) => <TopNewsCard item={item} />}
          ListEmptyComponent={NotFound}
        />
      )}
    </View>
  );
};

export default TrendNews;

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
import Carousal from 'react-native-snap-carousel';
var {width} = Dimensions.get('window');
const TrendNews = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [newstech, setNewsTech] = useState([]);

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
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator visible={true} />
      ) : (
        // <FlatList
        //   style={{
        //     marginTop: 10,
        //     marginLeft: 20,
        //   }}
        //   horizontal={true}
        //   showsHorizontalScrollIndicator={false}
        //   data={newstech}
        //   keyExtractor={(item, index) => item.id}
        //   renderItem={({item}) => <TopNewsCard item={item} />}
        //   ListEmptyComponent={NotFound}
        //   refreshing={isLoading}
        //   onRefresh={() => getNewsFromAPI()}
        // />
        <Carousal
          style={{
            marginTop: 10,
            marginLeft: 20,
          }}
          data={newstech}
          renderItem={({item}) => <TopNewsCard item={item} />}
          firstItem={1}
          inactiveSlideScale={0.86}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.8}
          slideStyle={{display: 'flex', alignItems: 'center'}}
          refreshing={isLoading}
          onRefresh={() => getNewsFromAPI()}
          ListEmptyComponent={NotFound}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    window,
  },
});
export default TrendNews;

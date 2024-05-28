import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import themeContext from '../config/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import newAPI from '../apis/News';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SearchBar from 'react-native-platform-searchbar';

const Search = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [isEnd, setEnd] = useState(false);
  const [activeID, setActiveID] = useState('');
  const scrollRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    getArticle(page, keyword, '');
    getCategories();
  }, []);

  function onRefresh() {
    setPage(1);
    setArticles([]);
    setKeyword('');
    setEnd(false);
    getArticle(1, '', '');
  }
  function getCategories() {
    newAPI
      .get('search/categories')
      .then(async function (response) {
        setCategories(response.data.data.categories);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function getArticle(nextPage, keyword, category) {
    console.log('getArticle', nextPage, keyword, isEnd);
    if (loading) return;
    if (isEnd) return;
    setLoading(true);
    category = activeID ? `&categories=${activeID}` : '';
    let url = `search?keyword=${keyword}&page=${nextPage}${category}`;
    console.log('url', url);
    newAPI
      .get(url)
      // .get('search?categories=123')
      .then(async function (response) {
        const totalPage = response.data.data.metadata.numberOfPage;
        const currentPage = response.data.data.metadata.currentPage;
        console.log('totalPage', totalPage);
        console.log('currentPage', currentPage);
        if (response.data.data.articles.length === 0) {
          // setArticles(response.data.data.articles);
          console.log('no data');
          setPage(1);
          setLoading(false);
          setEnd(true);
        } else {
          setArticles(existingArticles => [
            ...existingArticles,
            ...response.data.data.articles,
          ]);
          if (currentPage === totalPage) {
            setEnd(true);
            return;
          }
          if (currentPage < totalPage) {
            setPage(currentPage + 1);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  function handleSearch() {
    setArticles([]);
    setPage(1);
    setEnd(false);
    getArticle(1, keyword);
  }
  function chooseCategory(item, index) {
    let categories = ''
    setActiveID(prevActiveID => {
      if (prevActiveID === item.id) {
        return '';
      } else {
        categories = item.id;
        return item.id;
      }
    });
    setArticles([]);
    setPage(1);
    setEnd(false);
    getArticle(1, '', categories);
    // itemRefs.current[index]?.measure((x, y, width, height, pageX, pageY) => {
    //   scrollRef.current?.scrollTo({x: pageX, y: 0, animated: true});
    // });
  }

  const theme = useContext(themeContext);
  return (
    <View style={{backgroundColor: theme.backColor, flex: 1}}>
      <View style={styles.searchSectionWrapper}>
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch}
          // onChange={setKeyword}
          returnKeyType="search"
          placeholder="Search"
          theme="light"
          platform="android"
          style={styles.searchBar}></SearchBar>
        <TouchableOpacity onPress={() => {}} style={styles.filterBtn}>
          <Ionicons name="options" size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>
      {/* Category */}
      <View>
        <Text style={styles.title}>Categories</Text>
        <ScrollView
          ref={scrollRef}
          horizontal
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginRight: 20,
          }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 20,
            paddingVertical: 10,
            marginBottom: 10,
          }}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              ref={el => (itemRefs.current[index] = el)}
              onPress={() => chooseCategory(item, index)}
              style={
                activeID === item.id
                  ? styles.categoryBtnActive
                  : styles.categoryBtn
              }>
              <Text
                style={
                  activeID === item.id
                    ? styles.categoryBtnTxtActive
                    : styles.categoryBtnTxt
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={articles}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({item}) => <Card item={item} />}
        onEndReached={() => {
          getArticle(page, keyword);
        }}
        onRefresh={() => onRefresh()}
        refreshing={loading}
        ListFooterComponent={() =>
          loading && <ActivityIndicator size="large" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  midText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 20,
  },
  mainText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
  headingTxt: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.black,
    marginTop: 10,
  },
  searchSectionWrapper: {
    flexDirection: 'row',
    marginVertical: 20,
    marginLeft: 20,
  },
  searchBar: {
    flex: 1,
    borderRadius: 10,
  },
  filterBtn: {
    backgroundColor: '#1D5868',
    padding: 12,
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#333333',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // marginRight: 20,
  },
  categoryBtnActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D5868',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#333333',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // marginRight: 20,
  },
  categoryBtnTxt: {
    marginLeft: 5,
    color: Colors.black,
  },
  categoryBtnTxtActive: {
    marginLeft: 5,
    color: Colors.white,
  },
});

export default Search;

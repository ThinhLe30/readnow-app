import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import themeContext from '../config/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import newAPI from '../apis/News';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SearchBar from 'react-native-platform-searchbar';
import moment from 'moment';
import NotFound from './NotFound';

const Search = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [nextPage, setNextPage] = useState(1);
  const [isEnd, setEnd] = useState(false);
  const [activeID, setActiveID] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const scrollRef = useRef(null);
  const itemRefs = useRef([]);
  const flatListRef = React.useRef();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadFirstPage();
  }, []);
  useEffect(() => {
    getCategories();
  }, []);

  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  function onRefresh() {
    loadFirstPage();
    setKeyword('');
    setActiveID('');
    setFromDate('');
    setToDate('');
    setEnd(false);
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

  function searchArticles() {
    if (loading) return;
    if (isEnd) return;
    setLoading(true);
    let url = `search?keyword=${keyword}&page=1&categories=${activeID}&fromDate=${fromDate}&toDate=${toDate}`;
    newAPI
      .get(url)
      .then(async function (response) {
        const _nextPage = response.data.data.metadata.nextPage;
        if (response.data.data.articles.length > 0) {
          setArticles(response.data.data.articles);
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

  function searchCategories(categoryID) {
    setLoading(true);
    let url = `search?keyword=${keyword}&page=1&categories=${categoryID}&fromDate=${fromDate}&toDate=${toDate}`;
    newAPI
      .get(url)
      .then(async function (response) {
        const _nextPage = response.data.data.metadata.nextPage;
        if (response.data.data.articles.length > 0) {
          setArticles(response.data.data.articles);
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

  function searchByDate() {
    toTop();
    setLoading(true);
    let url = `search?keyword=${keyword}&page=1&categories=${activeID}&fromDate=${fromDate}&toDate=${toDate}`;
    newAPI
      .get(url)
      .then(async function (response) {
        const _nextPage = response.data.data.metadata.nextPage;
        if (response.data.data.articles.length > 0) {
          setArticles(response.data.data.articles);
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

  function handleSearch() {
    toTop();
    setEnd(false);
    searchArticles();
  }

  function loadMoreArticles() {
    if (loading) return;
    if (isEnd) return;
    setLoading(true);
    let url = `search?keyword=${keyword}&page=${nextPage}&categories=${activeID}&fromDate=${fromDate}&toDate=${toDate}`;
    newAPI
      .get(url)
      .then(async function (response) {
        // const totalPage = response.data.data.metadata.numberOfPage;
        // const currentPage = response.data.data.metadata.currentPage;
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
  function chooseCategory(item, index) {
    toTop();
    let categoryId = '';
    setActiveID(prevActiveID => {
      if (prevActiveID === item.id) {
        return '';
      } else {
        categoryId = item.id;
        return item.id;
      }
    });
    setEnd(false);
    searchCategories(categoryId);
  }

  function onDateChange(date, type) {
    if (type === 'END_DATE') {
      setToDate(moment(date).format('YYYY-MM-DD'));
    } else {
      setFromDate(moment(date).format('YYYY-MM-DD'));
      setToDate('');
    }
  }

  const theme = useContext(themeContext);

  return (
    <View style={{backgroundColor: theme.backColor, flex: 1}}>
      <View style={styles.searchSectionWrapper}>
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={() => handleSearch()}
          returnKeyType="search"
          placeholder="Search"
          theme="light"
          platform="android"
          style={styles.searchBar}></SearchBar>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.filterBtn}>
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
      <Modal
        animationType="slide"
        className="back"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={new Date('01-01-2020')}
          // maxDate={new Date()}
          maxDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
          todayBackgroundColor="#1D5868"
          onDateChange={onDateChange}
          selectedDayColor="#1D5868"
          selectedDayTextColor="#FFFFFF"
        />
        <View className="flex flex-row items-center justify-center w-full gap-6 ">
          <Pressable
            className="bg-[#E36414] p-2 rounded text-white"
            onPress={() => {
              setToDate('');
              setFromDate('');
              setModalVisible(!modalVisible);
            }}>
            <Text className="text-white" style={styles.textStyle}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            className="bg-[#1D5868] p-2 rounded text-white"
            onPress={() => {
              setModalVisible(!modalVisible);
              searchByDate();
            }}>
            <Text className="text-white">OK</Text>
          </Pressable>
        </View>
      </Modal>

      <FlatList
        ref={flatListRef}
        data={articles}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => <Card item={item} />}
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
        onRefresh={() => onRefresh()}
        refreshing={loading}
        ListFooterComponent={() =>
          loading && <ActivityIndicator size="large" />
        }
        ListEmptyComponent={NotFound}
      />
      <View className=" rounded-full items-center justify-center flex-col absolute bottom-10 right-5 gap-3">
        <TouchableOpacity
          className="bg-gray-100 p-2 rounded-full"
          onPress={toTop}>
          <Ionicons
            name={'caret-up-circle-outline'}
            color={theme.headerColor}
            size={30}
          />
        </TouchableOpacity>
      </View>
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
    fontSize: 16,
  },
  categoryBtnTxtActive: {
    marginLeft: 5,
    color: Colors.white,
    fontSize: 16,
  },
});

export default Search;

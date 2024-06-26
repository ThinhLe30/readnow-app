import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {FlatList} from 'react-native-gesture-handler';
import themeContext from '../config/themeContext';
import {AuthContext} from '../hooks/authContext';
import {AuthRequirement} from './AuthRequired';
import newAPI from '../apis/News';
import ChecklistCard from '../components/CheckListCard';
import NotFound from './NotFound';

const Checklist = ({navigation}) => {
  useEffect(() => {
    loadChecklist();
  }, []);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const theme = useContext(themeContext);
  const {userInfo} = useContext(AuthContext);
  const flatListRef = React.useRef();
  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };
  function onRefresh() {
    loadChecklist();
  }
  function loadChecklist() {
    setLoading(true);
    newAPI
      .get('checklist')
      .then(async function (response) {
        setArticles(response.data.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }
  if (!userInfo) {
    return <AuthRequirement />;
  }
  return (
    <>
      <View style={{backgroundColor: theme.backColor, marginBottom: 60}}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 10,
            marginLeft: 20,
            color: theme.textColor,
          }}>
          My Checklist
        </Text>
        <FlatList
          data={articles}
          ref={flatListRef}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <ChecklistCard item={item} />}
          showsVerticalScrollIndicator={false}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          onRefresh={() => onRefresh()}
          refreshing={loading}
          ListFooterComponent={() =>
            loading && <ActivityIndicator size="large" />
          }
          ListEmptyComponent={NotFound}
        />
      </View>
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
    </>
  );
};

export default Checklist;

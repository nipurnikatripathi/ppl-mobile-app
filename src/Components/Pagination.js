import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {LoginContext} from './LoginContext';

const Pagination = ({navigation}) => {
  const [student, setStudent] = useState([]);
  const [skip, setSkip] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isLogin, setIsLogin] = useContext(LoginContext);
  console.log('isLogin inside pagination.js', isLogin);

  useEffect(() => {
    console.log('inside useEffect of pagination');
    loadStudentList();
  }, [skip, loadStudentList]);
  const skipN = {skipNo: student.length};

  const clearData = useCallback(async () => {
    console.log('inside clear data function');
    try {
      setIsLogin(false);
      await AsyncStorage.clear();
      navigation.navigate('Login Screen');
    } catch (error) {
      console.log('error', error);
      Alert.alert(error);
    }
  }, [navigation, setIsLogin]);

  const loadStudentList = useCallback(async () => {
    setisLoading(true);
    console.log('inside loadStudentList first time ');
    const requestOptions = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(skipN),
    };
    console.log('requestOptions', requestOptions);
    const response = await fetch(
      'http://192.168.100.34:9000/getStudentList',
      requestOptions,
    );
    const json = await response.json();

    console.log('json', json);

    setStudent((student) => [...student, ...json]);

    console.log('concatenating array', student);
    setisLoading(false);
  }, [student, skipN]);

  console.log('outside concatenating array', student);

  const renderItemC = (item) => {
    return <Item title={item.name} />;
  };

  const Item = ({title}) => (
    <View>
      <Text style={styles.articleTextColor}>{title}</Text>
    </View>
  );

  const closeActivityIndicator = () => {
    console.log('inside closeActivityIndicator');
    return setAnimating(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headOfContainer}>
        <Text style={styles.textColor}>PPL</Text>
        <Image source={require('../../assets/images/pic_small.png')} />
      </View>
      <View style={styles.article}>
        <FlatList
          data={student}
          renderItem={(item) => renderItemC(item.item)}
          keyExtractor={(item) => item._id.toString()}
          onEndReached={loadStudentList}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View>
        {/* Loader */}
        {isLoading ? (
          <ActivityIndicator
            animating={closeActivityIndicator}
            color="red"
            size="large"
            style={styles.activityIndicator}
          />
        ) : null}
      </View>
      <Text style={styles.link} onPress={() => clearData()}>
        Logout
      </Text>
    </View>
  );
};

export default Pagination;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headOfContainer: {
    flex: 0.04,
    backgroundColor: '#ffa21d',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textColor: {
    color: '#fff',
  },
  article: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  articleTextColor: {
    fontFamily: 'Helvetica',
    fontSize: 50,
    color: '#f47b13',
    paddingTop: 10,
    fontWeight: 'bold',
  },
  like: {
    fontFamily: 'Helvetica',
    color: '#f47b13',
    paddingTop: 10,
    fontWeight: 'bold',
  },
  comment: {
    fontFamily: 'Helvetica',
    color: '#f47b13',
    paddingTop: 10,
    fontWeight: 'bold',
  },
  articleDescription: {
    textAlign: 'justify',
    fontSize: 13,
    color: '#807979',
    padding: 10,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  articleDescriptionImage: {
    maxWidth: 400,
    maxHeight: 400,
  },
  scrollView: {},
  link: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: '#f47b13',
    paddingLeft: 15,
    fontWeight: 'bold',
  },
  textInputStyle: {
    width: '100%',
    padding: 20,
    fontSize: 40,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});

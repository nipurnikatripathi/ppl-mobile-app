import React, {useState, useCallback, useContext} from 'react';
import Axios from 'axios';
import useCustomValue from './useLoginForm';
import AsyncStorage from '@react-native-community/async-storage';
import {LoginContext} from './LoginContext';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Login = ({navigation}) => {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  console.log('islogin inside login.js', isLogin);

  const [email, setEmail, validateEmail, errorEmail] = useCustomValue({
    intialValue: '',
    error: 'email is required',
    regEx: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
    validationError: 'Email is not valid',
  });

  const [
    password,
    setPassword,
    validatePassword,
    errorPassword,
  ] = useCustomValue({
    intialValue: '',
    error: 'password is required',
    regEx: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
    validationError: 'password is not valid',
  });
  const [
    formData,
    setFormData,
    validateFormData,
    errorFormData,
  ] = useCustomValue({
    // intialValue: '',
    error: 'form data is required',
  });

  console.log('@@2', email, setEmail, validateEmail, errorEmail);
  const [userRecord, setUserRecord] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('inside handle submit');
    const user = {
      email: email,
      password: password,
    };
    console.log('user in before api', user);
    const output =
      validateFormData(user.email) && validateFormData(user.password);
    console.log('output', output);
    if (!output) {
      Axios.post('http://192.168.100.34:9000/login', user)
        .then((response) => {
          if (response?.data?.msg === 'login successfully') {
            console.log('user logged in successfully!');
            setUserRecord('user logged in successfully!');
            AsyncStorage.setItem('username', email);
            setIsLogin(true);
            //  navigation.navigate('MainRoute', {screen: 'Login Screen'});
            navigation.navigate('Pagination Screen');
          } else if (response?.data?.msg === 'invalid password!') {
            console.log('invalid password!');
            setUserRecord('invalid password');
          } else {
            console.log('invalid email!');
            setUserRecord('invalid email!');
          }
        })
        .catch((error) => {
          console.log('Api call error', error);
        });
    }
  }

  const displayData = useCallback(async () => {
    console.log('inside display data function');
    try {
      let user = await AsyncStorage.getItem('username');
      console.log('username display data', user);
      Alert.alert('username display data', user);
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const clearData = useCallback(async () => {
    console.log('inside clear data function');
    try {
      await AsyncStorage.clear();
      Alert.alert('storage cleared!');
    } catch (error) {
      console.log('error', error);
      Alert.alert(error);
    }
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headOfContainer}>
          <Text style={styles.textColor}>PPL</Text>
          <Image source={require('../../assets/images/pic_small.png')} />
        </View>
        {/* LeftSection article */}
        <View style={styles.article}>
          <Text style={styles.articleTextColor}>Welcome from PPL!</Text>
          <Text style={styles.articleDescription}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text.
          </Text>
          <Image
            style={styles.articleDescriptionImage}
            source={require('../../assets/images/img_9_2_300x.png')}
          />
        </View>

        {/* Log in form */}
        <View style={styles.registerForm}>
          <Text style={styles.articleTextColor}>Log In</Text>
          <Text style={styles.formTextColor}>Email-ID</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your email"
            onChangeText={(text) => validateEmail(text)}
          />
          <Text style={styles.userRecord}>{errorEmail}</Text>
          <Text style={styles.formTextColor}>Password</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your password"
            onChangeText={(text) => validatePassword(text)}
          />
          <Text style={styles.userRecord}>{errorPassword}</Text>
          <Button
            color="#ffa21d"
            width="50"
            title="Submit"
            onPress={handleSubmit}
          />
          <Text style={styles.userRecord}>{errorFormData}</Text>

          <Text style={styles.userRecord}>{userRecord}</Text>

          <TouchableOpacity onPress={displayData}>
            <Text>Click to display data</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearData}>
            <Text>Click to clear data</Text>
          </TouchableOpacity>
          <Text
            style={styles.link}
            onPress={() => {
              setIsLogin(false);
              // navigation.navigate('AuthRoute', {screen: 'Register Screen'});

              navigation.navigate('Register Screen');
            }}>
            Create Account
          </Text>
        </View>
        {/* footer */}
        <View style={styles.headOfContainer}>
          <Text style={styles.textColor}>
            Copyright © Pet-Socail 2014 All Rights Reserved
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default Login;

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
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  articleTextColor: {
    fontFamily: 'Helvetica',
    fontSize: 36,
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
  textInputStyle: {
    height: 50,
    width: '100%',
  },
  formTextColor: {
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    color: '#5d5959',
    fontWeight: 'bold',
    lineHeight: 30,
  },
  link: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: '#f47b13',
    paddingTop: 10,
    fontWeight: 'bold',
  },
  registerForm: {
    padding: 20,
  },
  submitButton: {
    color: '#5d5959',
  },
  userRecord: {
    color: 'blue',
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
  },
});

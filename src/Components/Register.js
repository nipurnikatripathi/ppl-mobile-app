import Axios from 'axios';
import React, {useState, useCallback, useContext} from 'react';
import useCustomValue from './useLoginForm';
import {LoginContext} from './LoginContext';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';

const Register = ({navigation}) => {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  console.log('islogin inside register.js', isLogin);

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
    validationError:
      'password should be more than 8 characters have atleast one upercase, lowercase digits and special characters',
  });
  const [
    username,
    setUserName,
    validateUserName,
    errorUserName,
  ] = useCustomValue({
    intialValue: '',
    error: 'username is required',
  });
  const [
    firstName,
    setFirstName,
    validateFirstName,
    errorFirstName,
  ] = useCustomValue({
    intialValue: '',
    error: 'firstname is required',
  });
  const [
    lastName,
    setLastName,
    validateLastName,
    errorLastName,
  ] = useCustomValue({
    intialValue: '',
    error: 'lastname is required',
  });

  const [
    formData,
    setFormData,
    validateFormData,
    errorFormData,
  ] = useCustomValue({
    error: 'form data is required',
  });

  const [userRecord, setUserRecord] = useState('');

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      console.log('inside handle submit');

      const user = {
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      console.log('user in before api', user.username);

      const output =
        validateFormData(user.username) &&
        validateFormData(user.firstname) &&
        validateFormData(user.lastname) &&
        validateFormData(user.email) &&
        validateFormData(user.password);
      console.log('output', output);
      if (!output) {
        Axios.post('http://192.168.100.34:9000/register', user)
          .then((response) => {
            console.log(response.data);
            if (response?.data === false) {
              console.log('user already exists');
              setUserRecord('user already exists');
            } else {
              console.log('user registered successfully!');
              setUserRecord('user registered successfully!');
            }
          })
          .catch((error) => {
            console.log('Api call error', error);
          });
      }
    },
    [username, firstName, lastName, email, password, validateFormData],
  );
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

        {/* Register form */}
        <View style={styles.registerForm}>
          <Text style={styles.articleTextColor}>Create An Account</Text>
          <Text style={styles.formTextColor}>Username</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your username"
            onChangeText={(text) => validateUserName(text)}
          />
          <Text style={styles.userRecord}>{errorUserName}</Text>
          <Text style={styles.formTextColor}>Email</Text>
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
          <Text style={styles.formTextColor}>First Name</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your first name"
            onChangeText={(text) => validateFirstName(text)}
          />
          <Text style={styles.userRecord}>{errorFirstName}</Text>
          <Text style={styles.formTextColor}>Last Name</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your last name"
            onChangeText={(text) => validateLastName(text)}
          />
          <Text style={styles.userRecord}>{errorLastName}</Text>
          <Button
            color="#ffa21d"
            width="50"
            title="Submit"
            onPress={handleSubmit}
          />
          {/* new user or existing user */}
          <Text style={styles.userRecord}>{errorFormData}</Text>
          <Text style={styles.userRecord}>{userRecord}</Text>
          <Text
            style={styles.link}
            onPress={() => {
              setIsLogin(false);
            //  navigation.navigate('AuthRoute', {screen: 'Login Screen'});
              navigation.push('Login Screen');
            }}>
            Login to account
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
export default Register;

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

import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from 'react-native';

const Register = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

   function handleSubmit(event) {
    event.preventDefault();
    console.log('inside handle submit');
    const user = {
      username,
      password,
      email,
      firstName,
      lastName,
    };
    console.log('user in before api', user);

    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(user),
    };
    console.log('requestOptions', requestOptions);
    //  fetch(
    //   `http://localhost:8082/register`,
    //   {
    //       method: "GET"
    //   }
    // ).then((res) => console.log('hhhhhh'));
    // console.log('response in timeline singlepostapi', response);
    // const json = await response.json();

    // console.log('response in singlepost in timeline.js', json);
    // return json;

    // Axios({
    //   method: 'post',
    //   url: 'http://localhost:8082/register',
    //   data: user,
    // })
      Axios
        .get('http://localhost:8082/register', user)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log('Api call error', error);
      });
  }
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
            onChangeText={(username) => setUsername(username)}
            defaultValue={username}
          />
          <Text style={styles.formTextColor}>Email</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your email"
            onChangeText={(email) => setEmail(email)}
            defaultValue={email}
          />
          <Text style={styles.formTextColor}>Password</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your password"
            onChangeText={(password) => setPassword(password)}
            defaultValue={password}
          />
          <Text style={styles.formTextColor}>First Name</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your first name"
            onChangeText={(firstName) => setFirstName(firstName)}
            defaultValue={firstName}
          />
          <Text style={styles.formTextColor}>Last Name</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your last name"
            onChangeText={(lastName) => setLastName(lastName)}
            defaultValue={lastName}
          />
          <Button
            color="#ffa21d"
            width="50"
            title="Submit"
            onPress={handleSubmit}
          />
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
  registerForm: {
    padding: 20,
  },
  submitButton: {
    color: '#5d5959',
  },
});

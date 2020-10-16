import React, {useState, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View, Text, StyleSheet, TextInput, TouchableWithoutFeedback} from 'react-native';

const Register = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  const [inputValue, onChangeValue] = React.useState();
  return (
    <View style={styles.container}>
      <Text>WELCOME TO MY WORLD !</Text>
      <Text>Register yourself</Text>
      <TextInput
        style={styles.textInput}
        placeholder={"       Enter your username"}
        onChangeValue={(text) => onChangeValue(text)}
        value={inputValue}
      />
      <TextInput
        style={styles.textInput}
        placeholder={"     Enter your email"}
        onChangeValue={(text) => onChangeValue(text)}
        value={inputValue}
      />
      <TextInput
        style={styles.textInput}
        placeholder={"    Enter your Password"}
        onChangeValue={(text) => onChangeValue(text)}
        value={inputValue}
      />



    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9999',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  textInput: {
    height: 60,
    width: 200,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 50,
  },
});

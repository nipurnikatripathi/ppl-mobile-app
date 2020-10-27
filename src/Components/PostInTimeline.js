import Axios from 'axios';
import React, {useState, useCallback, useContext} from 'react';
import {LoginContext} from './LoginContext';

import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

const PostInTimeline = ({navigation}) => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headOfContainer}>
          <Text style={styles.textColor}>PPL</Text>
          <Image source={require('../../assets/images/pic_small.png')} />
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
export default PostInTimeline;

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

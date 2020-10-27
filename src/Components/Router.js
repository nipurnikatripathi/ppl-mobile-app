import React, {useContext, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoute from './AuthRoute';
import TimelineRoute from './TimelineRoute';
import {LoginContext} from './LoginContext';
import Pagination from './Pagination';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './Register';
import Login from './Login';

const Stack = createStackNavigator();

const Router = () => {
  const [isLogin, setIsLogin] = useContext(LoginContext);

  useEffect(() => {
    console.log('inside use effect of router.js');

    displayData()
      .then((value) => {
        console.log(
          'value in use effect from display data in router .js!',
          value,
        );
        if (value) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      })
      .catch((error) => {
        console.log('error in use effect', error);
      });

    SplashScreen.hide();
  }, []);

  const displayData = async () => {
    try {
      const user = await AsyncStorage.getItem('username');
      return user;
    } catch (error) {
      console.log(error);
    }
    return;
  };
  return (
    // <NavigationContainer>
    //   {!isLogin ? <AuthRoute /> : <TimelineRoute />}
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator>
        {!isLogin ? (
          <Stack.Screen
            name="AuthRoute"
            component={AuthRoute}
            options={{title: '', headerTransparent: true}}
          />
        ) : (
          <Stack.Screen
            name="Pagination Screen"
            component={Pagination}
            options={{title: '', headerTransparent: true}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

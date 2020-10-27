import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './Register';
import Login from './Login';

const Stack = createStackNavigator();

const AuthRoute = () => {
  console.log('inside auth route ');
  return (
    <Stack.Navigator initialRouteName="Register Screen">
      <Stack.Screen
        name="Register Screen"
        component={Register}
        options={{title: 'Create an account'}}
      />
      <Stack.Screen
        name="Login Screen"
        component={Login}
        options={{title: 'Login to your account'}}
      />
    </Stack.Navigator>
  );
};
export default AuthRoute;

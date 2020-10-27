import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Pagination from './Pagination';

const Stack = createStackNavigator();

const TimelineRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pagination Screen"
        component={Pagination}
        options={{title: 'Timeline'}}
      />
    </Stack.Navigator>
  );
};
export default TimelineRoute;

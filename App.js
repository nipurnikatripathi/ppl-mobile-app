import React from 'react';
import {LoginProvider} from './src/Components/LoginContext';
import Router from './src/Components/Router';
import PostInTimeline from './src/Components/PostInTimeline';

const App = ({navigation}) => {
  return (
    // <LoginProvider>
    //   <Router />
    // </LoginProvider>
    <PostInTimeline />
  );
};
export default App;

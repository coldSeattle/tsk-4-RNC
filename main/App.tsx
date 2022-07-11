import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';

import {Provider} from 'react-redux';
import ChatList from './components/ChatList/ChatList';
import Input from './components/Input/Input';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar />
        <ChatList />
      </SafeAreaView>
    </Provider>
  );
};

export default App;

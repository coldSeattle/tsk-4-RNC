import React from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import ChatList from './components/ChatList/ChatList';
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

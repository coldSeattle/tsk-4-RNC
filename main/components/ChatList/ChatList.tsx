import React, {useState} from 'react';
import {useEffect} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {createTable, getDBConnection, getMessages} from '../../db-service';
import {useGetOnboardingStatus} from '../../hooks/useGetOnboardingStatus';
import {useAppDispatch, useAppSelector} from '../../redux/store';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const {isFirstLaunch} = useGetOnboardingStatus();
  const [data, setData] = useState<any>([]);
  const messagesFromStore = useAppSelector(state => state.messages);

  useEffect(() => {
    const fetchDB = async () => {
      const db = await getDBConnection();
      await createTable(db);

      const messages = await getMessages(db);
      console.log('messages', messages);
      if (messages.length) {
        setData(messages);
      } else {
        setData(messagesFromStore);
      }
    };
    if (isFirstLaunch === true) {
      dispatch({type: 'MESSAGES_ASYNC', payload: null});
    } else {
      fetchDB();
    }
  }, []);

  const Item = ({title}) => (
    <View style={ChatListStyles.itemContainer}>
      <Text style={ChatListStyles.itemText}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.value} />;

  return (
    <FlatList
      style={ChatListStyles.container}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default ChatList;

const ChatListStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    borderColor: 'red',
    minHeight: Dimensions.get('screen').height - 180,
    backgroundColor: 'grey',
    paddingBottom: 100,
  },
  itemContainer: {
    borderRadius: 20,
    maxWidth: '50%',
    height: 'auto',
    backgroundColor: 'darkgrey',
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 5,
  },
  itemText: {
    color: '#fff',
    width: 'auto',
  },
});

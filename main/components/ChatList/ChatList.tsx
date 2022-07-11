import React, {useState} from 'react';
import {useEffect} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {createTable, getDBConnection, getMessages} from '../../db-service';
import {useGetOnboardingStatus} from '../../hooks/useGetOnboardingStatus';
import {PermissionStatus, usePermissions} from '../../hooks/usePermissions';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Input from '../Input/Input';

type PermissionsStatusType = {
  MICROPHONE: PermissionStatus;
  MEDIA_LIBRARY: PermissionStatus;
};

const ChatList = () => {
  const dispatch = useAppDispatch();
  const {isFirstLaunch} = useGetOnboardingStatus();
  const [data, setData] = useState<any>([]);
  const messagesFromStore = useAppSelector(state => state.messages);
  const {requesltMultAudioPlusMedia, checkAudioRecord, checkMediaLibrary} =
    usePermissions();
  const [permissionsStatus, setPermissionsStatue] =
    useState<PermissionsStatusType>({
      MEDIA_LIBRARY: 'unavailable',
      MICROPHONE: 'unavailable',
    });

  const microphoneState = {
    color:
      permissionsStatus.MEDIA_LIBRARY === 'granted' &&
      permissionsStatus.MICROPHONE === 'granted'
        ? 'green'
        : 'grey',
  };

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
    checkAudioRecord();
    checkMediaLibrary();
    requesltMultAudioPlusMedia(setPermissionsStatue);
  }, []);

  const Item = ({title}) => (
    <View style={ChatListStyles.itemContainer}>
      <Text style={ChatListStyles.itemText}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.value} />;

  return (
    <>
      <FlatList
        style={ChatListStyles.container}
        data={data}
        renderItem={renderItem}
      />
      <Input microphoneState={microphoneState} />
    </>
  );
};

export default ChatList;

const ChatListStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    borderColor: 'red',
    minHeight: Dimensions.get('screen').height - 180,
    backgroundColor: '#221e2a',
    paddingBottom: 100,
  },
  itemContainer: {
    borderRadius: 10,
    maxWidth: '50%',
    height: 'auto',
    backgroundColor: '#9189a0',
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 5,
    marginLeft: 14,
  },
  itemText: {
    color: '#fff',
    width: 'auto',
  },
});

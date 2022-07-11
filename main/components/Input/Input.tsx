import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TextStyle, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IInput {
  microphoneState: TextStyle;
}

const Input = (props: IInput) => {
  const [val, setVal] = useState('');
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={setVal} value={val} />
      <Text style={styles.send}>
        <Icon name="send" size={40} color="#fff" />;
      </Text>
      <Text style={styles.microphone}>
        <Icon name="microphone" size={40} color={props.microphoneState.color} />
        ;
      </Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    // width: '85%',
    flex: 1,
    backgroundColor: '#221e2a',
    padding: 5,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  microphone: {
    marginLeft: 10,
  },
  send: {
    marginLeft: 10,
  },
});

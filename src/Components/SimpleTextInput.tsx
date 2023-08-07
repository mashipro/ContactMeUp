import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC} from 'react';

type ISimpleTextInputProp = {
  onTextChange: (str: string) => void;
  value: string;
  label: string;
};
const SimpleTextInput: FC<ISimpleTextInputProp> = ({
  onTextChange,
  value,
  label,
}) => {
  return (
    <View style={styles.Base}>
      <Text>{label}</Text>
      <View style={{padding: 8, borderWidth: 1}}>
        <TextInput
          style={styles.Normalize}
          value={value}
          placeholder={label}
          onChangeText={onTextChange}
        />
      </View>
    </View>
  );
};

export default SimpleTextInput;

const styles = StyleSheet.create({
  Base: {marginBottom: 4},
  Normalize: {
    paddingVertical: 0,
    margin: 0,
    // backgroundColor: 'skyblue'
  },
});

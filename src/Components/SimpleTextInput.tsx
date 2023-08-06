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
    <View>
      <Text>{label}</Text>
      <View style={{padding: 12, borderWidth: 1}}>
        <TextInput
          value={value}
          placeholder={label}
          onChangeText={onTextChange}
        />
      </View>
    </View>
  );
};

export default SimpleTextInput;

const styles = StyleSheet.create({});

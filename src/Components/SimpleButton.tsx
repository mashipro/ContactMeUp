import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';

type ISimpleButtonProp = {
  onPress: () => void;
  label: string;
  style?: StyleProp<TextStyle>;
  testID?: string;
};
const SimpleButton: FC<ISimpleButtonProp> = ({
  onPress,
  label,
  style: ButtonStyle,
  testID,
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      style={styles.Touchable}>
      <Text testID={`${testID}-text`} style={[styles.BaseButton, ButtonStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  BaseButton: {
    borderWidth: 2,
    borderColor: 'white',
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    padding: 12,
    // flex: 1,
  },
  Touchable: {
    // flex: 1,
    // flexDirection: 'row',
  },
});

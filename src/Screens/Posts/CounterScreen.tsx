import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SimpleButton from '../../Components/SimpleButton';
import {IMainNavigatorPropTypes} from '../../Routes/MainNavigationTypes';

const CounterScreen = (props: IMainNavigatorPropTypes<'CounterScreen'>) => {
  const {navigation} = props;

  const [counter, setCounter] = useState(0);
  const [points, setPoints] = useState(1);

  const onBackHandler = () => {
    navigation.goBack();
  };

  const onIncreaseHandler = () => {
    setCounter(prev => prev + points);
  };
  const onDecreaseHandler = () => {
    setCounter(prev => prev - points);
  };
  const addIncrementHandler = () => {
    setPoints(prev => prev + 1);
  };
  const lessIncrementHandler = () => {
    setPoints(prev => prev - 1);
  };
  const resetHadler = () => {
    setCounter(0);
    setPoints(1);
  };
  return (
    <SafeAreaView style={styles.Base}>
      <View style={{flexDirection: 'row'}}>
        <SimpleButton
          testID="back-button"
          label="back"
          onPress={onBackHandler}
          style={styles.Button}
        />
      </View>
      <Text testID="header-title" style={styles.TitleText}>
        Simple Number Counter
      </Text>
      <View style={styles.BodyContainer}>
        <Text testID="counter-text" style={styles.CounterText}>
          {counter}
        </Text>
        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <SimpleButton
              testID="less-point-button"
              label={`decrement (${
                points < 0 ? `+${points * -1}` : `-${points}`
              })`}
              onPress={onDecreaseHandler}
              style={styles.Button}
            />
          </View>
          <View style={{flexDirection: 'column', flex: 1}}>
            <SimpleButton
              testID="add-point-button"
              label={`increment (${points < 0 ? '' : '+'}${points})`}
              onPress={onIncreaseHandler}
              style={styles.Button}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <SimpleButton
              testID="less-increment-button"
              label={'reduce increment'}
              onPress={lessIncrementHandler}
              style={styles.Button}
            />
          </View>
          <View style={{flexDirection: 'column', flex: 1}}>
            <SimpleButton
              testID="add-increment-button"
              label={'increase increment'}
              onPress={addIncrementHandler}
              style={styles.Button}
            />
          </View>
        </View>
        <SimpleButton
          testID="reset-button"
          label={'reset'}
          onPress={resetHadler}
          style={styles.Button}
        />
      </View>
    </SafeAreaView>
  );
};

export default CounterScreen;

const styles = StyleSheet.create({
  Base: {flex: 1, margin: 8},
  Button: {
    borderColor: 'black',
    color: 'black',
  },
  TitleText: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 20,
  },
  BodyContainer: {marginVertical: 12, flex: 1},
  CounterText: {
    fontSize: 100,
    fontWeight: '700',
    marginBottom: 20,
  },
});

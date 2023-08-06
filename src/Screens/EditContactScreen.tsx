import {StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import SimpleButton from '../Components/SimpleButton';
import {IMainNavigatorPropTypes} from '../Routes/MainNavigationTypes';
import SimpleTextInput from '../Components/SimpleTextInput';
import SimpleImagePicker from '../Components/SimpleImagePicker';

const EditContactScreen: FC<IMainNavigatorPropTypes<'EditContactScreen'>> = ({
  navigation,
  route,
}) => {
  const isProp = route.params === null;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [photo, setPhoto] = useState('');

  const onBackPressHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.Base}>
      <View>
        {/* <Text>EditContactScreen</Text> */}
        <SimpleTextInput
          label="First Name"
          value={firstName}
          onTextChange={t => setFirstName(t)}
        />
        <SimpleTextInput
          label="Last Name"
          value={lastName}
          onTextChange={t => setLastName(t)}
        />
        <SimpleTextInput
          label="Age"
          value={age.toString()}
          onTextChange={t => setAge(parseInt(t))}
        />
        <SimpleTextInput
          label="Photo URL"
          value={photo}
          onTextChange={t => setPhoto(t)}
        />
        <SimpleImagePicker onImageSelected={image => setPhoto(image)} />
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <SimpleButton
            label="cancel"
            onPress={onBackPressHandler}
            style={{borderWidth: 0, color: 'black'}}
          />
        </View>
        <View style={{flex: 1}}>
          <SimpleButton
            label="submit"
            onPress={onBackPressHandler}
            style={{borderColor: 'black', color: 'black'}}
          />
        </View>
      </View>
    </View>
  );
};

export default EditContactScreen;

const styles = StyleSheet.create({
  Base: {
    flex: 1,
    // backgroundColor: 'skyblue',
    padding: 8,
    justifyContent: 'space-between',
  },
});

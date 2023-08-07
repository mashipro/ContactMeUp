import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import ImageUrlPool from '../Utilities/ImageUrlPool';

const imageSize = Dimensions.get('window').width / 3;

type ISimpleImagePickerProp = {
  onImageSelected: (image: string) => void;
  testID?: string;
};
const SimpleImagePicker: FC<ISimpleImagePickerProp> = ({
  onImageSelected,
  testID,
}) => {
  const [selectedImage, setSelectedImage] = useState('');
  const onImageSelect = (item: string) => {
    setSelectedImage(item);
    onImageSelected(item);
  };

  return (
    <View style={{flex: 1}} testID={testID}>
      <FlatList
        testID={`${testID}-container`}
        data={ImageUrlPool}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({item, index}) => (
          <TouchableOpacity
            testID={`${testID}-image-${index}`}
            onPress={() => onImageSelect(item)}>
            <Image
              style={[
                styles.ImageDefault,
                {
                  borderWidth: item === selectedImage ? 2 : 0,
                },
              ]}
              source={{uri: item}}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SimpleImagePicker;

const styles = StyleSheet.create({
  ImageDefault: {
    width: imageSize,
    height: imageSize,
    borderColor: 'skyblue',
  },
});

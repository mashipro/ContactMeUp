import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IPost} from '../Types/GlobalTypes';

type IPostCardProp = {
  onPress?: (item: IPost) => void;
  postsItem: IPost;
};

const dimensWidth = Dimensions.get('window').width;

const PostsCard = (prop: IPostCardProp) => {
  const {postsItem, onPress} = prop;
  return (
    <View style={styles.CardBaseContainer}>
      <TouchableOpacity
        style={StyleSheet.absoluteFillObject}
        onPress={() => onPress?.(postsItem)}>
        <Image
          style={StyleSheet.absoluteFillObject}
          source={{uri: postsItem.image}}
        />
        <View style={[StyleSheet.absoluteFillObject, styles.Overlay]} />
        <Text style={styles.PostsTitle}>{postsItem.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(PostsCard);

const styles = StyleSheet.create({
  CardBaseContainer: {
    height: dimensWidth * (2 / 3),
  },
  Overlay: {
    backgroundColor: 'black',
    opacity: 0.3,
  },
  PostsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 'auto',
    color: 'white',
    padding: 12,
  },
});

import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {IMainNavigatorPropTypes} from '../../Routes/MainNavigationTypes';
import {IPost} from '../../Types/GlobalTypes';

import {useDispatch, useSelector} from 'react-redux';
import {fetchPostsList} from '../../Redux/Actions';
import {RootStateType} from '../../Redux/Store';

import SimpleButton from '../../Components/SimpleButton';
import PostsCard from '../../Components/PostsCard';
import SimpleTextInput from '../../Components/SimpleTextInput';

const PostsScreen = ({navigation}: IMainNavigatorPropTypes<'PostsScreen'>) => {
  const searchDelay = 1000;

  const dispatch = useDispatch<any>();

  const posts = useSelector((state: RootStateType) => state.posts);

  const [postsList, setPostsList] = useState<IPost[]>([]);
  const [searchActive, setSearchActive] = useState(false);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (posts.postList.length > 0) return;
    dispatch(fetchPostsList()).then((res: any) => {
      console.log('res?', res);
    });
  }, []);

  useEffect(() => {
    if (search.length < 1) {
      setPostsList(posts.postList);
      return;
    }
    const timer = setTimeout(() => {
      console.log('searching for', search);
      searchForPosts(search);
    }, searchDelay);
    return () => clearTimeout(timer);
  }, [search, posts]);

  const searchForPosts = (title: string) => {
    const allPost = posts.postList;
    if (allPost.length < 1) return;
    const filteredPost = allPost.filter(post =>
      post.title.includes(title.toLowerCase()),
    );
    setPostsList(filteredPost);
  };

  const onBackHandler = () => {
    navigation.goBack();
  };

  const onSearchHandler = () => {
    if (searchActive) {
      setSearch('');
    }
    setSearchActive(!searchActive);
  };

  const onSearchTextChange = (text: string) => {
    setSearch(text);
  };

  const onPostPressHandler = (item: IPost) => {
    navigation.navigate('PostDetailScreen', item);
  };

  const flatlistRender = useCallback(
    ({item}: any) => (
      <PostsCard postsItem={item} onPress={onPostPressHandler} />
    ),
    [],
  );

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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text testID="header-title" style={styles.TitleText}>
          Posts
        </Text>
        <SimpleButton
          testID="search-button"
          label={searchActive ? 'cancel' : 'search'}
          onPress={onSearchHandler}
          style={[styles.Button, {borderWidth: 0}]}
        />
      </View>
      {searchActive && (
        <SimpleTextInput
          label="Search"
          value={search ? search : ''}
          onTextChange={onSearchTextChange}
        />
      )}
      {postsList.length >= 1 ? (
        <FlatList
          data={postsList}
          keyExtractor={item => item.id!}
          renderItem={flatlistRender}
          style={styles.Posts}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Post Empty or Not Found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  Base: {flex: 1, margin: 8},
  Button: {
    borderColor: 'black',
    color: 'black',
  },
  TitleText: {
    fontSize: 36,
    fontWeight: '700',
    // marginBottom: 20,
  },
  Posts: {
    marginTop: 20,
  },
});

import {IPost} from './../../Types/GlobalTypes';
import {ActionReducerMapBuilder, createAsyncThunk} from '@reduxjs/toolkit';
import {ActionPrefix} from '../../Utilities/GlobalValue';
import APICall from '../../Utilities/APIs/APIRequest';
import {IPostState} from '../Reducers/PostsReducer';
import {getRandomUrl} from '../../Utilities/ImageUrlPool';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const fetchPostsList = createAsyncThunk(
  ActionPrefix.GET_POSTS,
  async (_, {rejectWithValue}) => {
    const result = await APICall('getPosts').catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Error in fetching posts data',
        text2: 'Please try again later or contact administrator',
      });
      throw err;
    });
    result.map((post: IPost) => (post.image = getRandomUrl()));

    return result;
  },
);

const PostsActionReducerBuilder = (
  builder: ActionReducerMapBuilder<IPostState>,
) => {
  builder
    .addCase(fetchPostsList.pending, state => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchPostsList.rejected, (state, action: any) => {
      console.log('payload', action);
      state.isLoading = false;
      state.error = {isError: true, message: action.error.message};
    })
    .addCase(fetchPostsList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.postList = action.payload;
    });
};

export default PostsActionReducerBuilder;

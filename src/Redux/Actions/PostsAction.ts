import {IPost} from './../../Types/GlobalTypes';
import {ActionReducerMapBuilder, createAsyncThunk} from '@reduxjs/toolkit';
import {ActionPrefix} from '../../Utilities/GlobalValue';
import APICall from '../../Utilities/APIs/APIRequest';
import {IPostState} from '../Reducers/PostsReducer';
import {getRandomUrl} from '../../Utilities/ImageUrlPool';

export const fetchPostsList = createAsyncThunk(
  ActionPrefix.GET_POSTS,
  async (_, {rejectWithValue}) => {
    const result = await APICall('getPosts');
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

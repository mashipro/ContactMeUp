import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IErrorMessage, IPost} from '../../Types/GlobalTypes';
import PostsActionReducerBuilder from '../Actions/PostsAction';

export type IPostState = {
  isLoading: boolean;
  error: IErrorMessage | null;
  postList: IPost[];
  selectedPosts: IPost | null;
};

export const postInitialState: IPostState = {
  isLoading: false,
  error: null,
  postList: [],
  selectedPosts: null,
};

const PostsReducer = createSlice({
  name: 'contacts',
  initialState: postInitialState,
  reducers: {
    setSelectedPosts: (state: IPostState, action: PayloadAction<IPost>) => {
      const selected = action.payload;
      state.selectedPosts = selected;
    },
    clearSelectedPosts: (state: IPostState) => {
      state.selectedPosts = null;
    },
  },
  extraReducers: PostsActionReducerBuilder,
});

export const {setSelectedPosts, clearSelectedPosts} = PostsReducer.actions;
export default PostsReducer;

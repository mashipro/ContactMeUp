import {combineReducers} from 'redux';
import ContactReducer from './ContactReducer';
import PostsReducer from './PostsReducer';

export default combineReducers({
  contacts: ContactReducer.reducer,
  posts: PostsReducer.reducer,
});

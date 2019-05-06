import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
// import FeedReducer from './FeedReducer';
 import AppReducer from './AppReducer';
 
// import LibraryReducer from './LibraryReducer';
// import SelectionReducer from './SelectionReducer';

// import UserFormReducer from './UserFormReducer';

export default combineReducers({
  auth: AuthReducer,
  // feed: FeedReducer,
  // libraries: LibraryReducer,
  // selectedLibraryId: SelectionReducer,
  // userForm: UserFormReducer,
   app: AppReducer
});

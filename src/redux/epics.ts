import { combineEpics } from 'redux-observable';
import accountEpics from './account/epics';
import profileEpics from './profile/epics';
import searchEpics from './search/epics';
import cartEpics from './cart/epics';

export default combineEpics(accountEpics, profileEpics, searchEpics, cartEpics);

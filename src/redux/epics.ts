import { combineEpics } from 'redux-observable';
import accountEpics from './account/epics';
import profileEpics from './profile/epics';
import searchEpics from './search/epics';

export default combineEpics(accountEpics, profileEpics, searchEpics);

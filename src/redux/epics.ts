import { combineEpics } from 'redux-observable';
import accountEpics from './account/epics';

export default combineEpics(accountEpics);

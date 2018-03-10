import { AjaxResponse } from 'rxjs/Rx';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { ActionType, EpicType } from '../types';
import { searchActions } from './actions';
import { API_ROOT } from '../../constants';

const profileEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(searchActions.GET.REQUEST)
        .mergeMap((action: SearchRequestAction) => ajax.get(
            `${API_ROOT}/book/query_by_${action.payload.type}/${encodeURIComponent(action.payload.q)}`,
            )
                .map((res: AjaxResponse) => {
                    const {payload} = res.response;
                    return {type: searchActions.GET.SUCCESS, payload: Object.values(payload)};
                })
        );

export default combineEpics(profileEpic);
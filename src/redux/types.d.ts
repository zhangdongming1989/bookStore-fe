/// <reference path="./account/types.d.ts" />
import { RouterState } from 'react-router-redux';

declare interface ActionType {
    type: string;
    payload?: Object;
}

declare interface RootState {
    router: RouterState;
    account: StateAccountTypes;
    profile: StateProfileTypes;
}

export type EpicType = StateAccountTypes | StateProfileTypes;
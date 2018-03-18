/// <reference path="./account/types.d.ts" />
import { RouterState } from 'react-router-redux';
import { StateAdminType } from './admin/types';

declare interface ActionType {
    type: string;
    payload?: object;
}

declare interface RootState {
    router: RouterState;
    account: StateAccountTypes;
    profile: StateProfileTypes;
    search: StateSearchTypes;
    cart: StateCartTypes;
    admin: StateAdminType;
}

export type EpicType = StateAccountTypes | StateProfileTypes | RootState;
import { Action } from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntityResetAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { EntityRemoveAction } from '../../../state/utils/entity/entity.action';
import { getCartIdByUserId } from '../../utils/utils';
import { MULTI_CART_FEATURE } from '../multi-cart-state';

export const RESET_FRESH_CART = '[Multi Cart] Reset Fresh Cart';

export const CREATE_MULTI_CART = '[Multi Cart] Create Cart';
export const CREATE_MULTI_CART_FAIL = '[Multi Cart] Create Cart Fail';
export const CREATE_MULTI_CART_SUCCESS = '[Multi Cart] Create Cart Success';

export const LOAD_MULTI_CART = '[Multi Cart] Load Cart';
export const LOAD_MULTI_CART_FAIL = '[Multi Cart] Load Cart Fail';
export const LOAD_MULTI_CART_SUCCESS = '[Multi Cart] Load Cart Success';

export const MERGE_MULTI_CART = '[Multi Cart] Merge Cart';
export const MERGE_MULTI_CART_SUCCESS = '[Multi Cart] Merge Cart Success';

export const RESET_MULTI_CART_DETAILS = '[Multi Cart] Reset Cart Details';

export const SET_FRESH_CART = '[Multi Cart] Set Fresh Cart';

export const SET_CART_LOADING = '[Multi Cart] Set Cart Loading';

export const REMOVE_CART = '[Multi Cart] Remove Cart';

export const ADD_EMAIL_TO_MULTI_CART = '[Multi Cart] Add Email';
export const ADD_EMAIL_TO_MULTI_CART_FAIL = '[Multi Cart] Add Email Fail';
export const ADD_EMAIL_TO_MULTI_CART_SUCCESS = '[Multi Cart] Add Email Success';

export const LOAD_WISH_LIST = '[Multi Cart] Load Wish List';
export const LOAD_WISH_LIST_FAIL = '[Multi Cart] Load Wish List Fail';
export const LOAD_WISH_LIST_SUCCESS = '[Multi Cart] Load Wish List Success';

export class ResetFreshCart extends EntityResetAction {
  readonly type = RESET_FRESH_CART;
  constructor() {
    super(MULTI_CART_FEATURE, 'fresh');
  }
}

export class SetFreshCart extends EntitySuccessAction {
  readonly type = SET_FRESH_CART;
  constructor(public payload: Cart) {
    super(MULTI_CART_FEATURE, 'fresh', payload);
  }
}

export class CreateMultiCart extends EntityLoadAction {
  readonly type = CREATE_MULTI_CART;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, 'fresh');
  }
}

export class CreateMultiCartFail extends EntityFailAction {
  readonly type = CREATE_MULTI_CART_FAIL;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, 'fresh');
  }
}

export class CreateMultiCartSuccess extends EntitySuccessAction {
  readonly type = CREATE_MULTI_CART_SUCCESS;
  constructor(public payload: { cart: Cart; userId: string; extraData?: any }) {
    super(MULTI_CART_FEATURE, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export class LoadMultiCart extends EntityLoadAction {
  readonly type = LOAD_MULTI_CART;
  constructor(public payload: { userId: string; cartId: string }) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class LoadMultiCartFail extends EntityFailAction {
  readonly type = LOAD_MULTI_CART_FAIL;
  constructor(public payload: { cartId: string; error?: any }) {
    super(MULTI_CART_FEATURE, payload.cartId, payload.error);
  }
}

export class LoadMultiCartSuccess extends EntitySuccessAction {
  readonly type = LOAD_MULTI_CART_SUCCESS;
  constructor(public payload: { cart: Cart; userId: string; extraData?: any }) {
    super(MULTI_CART_FEATURE, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export class MergeMultiCart implements Action {
  readonly type = MERGE_MULTI_CART;
  constructor(public payload: any) {}
}

// I don't know if we should keep it or replace with different action for removal
export class MergeMultiCartSuccess extends EntityRemoveAction {
  readonly type = MERGE_MULTI_CART_SUCCESS;
  constructor(
    public payload: { oldCartId: string; cartId: string; userId: string }
  ) {
    super(MULTI_CART_FEATURE, payload.oldCartId);
  }
}

export class ResetMultiCartDetails extends EntityResetAction {
  readonly type = RESET_MULTI_CART_DETAILS;
  constructor() {
    super(MULTI_CART_FEATURE, undefined);
  }
}

export class SetCartLoading extends EntityLoadAction {
  readonly type = SET_CART_LOADING;
  constructor(public payload: { cartId: string }) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class RemoveCart extends EntityRemoveAction {
  readonly type = REMOVE_CART;
  constructor(public payload: string) {
    super(MULTI_CART_FEATURE, payload);
  }
}

export class AddEmailToMultiCart extends EntityLoadAction {
  readonly type = ADD_EMAIL_TO_MULTI_CART;
  constructor(
    public payload: { userId: string; cartId: string; email: string }
  ) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class AddEmailToMultiCartFail extends EntityFailAction {
  readonly type = ADD_EMAIL_TO_MULTI_CART_FAIL;
  constructor(public payload: { userId: string; cartId: string; error: any }) {
    super(MULTI_CART_FEATURE, payload.cartId, payload.error);
  }
}

export class AddEmailToMultiCartSuccess extends EntitySuccessAction {
  readonly type = ADD_EMAIL_TO_MULTI_CART_SUCCESS;
  constructor(public payload: { userId: string; cartId: string }) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class LoadWisthList extends EntityLoadAction {
  readonly type = LOAD_WISH_LIST;
  constructor(public payload: string) {
    super(MULTI_CART_FEATURE, payload);
  }
}

export class LoadWisthListFail extends EntityFailAction {
  readonly type = LOAD_WISH_LIST_FAIL;
  constructor(public payload: { cartId: string; error?: any }) {
    super(MULTI_CART_FEATURE, payload.cartId, payload.error);
  }
}

export class LoadWisthListSuccess extends EntitySuccessAction {
  readonly type = LOAD_WISH_LIST_SUCCESS;
  constructor(public payload: { cart: Cart; userId: string; extraData?: any }) {
    super(MULTI_CART_FEATURE, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export type MultiCartActions =
  | ResetFreshCart
  | SetFreshCart
  | CreateMultiCart
  | CreateMultiCartFail
  | CreateMultiCartSuccess
  | LoadMultiCart
  | LoadMultiCartFail
  | LoadMultiCartSuccess
  | MergeMultiCart
  | MergeMultiCartSuccess
  | ResetMultiCartDetails
  | SetCartLoading
  | RemoveCart
  | AddEmailToMultiCart
  | AddEmailToMultiCartFail
  | AddEmailToMultiCartSuccess
  | LoadWisthList
  | LoadWisthListFail
  | LoadWisthListSuccess;

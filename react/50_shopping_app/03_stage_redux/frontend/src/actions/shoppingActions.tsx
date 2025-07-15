import { loading, stopLoading, logoutFailed } from './loginActions';
import * as actionConstants from '../types/actionConstants';
import ShoppingItem from '../models/ShoppingItem';
import type { Action } from '../types/states';
import type { ThunkDispatch } from 'redux-thunk';

// ASYNC THUNKS

export const getList = (token: string) => {
  return (dispatch: ThunkDispatch<any, any, Action>) => {
    const request = new Request("/api/shopping", {
      method: "GET",
      headers: {
        "token": token
      }
    })
    handleFetch(request, "getlist", dispatch, token);
  }
}

export const add = (token: string, item: ShoppingItem) => {
  return (dispatch: ThunkDispatch<any, any, Action>) => {
    const request = new Request("/api/shopping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify(item)
    })
    handleFetch(request, "additem", dispatch, token);
  }
}

export const remove = (token: string, id: string) => {
  return (dispatch: ThunkDispatch<any, any, Action>) => {
    const request = new Request("/api/shopping/" + id, {
      method: "DELETE",
      headers: {
        "token": token
      }
    })
    handleFetch(request, "removeitem", dispatch, token);
  }
}

export const edit = (token: string, item: ShoppingItem) => {
  return (dispatch: ThunkDispatch<any, any, Action>) => {
    const request = new Request("/api/shopping/" + item.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify(item)
    })
    handleFetch(request, "edititem", dispatch, token);
  }
}

const handleFetch = async (
  request: Request, 
  act: string, 
  dispatch: ThunkDispatch<any, any, Action>, 
  token: string
) => {
  dispatch(loading());
  const response = await fetch(request);
  dispatch(stopLoading());
  if (!response) {
    dispatch(logoutFailed("Server never responded"));
    return;
  }
  if (response.ok) {
    switch (act) {
      case "getlist": {
        const temp = await response.json();
        if (!temp) {
          dispatch(fetchListFailed("Failed to parse shopping information. Try again later"));
          return;
        }
        const list = temp as ShoppingItem[];
        dispatch(fetchListSuccess(list));
        return;
      }
      case "additem": {
        dispatch(fetchItemSuccess(actionConstants.ADD_ITEM_SUCCESS));
        dispatch(getList(token));
        return;
      }
      case "removeitem": {
        dispatch(fetchItemSuccess(actionConstants.REMOVE_ITEM_SUCCESS));
        dispatch(getList(token));
        return;
      }
      case "edititem": {
        dispatch(fetchItemSuccess(actionConstants.EDIT_ITEM_SUCCESS));
        dispatch(getList(token));
        return;
      }
      default:
        return;
    }
  } else {
    if (response.status === 403) {
      dispatch(logoutFailed("Your session has expired"));
      return;
    }
    const errorMessage = "Server responded with a status "
      + response.status + " " + response.statusText;
    switch (act) {
      case "getlist": {
        dispatch(fetchListFailed("Failed to get shopping information. " + errorMessage));
        return;
      }
      case "additem": {
        dispatch(fetchItemFailed(
          actionConstants.ADD_ITEM_FAILED, 
          "Failed to add new item. " + errorMessage
        ));
        return;
      }
      case "removeitem": {
        dispatch(fetchItemFailed(
          actionConstants.REMOVE_ITEM_FAILED, 
          "Failed to remove item. " + errorMessage
        ));
        return;
      }
      case "edititem": {
        dispatch(fetchItemFailed(
          actionConstants.EDIT_ITEM_FAILED, 
          "Failed to edit item. " + errorMessage
        ));
        return;
      }
      default:
        return;
    }
  }
}

// ACTION CREATORS

const fetchListSuccess = (list: ShoppingItem[]) => {
  return {
    type: actionConstants.FETCH_LIST_SUCCESS,
    payload: list
  }
}

const fetchListFailed = (error: string) => {
  return {
    type: actionConstants.FETCH_LIST_FAILED,
    payload: error
  }
}

const fetchItemSuccess = (type: string) => {
  return {
    type: type
  }
}

const fetchItemFailed = (type: string, error: string) => {
  return {
    type: type,
    payload: error
  }
}
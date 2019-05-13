import {
SET_KEY,PUSH_ROW , SHOW_LOADER,HIDE_LOADER
} from './types';
import { AsyncStorage } from 'react-native';

import axios from "axios";
 

export const setArray = ({ prop, value }) => {
  return {
    type: SET_ARRAY,
    payload: { prop, value }
  };
};
export const pushArray = ({ prop, value }) => {
  return {
    type: PUSH_ROW,
    payload: { prop, value }
  };
};
export const setKey = ({ prop, value }) => {
  return {
    type: SET_KEY,
    payload: { prop, value }
  };
};

export const setTiming = (prop,value) => {
  return {
    type: prop,
    payload: value
  };
}

export const selectedBuildingDuringCheckout = (prop,value) => {
  return {
    type: prop,
    payload: value
  };
}


export const setProducts = ({ prop, value }) => {
  return {
    type: prop,
    payload:  value 
  };
};

export const setCartTotal = ({ prop, value }) => {
  return {
    type: prop,
    payload:  value 
  };
};

export const setFavouriteProducts = ({ prop, value }) => {
  return {
    type: prop,
    payload:  value 
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
    payload: false
  };
}
export const showLoader = () => {
  return {
    type: SHOW_LOADER,
    payload: true
  };
}
export const setPage = (x) => {
  return {
    type: SET_PAGE,
    payload: x
  };
}
export const getProfile = (data, s) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    axios.post(URL + s, data)
      .then(res => {
        console.log(res.data);
        dispatch({
          type: FEED_FETCH_SUCCESS,
          payload: res.data
        });
      }).catch(function (error) {
        console.log(error);
      });
  };
}
export const saveUserDetails = (x) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    fetch(URL + 'profile/SaveUserDetails', postJson(x))
      .then(r => r.json())
      .then(res => {
         
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const loginUser = ({ email, password }, callback, u) => {
  return (dispatch) => {
     
    if (u) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: u
      });
      callback();
      return;
    }


    dispatch({ type: LOGIN_USER });
    const params = {
      email: email,
      password: password
    };
    fetch(URL + 'home/get_login', postData(params))
      .then(r => r.json())
      .then(res => {

        if (res.status === 'Success') {
          axios.post(URL + 'profile/getUserDetails', { id: res.id })
            .then(user => {
              loginUserSuccess(dispatch, user.data, callback);
            }).catch(function (error) {
              console.log(error);
            });
        } else {
          loginUserFail(dispatch);
        }
      })
      .catch(function (error) {
        alert('network error');
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user, callback) => {
 try {
   console.log('user at asynch login',user);
   AsyncStorage.setItem('user', JSON.stringify(user));
 } catch (error) { 
   console.log(error);
 }
  
  
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });
    callback(user);
 

  // Actions.main();
};

export const getCity = (data) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    axios.post(URL + 'profile/getLatestProfileMatchResults', data)
      .then(res => {
        dispatch({
          type: FEED_FETCH_SUCCESS,
          payload: res.data
        });
      }).catch(function (error) {
        console.log(error);
      });
  };
}
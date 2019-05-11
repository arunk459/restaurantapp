import {
  HIDE_LOADER, SHOW_LOADER, FILTER_UPDATE,FILTER_ROW,PUSH_ROW,SET_KEY
} from '../actions/types';

const INITIAL_STATE = { rows: [], loading: false,city: [],
    email: "",
    idToken: "",
    city_id: "",
    accessToken: "",
    building_id: "",
    realtedBuilding: [],
    favProducts:[],
    cart:[],
    loading:true };

export default (state = INITIAL_STATE, action) => {
 

  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: action.payload };
    case HIDE_LOADER:
    return { ...state, loading: action.payload };
    case SET_KEY:
    return { ...state, [action.payload.prop]: action.payload.value };
    case 'cart_products':
    return { ...state,cart: action.payload}
    case 'set_fav_products':
    return {...state, favProducts : action.payload}
    
    case PUSH_ROW:
   
    return { ...state,
      [action.payload.prop]: [...state[action.payload.prop], action.payload],
      
      };
 
    default:
      return state;
  }
};

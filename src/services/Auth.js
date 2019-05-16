import axios from "axios";
import React, { Component } from 'react';
import {
  
  Picker 
} from 'react-native';
export const serviceurl = "https://ezzybitetest.azurewebsites.net/admin/service_react";


export const fetch_login = (formData) => {
    return axios.post(serviceurl + '/login', formData);

}
export const applyCoupon = (formData)=>{
    return axios.post(serviceurl + '/check_coupon',formData);
}

export const get_bookings = (formData)=>{
    return axios.post(serviceurl + '/booking',formData);
}

export const fetch_sales_tax_rate = (buildingId)=>{
    return axios.post(serviceurl + '/fetch_sales_tax_rate/'+buildingId);
}

export const delete_from_cart = (itemId) => {
    return axios.post(serviceurl + '/delete_from_cart'+'/'+itemId);
}

export const add_to_wishlist = (userId,itemId) => {
    return axios.post(serviceurl + '/add_to_wishlist'+'/'+userId+'/'+itemId);
}

export const fetch_wishlist = (userId)=>{
    console.log("fetch_wishlist url",serviceurl + '/view_wish_list'+'/'+userId)
    return axios.get(serviceurl + '/view_wish_list'+'/'+userId);
}

export const fetch_cities = () => {
    return axios.post(serviceurl + '/fetch_city_list');

}
export const fetch_buildings = (cityId) => {
    return axios.get(serviceurl + '/fetch_buildings/' + cityId);

}
export const google_login = (formData) => {
    return axios.post(serviceurl + '/google_login', formData);

}


export const fetch_banners = (formData) => {
    return axios.get(serviceurl + '/fetch_banners');

}
 export const addUser = (formData) => {
        return  axios.post(serviceurl + '/register' , formData);
  
    }

export const fetch_delivery_times = (formData) => {
    return axios.get(serviceurl + '/fetch_delivery_times');

}


export const fetch_menu_items_new = (menuId) => {
    return axios.get(serviceurl + '/fetch_menu_items_new/' + menuId);

}

export const fetch_product_details = (formData) => {
    return axios.post(serviceurl + '/fetch_product_details', formData);

}
export const submit_product_review = (formData) => {
    return axios.post(serviceurl + '/submit_product_review', formData);

}
export const add_to_cart = (formData) => {
    return axios.post(serviceurl + '/add_to_cart', formData);

}

export const view_cart = (formData) => {
    return axios.post(serviceurl + '/view_cart', formData);

}

// export const delete_from_cart = (formData) => {
//     return axios.post(serviceurl + '/delete_from_cart', formData);

// }

export const update_cart = (formData) => {
    return axios.post(serviceurl + '/update_cart', formData);

}
export const makeDropDown = (d) => {
  return d.map(d =>
    <Picker.Item label={d.name} value={d.id} />
  );
};
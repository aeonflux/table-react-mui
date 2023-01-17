import axios from "axios";
import {
    PRODUCTS_FETCH_SUCCESS,
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_UPDATE_SUCCESS,
    CATEGORIES_FETCH_SUCCESS,
    PRODUCT_FETCH_REQUEST,
    PRODUCTS_FETCH_REQUEST,
    PRODUCT_ERROR
} from "./types";

import { config } from '../config';

const { API_URL } = config;


export const fetchProducts = (limit) => async dispatch => {
    dispatch({
        type: PRODUCTS_FETCH_REQUEST,
        payload: true
    });
    try {
        const response = await axios.get(`${API_URL}/products?limit=${limit}`);
        if (response.status === 200) {
            dispatch({
                type: PRODUCTS_FETCH_SUCCESS,
                payload: response.data
            });
        }
    } catch (e) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                error: "Error occured"
            }
        });
    }
};

export const fetchProduct = (id) => async dispatch => {
    try {
        dispatch({
            type: PRODUCT_FETCH_REQUEST,
            payload: true
        });
        const response = await axios.get(`${API_URL}/products/${id}`);
        if (response.status === 200) {
            dispatch({
                type: PRODUCT_FETCH_SUCCESS,
                payload: response.data
            });
        }
    } catch (e) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                error: "Error occured"
            }
        });
    }
};


export const fetchCategories = () => async dispatch => {
    try {
        const response = await axios.get(`${API_URL}/products/categories`);
        if (response.status === 200) {
            dispatch({
                type: CATEGORIES_FETCH_SUCCESS,
                payload: response.data
            });
        }
    } catch (e) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                error: "Error occured"
            }
        });
    }
};


export const createProduct = payload => async dispatch => {
    try {
        const response = await axios.post(`${API_URL}/products`, payload);
        if (response.status === 201) {
            dispatch({
                type: PRODUCT_CREATE_SUCCESS,
                payload: response.data
            });
        }
    } catch (e) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                error: "Error occured"
            }
        });
    }
};

export const updateProduct = (id, payload) => async dispatch => {
    try {
        const response = await axios.patch(`${API_URL}/products/${id}`, payload);
        if (response.status === 200) {
            dispatch({
                type: PRODUCT_UPDATE_SUCCESS,
                payload: response.data
            });
        }
    } catch (e) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                error: "Error occured"
            }
        });
    }
};


export const deleteProduct = id => async dispatch => {
    try {
        const response = await axios.delete(`${API_URL}/products/${id}`, {});
        if (response.status === 200) {
            dispatch({
                type: PRODUCT_DELETE_SUCCESS,
                payload: id
            });
        }
    } catch (e) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                error: "Error occured"
            }
        });
    }
};

// export const viewProduct = payload => async dispatch => {
//     try {
//         const response = await axios.get(`${API_URL}/products/${payload}`, {});
//         if (response.status === 200) {
//             dispatch({
//                 type: PRODUCT_VIEW_SUCCESS,
//                 payload: response.data
//             });
//         }
//     } catch (e) {
//         dispatch({
//             type: PRODUCT_ERROR,
//             payload: {
//                 error: "Error occured"
//             }
//         });
//     }
// };

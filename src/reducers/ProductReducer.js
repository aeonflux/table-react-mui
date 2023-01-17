import {
    PRODUCTS_FETCH_SUCCESS,
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_ERROR,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCTS_FETCH_REQUEST,
    PRODUCT_FETCH_REQUEST,
    CATEGORIES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    product: {
        id: 0,
        title: '',
        category: '',
        price: '',
        summary: '',
        description: '',
        rating: 0
    },
    products: [],
    categories: [],
    error: "",
    isLoadingProducts: false,
    isLoadingProduct: false
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case PRODUCTS_FETCH_REQUEST:
            return {
                ...state,
                isLoadingProducts: true,
            };
        case PRODUCT_FETCH_REQUEST:
            return {
                ...state,
                isLoadingProduct: true
            };
        case PRODUCTS_FETCH_SUCCESS:
            return {
                ...state,
                products: action.payload,
                isLoadingProducts: false
            };
        case PRODUCT_FETCH_SUCCESS:
            return {
                ...state,
                product: action.payload,
                isLoadingProduct: false
            };
        case CATEGORIES_FETCH_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                isLoadingProducts: false
            };
        case PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                products: [{
                    ...state.products,
                    ...action.payload
                }],
                error: "",
                status: "",
            };
        case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                products: state.products.filter(
                    product => product.id !== action.payload
                )
            };
        case PRODUCT_UPDATE_SUCCESS:
            return {
                ...state,
                product: action.payload,
                error: "",
                status: "",
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                )
            };
        case PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
}
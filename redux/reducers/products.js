import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    PURCHASE_PRODUCT_REQUEST,
    PURCHASE_PRODUCT_SUCCESS,
    PURCHASE_PRODUCT_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SUBSCRIBE_BUNDLE_REQUEST,
    SUBSCRIBE_BUNDLE_SUCCESS,
    SUBSCRIBE_BUNDLE_FAILURE,
    CANCEL_SUBSCRIPTION_REQUEST,
    CANCEL_SUBSCRIPTION_SUCCESS,
    CANCEL_SUBSCRIPTION_FAILURE,
    UPDATE_PRODUCT_IMAGES, // New action type for updating images
} from '../actions/actionTypes';

const initialState = {
    products: [
        {
            id: null,
            title: '', 
            price: 0,
            originalPrice: 0,
            images: [], // Updated: Changed from a single image to an array of images
            rating: null, 
            reviewCount: 0, 
            brands: [], 
            isBrandOfficial: false, 
            isLocalDispatch: false, 
            description: '',
            quantity: 0,
            category: '',
            itemsIncluded: [],
            subscriptions: false,
            vendor: {
                id: null,
                name: '',
                contact: '',
                isVerified: false,
            },
            expirationDate: null,
        },
    ],
    loading: false,
    error: null,
    cart: [],
   
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
        case CREATE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
        case PURCHASE_PRODUCT_REQUEST:
        case SUBSCRIBE_BUNDLE_REQUEST:
        case CANCEL_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };

        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload],
            };

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                ),
                productDetail: action.payload, // Update productDetail if needed
            };

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter(product => product.id !== action.payload),
            };

        case PURCHASE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.product.id !== action.payload),
            };

        case SUBSCRIBE_BUNDLE_SUCCESS:
            return {
                ...state,
                loading: false,
                subscriptions: [...state.subscriptions, action.payload],
            };

        case CANCEL_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscriptions: state.subscriptions.filter(sub => sub.productId !== action.payload),
            };

        // New case for updating product images
        case UPDATE_PRODUCT_IMAGES:
            return {
                ...state,
                productDetail: {
                    ...state.productDetail,
                    images: action.payload, // Update images with the new array
                },
            };

        case FETCH_PRODUCTS_FAILURE:
        case CREATE_PRODUCT_FAILURE:
        case UPDATE_PRODUCT_FAILURE:
        case DELETE_PRODUCT_FAILURE:
        case PURCHASE_PRODUCT_FAILURE:
        case SUBSCRIBE_BUNDLE_FAILURE:
        case CANCEL_SUBSCRIPTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload, // Capture error message
            };

        default:
            return state;
    }
};

export default productReducer;

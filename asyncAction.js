const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;  

const initialState = {
    loading: false,
    users: [],
    error: '',
};

const FETCH_USER_REQUESTED = 'FETCH_USER_REQUESTED';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const fetchUserRequest = () => ({
    type: FETCH_USER_REQUESTED,
});

const fetchUserSuccess = (users) => ({
    type: FETCH_USER_SUCCESS,
    payload: users,
});

const fetchUserFailure = (error) => ({
    type: FETCH_USER_FAILURE,
    users: [],
    payload: error,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUESTED:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: '',
            };
        case FETCH_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

const fetchUser = () => (dispatch) => {
    dispatch(fetchUserRequest());
    axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((response) => {
            // console.log(response.data);
            const users = response.data.map((users)=>users);
            dispatch(fetchUserSuccess(users));
        })
        .catch((error) => {
            const errorMsg = error.message;
            dispatch(fetchUserFailure(errorMsg));
        });
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {console.log(store.getState())});
store.dispatch(fetchUser());

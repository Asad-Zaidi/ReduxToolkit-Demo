const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

// Action
const CAKE_ORDER = 'CAKE_ORDER';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICREAM_ORDER = 'ICREAM_ORDER';
const ICREAM_RESTOCKED = 'ICREAM_RESTOCKED';

function orderCake() {
    return {
        type: CAKE_ORDER,
        payload: 1,
    };
};

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICREAM_ORDER,
        payload: qty,
    };
};

function restockIceCream(qty = 1) {
    return {
        type: ICREAM_RESTOCKED,
        payload: qty,
    }
}


// const innitialState = {
//     numberOfCakes: 20,
//     numberOfIceCreams: 20,
//     // numeberOfCupCakes: 40,
//     // numeberOfPancakes: 60,
//     // anotherProperty: 0,
// };

const initialCakeState = {
    numberOfCakes: 10
};

const initialIceCreamState = {
    numberOfIceCreams: 20
};

// Reducer
const CakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDER:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1,
                // numeberOfCupCakes: state.numeberOfCupCakes - 1,
                // numeberOfPancakes: state.numeberOfPancakes - 1,
                // anotherProperty: state.anotherProperty + 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes + action.payload,
            }
        default:
            return state;
    };
};

const IceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICREAM_ORDER:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams - 1,
            }
        case ICREAM_RESTOCKED:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams + action.payload
            }
        default:
            return state
    }
};


const rootReducer = combineReducers({
    Cake: CakeReducer,
    IceCream: IceCreamReducer,
});

// Store
const store = createStore(rootReducer);
console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() =>
    console.log('Updated State', store.getState()
    ));

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(5));

const actions = bindActionCreators(
    { orderCake, restockCake, orderIceCream, restockIceCream },
    store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(3);


unsubscribe()
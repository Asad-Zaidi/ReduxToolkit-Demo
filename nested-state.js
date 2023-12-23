const redux = require('redux');
const produce = require('immer').produce;

const innitialState = {
    name: 'Asad',
    address: {
        street: '123 Main st.',
        city: 'Lahore',
        country: 'Pakistan'
    },
}

const STREET_UPDATE = 'STREET_UPDATE';
function updateStreet(street) {
    return {
        type: STREET_UPDATE,
        payload: street
    };
};

const reducer = (state = innitialState, action) => {
    switch (action.type) {

        case innitialState:
        //     return {
        //         ...state,
        //         address: {
        //             ...state.address,
        //             street: action.payload
        //         },
        //     };
        return produce (state, (draft) => {
            draft.address.street = action.payload
        });

        case STREET_UPDATE:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = action.payload
            });
        default:
            return state
    };
};

const store = redux.createStore(reducer)
console.log('Initial State ', store.getState());

const unsubscribe = store.subscribe(() => {
    console.log('Updated state', store.getState());
});

store.dispatch(updateStreet('123 North St.'));

unsubscribe();
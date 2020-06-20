import {ADD_MOCK, DELETE_ALL_MOCK, DELETE_MOCK, SELECT_MOCK, UPDATE_MOCK, UPLOAD_MOCK} from "../actions/mocks.actions";

export function mocksReducer(state = [], action) {
    switch (action.type) {
        case ADD_MOCK:
            let newMock = state.map(d => d);
            newMock.push(action.mock);
            return newMock;
        case DELETE_MOCK:
            return state.filter((d, i) => i != action.index);
        case DELETE_ALL_MOCK:
            return [];
        case UPDATE_MOCK:
            return state.map((d, i) => {
               if (i == action.index) {
                   return action.mock;
               }
               else {
                   return d;
               }
            });
        case UPLOAD_MOCK:
            let mocks = state.map(d => d);
            return mocks.concat(action.mocks);
        default:
            return state;
    }
}

export function selectedMockReducer(state = -1, action) {
    switch (action.type) {
        case SELECT_MOCK:
            return action.index;
        case DELETE_ALL_MOCK:
            return -1;
        default:
            return state;
    }
}

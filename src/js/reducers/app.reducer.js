import {mocksReducer, selectedMockReducer} from "./mocks.reducer";

const intialState = {
    mocks: []
};

export const AppReducer = (state = intialState, action) => {
    return {
        mocks: mocksReducer(state.mocks, action),
        selectedMock: selectedMockReducer(state.selectedMock, action)
    }
}
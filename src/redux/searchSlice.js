import { createSlice } from '@reduxjs/toolkit';

/*This is where I'm least familar with the tools in this project - Redux. 
    From the various guides and videos I've studied, I've gathered that I need to make something
    called a Reducer that essentially captures the specifics of what has changed in the app, and only
    the specifics. In this instance, I believe it is the searchTerms (and maybe the search results?).
    This could also probably be expanded to include actions for filtering and sorting.

    The createSlice function will automatically generate the action creators and types that respond
    to the reducers and state provided. We're allow to write mutably because of the Immer library.
    Normally this isn't allowed, and you have to Return the new state instead.
    
    Why is it called a Slice? I think Slices are basically the ball of reducer logic and actions for one
    piece of the app. I named this one searchSlice because it deals with the search functionality of the
    application.*/

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        pending: false,
        searchTerms: '',
        searchResults: [],
        error: '',
    },
    reducers: {
        searchByTerms(state, action){
            state.pending = true;
            state.searchTerms = action.payload;
            state.searchResults = [];
            state.error = '';
        },
        searchSuccess(state, action){
            state.pending = false;
            state.searchResults = action.payload;
            state.error = '';
        },
        searchFail(state, action){
            state.pending = false;
            state.searchResults = [];
            state.error = action.payload.toString();
        }
    },
});

export const {searchByTerms, searchSuccess, searchFail} = searchSlice.actions;


export const searchResultsAsyc = results => dispatch => {
    dispatch(searchSuccess(results));
}

export default searchSlice.reducer;
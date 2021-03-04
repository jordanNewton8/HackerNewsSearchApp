import { TextField, Grid, Button } from '@material-ui/core';
import React, {useState} from 'react';
import '../Styles/styles.scss';
import {searchByTerms, searchSuccess, searchFail} from '../redux/searchSlice';
import store from '../redux/store';

/*Isolated search bar/button/functionality to one component to promote reusability. For ex, if I wanted to have a search bar in top nav */


//Used local-cors-proxy to be able to test locally, lcp  --proxyUrl http://hn.algolia.com/
//const API_URL = "http://localhost:8010/proxy/api/v1/search?query=";
const API_URL = "http://hn.algolia.com/api/v1/search?query=";




/*JUST the form that holds the text field and button to initiate the GET request from the news API. Isolated from the stylzed container it will be put in within App.
    Named SearchBar because it is a bar-like box that contains search functionality (I'm not great with naming components) */
function SearchBar(search){

    //Create a hook and set component state to be the searchTerms
    const [searchTerms, setSearchTerms] =  useState('');
    
    return(
        <form noValidate autoComplete="off" onSubmit={e => { e.preventDefault(); store.dispatch(getHackerNewsSearchResults(searchTerms)); }}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    {/*Can do this TextField with horizontal notation too, but there's a lot of props here
                        onChange, we update the component state with the inputted searchTerms*/}
                    <TextField 
                        id="outlined-basic" 
                        label="Search Hacker News" 
                        variant="outlined" size="small" 
                        fullWidth 
                        value={searchTerms}
                        onChange={(e) => setSearchTerms(e.target.value)}
                        />
                </Grid>
                <Grid item xs={2}>
                    {/*Why no search icon? It seemed a little overkill to include Material Icons too when I'll only use it once. 
                        For the onClick, I'm not entirely positive this is the correct way to handle the thunk, but it appears to work.*/}
                    <Button color="primary" variant="contained" onClick={() => store.dispatch(getHackerNewsSearchResults(searchTerms))} fullWidth>
                        Search
                    </Button>
                </Grid>
            </Grid>            
        </form>
    )
}

function getHackerNewsSearchResults(query){
        return dispatch => {
            //Supply store with terms and set pending to true until results come back
            dispatch(searchByTerms(query));

            //URL builder
            let URL = API_URL + query;
        
            //API get request, error handling, and state handling. 
            fetch(URL, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                }) //Convert stream to a proper json object
                .then(response => {
                    return response.json();
                }) //Update state with success and returned hits
                .then(data => {
                    dispatch(searchSuccess(data.hits));
                }) //If something went wrong, update state with failure and the error
                .catch(error => {
                    console.log("Error: " + error);
                    dispatch(searchFail(error));
                }) 
        }
    }



export default SearchBar

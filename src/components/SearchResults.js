import React from 'react';
import { Container, Grid, Typography, CircularProgress} from '@material-ui/core';
import HackerNewsCard from './HackerNewsCard';
import store from '../redux/store'
import { connect } from 'react-redux';


function SearchResults(props){
  
    return(
        <Container maxWidth="lg">
            {props.searchPending ?
                ( /*Show loading circle when search results are pending */
                    <div className="loadingDiv" align="center">
                        <Typography variant="h6">Loading...</Typography>
                        <CircularProgress />
                    </div> 
                ) : props.error ? 
                (/*Show error if error encountered */         
                    <div className="errorDiv">
                        <Typography variant="body1" align="center">Error executing search</Typography>
                        <Typography variant="body2" align="center">{store.getState().search.error}</Typography>
                    </div>  
                ) : props.numberOfResults === 0 && !(props.searchTerms) ? 
                (/*Show text prompting user to search no search has been made yet */
                    <Typography variant="body2" align="center">Use the box above to search.</Typography>
                ) : props.numerOfResults === 0 && props.searchTerms ?
                (/*Show text telling user that zero results were found from their search */
                    <Typography variant="body2" align="center">Zero results found from search terms: {props.searchTerms}</Typography>
                ) :
                (/*Show results in card grid if a search was successful and results were retrieved.*/
                    <div className="resultsDiv">
                        <Typography variant="body2" align="center">{props.numberOfResults} results found from search terms: {props.searchTerms}</Typography>
                        <Grid container spacing={4}>
                            {(props.searchResults).map((result, index) => 
                            <Grid item xs={6}>
                                <HackerNewsCard key={index} news={mapSearchResult(result)}/>
                            </Grid>    
                            )} 
                        </Grid>
                    </div>
                    
                )       
            }
        </Container>
    )
}

//Map the current redux store's state to props and connect them so our component can update when changes happen
const mapStateToProps = function(state){
  return {
    searchPending: state.search.pending,
    searchResults: state.search.searchResults,
    numberOfResults: state.search.searchResults === undefined ? 0 : state.search.searchResults.length,
    searchTerms: state.search.searchTerms,
    error: state.search.error
  }
}

function mapSearchResult(result){
    return{
        title: result.title,
        created: result.created_at,
        url: result.url,
        author: result.author,
        points: result.points
    }
}

export default connect(mapStateToProps)(SearchResults);
//export default SearchResults;
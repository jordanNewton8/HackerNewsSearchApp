import React from 'react';
import { Container, Paper, Grid, Typography, CircularProgress} from '@material-ui/core';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

/*The structure of the entire app - holds individual components that make up the application */
function App(){
  return(
    <div>
      <SearchTray/>
      <SearchResults/>
    </div>
  )
}

//Styled container that holds the search component
function SearchTray() {
  return (
      <Container maxWidth="md" className="search-tray-box">
          <Paper elevation={5} className="search-tray-paper">
              <Typography variant="h5" className="search-tray-header">Search YCombinator Hacker News:</Typography>
              <SearchBar/>
          </Paper>
      </Container>
  )
}


export default App;

import React, { Component } from 'react'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

//API Keys
const tmdbAPI = '7a9602f5224d26b4db42b9c580059391'
//API BaseURLs
const tmdbURL = 'https://api.themoviedb.org/3/search/movie'
const tmdbPopularURL = 'https://api.themoviedb.org/3/movie/popular'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInput: ''
    }
  }

  // Movie Search using TMDB API
  handleInput = (event) => {
    this.setState({
      userInput: event.target.value
    })
    event.target.value !== '' ? axios({
      method: 'GET',
      url: tmdbURL,
      params: {
        api_key: tmdbAPI,
        query: event.target.value,
        include_adult: 'false',
        page: '1',
        language: 'en-US',
      }
    }).then(res => {
      // console.log(res) // HTTP Request
      const searchResults = res.data
      this.props.handleResults(searchResults)
    }) : this.props.clearResults() //console.log('Empty search, no request is sent...')
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: tmdbPopularURL,
      params: {
        api_key: tmdbAPI,
        language: 'en-US',
        page: '1'
      }
    }).then(res => {
      const searchResults = res.data
      this.props.handleResults(searchResults)
    })
  }

  render() {
    const styles = {
      whiteBg: {
        backgroundColor: 'white',
      },
      centerInput: {
        textAlign: 'center',
      },
      centerHint: {
        // left: '42%',
        width: '100%',
        textAlign: 'center',
      }
    }
    return (
      <MuiThemeProvider >
        <div style={styles.center}>
          <TextField 
            type="text" 
            name="searchBar"
            hintText="Search a movie"
            style={styles.whiteBg}
            inputStyle={styles.centerInput}
            hintStyle={styles.centerHint}
            fullWidth={true}
            value={this.state.userInput} 
            onChange={this.handleInput} /> 
        </div>
      </MuiThemeProvider >
    )
  }
}

export default SearchBar
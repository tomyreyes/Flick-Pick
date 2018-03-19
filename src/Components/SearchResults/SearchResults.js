import React, { Component } from 'react'
import axios from 'axios';
import MovieDetails from '../MovieDetails/MovieDetails'

//API Keys
// const omdbAPI = '1de557f0'
const tmdbAPI = '7a9602f5224d26b4db42b9c580059391'
//API BaseURLs
// const omdbURL = 'http://www.omdbapi.com/'
// const tmdbURL = 'https://api.themoviedb.org/3/'
// const tmdbURL = 'https://api.themoviedb.org/3/search/movie'
// const tmdbURL = 'https://api.themoviedb.org/3/find/'

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imdbID: '',
      commonHeightArray: [],
      commonHeight: '158vh',
    }
  }

  handleMovieSelect = (event) => {
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/find/${this.state.imdbID}`,
      params: {
        include_adult: 'false',
        page: '1',
        language: 'en-US',
        api_key: tmdbAPI,
        external_source: 'imdb_id'
      }
    }).then(res => {
      console.log('testing')
    })
  }

  // updateResizedHeight = () => {
  //   this.setState({
  //     commonHeightArray: [1]
  //   })
  // }

  // componentDidMount() {
  //   window.addEventListener("resize", this.updateResizedHeight());
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateResizedHeight());
  // }

  updateHeightArray = (height) => {
    this.setState({
      commonHeightArray: this.state.commonHeightArray.concat(height)
    })
    this.calculateCommonHeight()
  }

  calculateCommonHeight = () => {
    const heightArray = this.state.commonHeightArray
    let count = {}
    heightArray.forEach(height => {
      if(count[height] === undefined)
        count[height] = 1
      else
        count[height] += 1
    })
    let countArray = []
    for(let height in count) {
      if(count.hasOwnProperty(height)) {
        countArray.push({
          'height': height,
          'count': count[height]
        })
      }
    }
    // sort from highest frequency to least
    countArray.sort((a, b) => {
      return a.count < b.count
    })
    if(countArray.length > 0) {
      this.setState({
        commonHeight: Number(countArray[0].height)
      })
    }
  }

  render() {
    let { searchResults, view } = this.props
    let resultsList = []
    let display = (view === 'Search')
    //TMDB Search Results
    const displayNum = (searchResults.total_results > 0 && searchResults.total_results < 5) ? searchResults.total_results : 20

    searchResults.total_results > 0 ? 
      resultsList = searchResults.results.slice(0, displayNum).map((movie) =>
        <MovieDetails key={movie.id}
                      movie={movie} 
                      addMovie={this.props.addMovie}
                      watchList={this.props.watchList} 
                      commonHeight={this.state.commonHeight}
                      updateHeightArray={this.updateHeightArray} />)
        : console.log('No data is returned')
    return (
      <div style={{display: display ? "block" : "none"}} >
        {resultsList}
      </div>
    )
  }
}

export default SearchResults
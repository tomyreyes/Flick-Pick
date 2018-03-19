import React, { Component } from 'react'
import './App.css'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import BottomNav from '../BottomNav/BottomNav'
import WatchList from '../WatchList/WatchList'
// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Flick from '../Flick/Flick'

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchResults: [],
      watchList: [],
      view: 'Search' // Search, Flick, WatchList
    }
  }

  handleResults = (searchResults) => {
    this.setState({
      // Disable this to test code and not retrieve all images
      searchResults: searchResults
    })
  }

  clearResults = () => {
    this.setState({
      searchResults: []
    })
  }

  addMovie = (movie, add) => {
    const { watchList } = this.state
    if(add === true) { 
      this.setState({
        watchList: watchList.concat(movie) 
      })
    } else {
      watchList.splice(watchList.indexOf(movie), 1)
      this.setState({
        watchList: watchList
      })
    }
  }
  
  updateView = (view) => {
    this.setState({
      view: view
    })
  }

  render() {
    const styles = {
      maxDimensions: {
        height: '100%',
        width: '100%'
      },
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      centerText: {
        textAlign: 'center',
        height: '45px',
        lineHeight: '45px'
        
      },
      fixedNav: {
        position: 'absolute',
        zIndex: 10,
        overflow: 'hidden',
        height: this.state.view === 'Search' ? '15vh' : '7vh',
        width: '100%'
      },
      fixedBody: {
        position: 'fixed',
        overflow: 'auto',
        width: '100%',
        top: this.state.view === 'Search' ? '15vh' : '7vh',
        bottom: '5vh',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '25px'
      },
      fixedFooter: {
        position: 'absolute',
        overflow: 'hidden',
        bottom: '0vh',
        width: '100%',
        height: '8vh',
        marginBottom: 0,
        // marginTop: '10px'
      },
    }

    return (
      <MuiThemeProvider>
        <div className="container-fluid" style={styles.maxDimensions}>
          <div className="row" style={styles.fixedNav} >
            <AppBar title="Flick Pick" titleStyle={styles.centerText} showMenuIconButton={false} />
            {(this.state.view === 'Search' ) && <SearchBar handleResults={this.handleResults} clearResults={this.clearResults}  />}
          </div>
          <main className="row" style={{...styles.fixedBody}}>
            <SearchResults view={this.state.view} searchResults={this.state.searchResults} addMovie={this.addMovie} watchList={this.state.watchList} />
            <WatchList view={this.state.view} watchList={this.state.watchList} addMovie={this.addMovie}/>
            <Flick view={this.state.view} />
          </main>
          <div className="row" style={styles.fixedFooter} >
            <BottomNav updateView={this.updateView} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App

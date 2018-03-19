import React, {Component} from 'react'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'


const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>
const searchIcon = <FontIcon className="material-icons">search</FontIcon>
const randomMovieIcon = <FontIcon className="material-icons"><img src="/randomMovie.svg" width="25px" alt="randomMovie"/></FontIcon>
const randomMovieSelectedIcon = <FontIcon className="material-icons"><img src="/randomMovieSelected.svg" width="25px" alt="randomMovieSelected"/></FontIcon>

class BottomNav extends Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
    }
  }

  select = (index, view) => {
    this.setState({
      selectedIndex: index
    })
    this.props.updateView(view)
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} style={{textAlign: 'center'}}>
          <BottomNavigationItem
            label="Search"
            icon={searchIcon}
            onClick={() => this.select(0, 'Search')}
          />
          <BottomNavigationItem
            label="Flick?"
            icon={this.state.selectedIndex === 1 ? randomMovieSelectedIcon : randomMovieIcon}
            onClick={() => this.select(1, 'Flick')}
          />
          <BottomNavigationItem
            label="Watchlist"
            icon={favoritesIcon}
            onClick={() => this.select(2, 'WatchList')}
          />  
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNav;
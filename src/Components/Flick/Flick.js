import React, { Component } from 'react'
import FilterMovie from '../WatchList/FilterMovie/FilterMovie'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

// import Img from 'react-image'


const posterURL = 'http://image.tmdb.org/t/p/w342'

class Flick extends Component {
   render() {
       let display = (this.props.view === 'Flick')
       return (
           <div style={{ display: display ? "block" : "none" }}>
               <div className="row">
                   <FilterMovie />
               </div>
           </div>
       )
   }
}

export default Flick
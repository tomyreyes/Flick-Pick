import React, { Component } from 'react'

const posterURL = 'http://image.tmdb.org/t/p/original'
class MovieCarousel extends Component {
  render() {
    const { watchList, commonHeight, updateHeightArray } = this.props
    let watchListJSX = []
    watchList.length > 0 && (
      watchListJSX = watchList.map(movie =>
        <a 
          key={movie.id}
          className="carousel-item"
          href={`#${movie.id}!`}
        >
          <img 
            src={posterURL+movie.poster_path} 
          />
        </a>
      )
    )
    return (
      // <div className="carousel" onLoad={this.loadCarousel} >
      <div className="carousel">
        <a key="asdassad2123123" className="carousel-item" href="#asdasd!">
          <img src="http://image.tmdb.org/t/p/original/5vHssUeVe25bMrof1HyaPyWgaP.jpg" />
        </a>
        {/* <a className="carousel-item" href="#asdasdsa!">
          <img src="http://image.tmdb.org/t/p/original/5vHssUeVe25bMrof1HyaPyWgaP.jpg" />
        </a>
        <a className="carousel-item" href="#asdasdas!">
          <img src="http://image.tmdb.org/t/p/original/5vHssUeVe25bMrof1HyaPyWgaP.jpg" />
        </a> */}
        {watchListJSX}
      </div>
    )
  }
}

export default MovieCarousel
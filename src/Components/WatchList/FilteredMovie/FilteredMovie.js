import React, { Component } from 'react'


class FilteredMovie extends Component {
    render() {
        const filteredMovie = this.props.genreMovie
        const styles = {
            movieContainer: {
                width: '100%',
                paddingLeft: '25px',
                paddingRight: '25px',
                textAlign: 'center'
            }
        }
        return (
            <div style={styles.movieContainer} >
                {!(filteredMovie === '') ? <h3>{`${filteredMovie.title} (${filteredMovie.release_date.slice(0,4)})`}</h3> : ''}
                {!(filteredMovie === '') ? <img src={`https://image.tmdb.org/t/p/w500/${filteredMovie.poster_path}` } width='100%' alt={filteredMovie.title} /> : ''}
            </div>
        )
    }
}
export default FilteredMovie
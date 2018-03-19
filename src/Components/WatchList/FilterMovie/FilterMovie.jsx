import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios'
import FilteredMovie from '../FilteredMovie/FilteredMovie'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'
import _ from 'lodash'
const genres = [
    { name: "Action", id: 28 },
    { name: "Adventure", id: 12 },
    { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 },
    { name: "Family", id: 10751 },
    { name: "Fantasy", id: 14 },
    { name: "History", id: 36 },
    { name: "Horror", id: 27 },
    { name: "Music", id: 10402 },
    { name: "Mystery", id: 9648 },
    { name: "Romance", id: 10749 },
    { name: "Science Fiction", id: 878 },
    { name: "TV Movie", id: 10770 },
    { name: "Thriller", id: 53 },
    { name: "War", id: 10752 },
    { name: "Western", id: 37 }
]
const ids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "ScienceFiction",
    10770: "TvMovie",
    53: "Thriller",
    10752: "War",
    37: "Western"
}
class FilterMovie extends Component {
    constructor() {
        super()
        this.state = {
            genreMovie: '',
            chipText: [],
            genreList: [],
            value: ''
        }
    }
    update = (e, index, value) => {
        this.setState(
            {
                genreList: value
            }
        )
    }
    updateYear = (e, index, value) => {
        console.log('value', value)
        this.setState({
            value: value
        })
    }
    selectionRenderer = (genreList) => {
        switch (genreList.length) {
            case 0:
                return '';
            case 1:
                return `${ids[genreList[0]]} selected`;
            default:
                return `${genreList.length} genres selected`;
        }
    }
    menuItems(genres) {
        return genres.map((genre) => (
            <MenuItem
                key={genre.id}
                insetChildren={true}
                checked={this.state.genreList.indexOf(genre.id) > -1}
                value={genre.id}
                primaryText={genre.name}
            />
        ));
    }
    getRandom = () => {
        //make lists available a variable then conditions 
        let multipleGenres = this.state.genreList.toString()
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2d1610b0077610c43b2fe59ad827cfec&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=${this.state.value}&with_genres=${multipleGenres}`)
            .then((res) => {
                let pageMax = 20
                let min = 1
                let totalPages = res.data.total_pages
                // let totalResults = res.data.total_results
                if (totalPages < pageMax) {
                    pageMax = totalPages
                }
                if (res.data.total_results === 0) {
                    return
                }
                let num = Math.floor(Math.random() * (pageMax - min + 1)) + min
                axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2d1610b0077610c43b2fe59ad827cfec&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}&year=${this.state.value}&with_genres=${multipleGenres}`)
                    .then((res) => {
                        let movieArray = res.data.results
                        this.setState({
                            genreMovie: this.randomMovie(movieArray)
                        })
                    })
            })
    }
    handleRequestDelete = (id) => {
        console.log(id)
        let removedList = this.state.genreList.filter(remove => (remove !== id) ? remove : '')
        this.setState({
            genreList: removedList
        })
    }
    // }
    randomMovie = (movieList) => {
        let random = Math.floor(Math.random() * movieList.length)
        return movieList[random]
    }
    render() {
        let blah = this.state.genreList.map((id, i) => {
            return (
                <Chip containerElement="span" onRequestDelete={() => { this.handleRequestDelete(id) }} key={i}>{ids[id]}</Chip>
            )
        })
        const styles = {
            chipWrap: {
                display: 'flex', 
                flexWrap: 'wrap',
                paddingBottom: '20px',
                textAlign: 'center'
            },

        }
        return (
            <div className="row" style={{ textAlign: 'center'}}>
                <SelectField value={this.state.value} onChange={this.updateYear} className="select-board-size" hintText="Year">
                    <MenuItem key={'ncbnf'} value="" primaryText=""></MenuItem>{_.range(2018, 1990 - 1).map(year => <MenuItem key={year} value={year} primaryText={year}></MenuItem>)}
                </SelectField>
                <SelectField
                    multiple={true}
                    hintText="Select a genre"
                    value={this.state.genreList}
                    onChange={this.update}
                    selectionRenderer={this.selectionRenderer}>
                    {this.menuItems(genres)}
                </SelectField>
                <section style={styles.chipWrap}>
                    {blah}
                </section>
                <div className="row" style={{ textAlign: 'center'}}> 
                    <RaisedButton onClick={this.getRandom} label="Randomize" primary={true} />
                </div>
                <FilteredMovie genreMovie={this.state.genreMovie} />
            </div>
        )
    }
}
export default FilterMovie
import React from 'react';
import './App.css';
import MovieItem from './components/movieItem'
import MovieTabs from './components/MovieTabs'
import MoviePage from './components/MoviePage'
import { API_URL, API_KEY_3 } from './utils/Api'
import styled, { keyframes } from 'styled-components';
import { fadeInRightBig } from "react-animations"

const FadeInRightBig = styled.div`animation: 1.5s ${keyframes`${fadeInRightBig}`}`;

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      movieSData: [],
      willWatchData: [],
      sort_by: 'popularity.desc',
      page: 1,
      total_pages: 0
    }
  }

  componentDidMount() {
    this.getMovies()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by || prevState.page !== this.state.page) {
      this.getMovies()
    }
  }

  getMovies = () => {
    return fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({ movieSData: data.results, page: data.page, total_pages: data.total_pages })
    })
  }

  willWatchMovie = (data, item) => {
    let addWillWatchMovie = [...this.state.willWatchData]
    addWillWatchMovie.push(data)

    this.setState({ willWatchData: addWillWatchMovie })
  }

  removeMovieFrom_willWatch = (data, item) => {
    let updatesMovies = this.state.willWatchData.filter((item, index) => {
      return item.id !== data.id
    })

    this.setState({ willWatchData: updatesMovies })
  }

  removeMovie = (data, item) => {
    let updatesMovies = this.state.movieSData.filter((item, index) => {
      return item.id !== data.id
    })

    let updatesMoviesWillWatch = this.state.willWatchData.filter((item, index) => {
      return item.id !== data.id
    })

    this.setState({ movieSData: updatesMovies, willWatchData: updatesMoviesWillWatch })
  }

  updateSort_By = (value) => {
    this.setState({ sort_by: value, page: 1 })
  }

  update_Page = (value) => {
    let result_page = 0;
    if (value === 'prev') {
      if (this.state.page !== 1) {
        result_page = this.state.page - 1
        this.setState({ page: result_page })
      }
      else {
        return false
      }
    }
    if (value === 'next') {
      if (this.state.page !== 500) {
        result_page = this.state.page + 1
        this.setState({ page: result_page })
      }
      else {
        return false
      }
    }
  }

  render() {
    return (
      <React.StrictMode>
        <div className="col-12 container-fluid mb-4 row pt-4 pb-4 tabs-block">
          <MovieTabs sort_by={this.state.sort_by} updateSort_By={this.updateSort_By} />
        </div>
        <div className="col-12 container row">
          <div className="col-9 row">
            {this.state.movieSData.map((item, index) => {
              return <MovieItem moviesDataProps={item} key={item.id} willWatchMovie={this.willWatchMovie} removeMovieFrom_willWatch={this.removeMovieFrom_willWatch} removeMovie={this.removeMovie} />
            })}
          </div>
          <FadeInRightBig className="col-3">
            <p className="mt-4 border-bottom text-danger" style={{ fontSize: '18px' }}>Will Watch: {this.state.willWatchData.length}</p>
            {this.state.willWatchData.map((item, index) => {
              return (
                <div className="card mb-4" key={index}>
                  <img className="card-img-top card-img" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                  <div className="card-body">
                    <p className="card-title text-center card-header text-dark">{item.title}</p>
                    <p className="mt-2 text-center text-secondary">Rate: {item.vote_average}</p>
                  </div>
                </div>)
            })}
          </FadeInRightBig>
        </div>
        <div className="col-12 container-fluid mt-4 row pt-4 pb-4 movie-page">
          <MoviePage page={this.state.page} total_pages={this.state.total_pages} update_Page={this.update_Page} />
        </div>
      </React.StrictMode >
    )
  }
}

export default App;

import React from 'react'
import classNames from 'classnames'
import styled, { keyframes } from 'styled-components';
import { fadeIn } from "react-animations"

const FadeIn = styled.div`animation: 2s ${keyframes`${fadeIn}`}`;

class MovieItem extends React.Component {
    constructor() {
        super()

        this.state = {
            willWatch: false
        }
    }

    update_ClassName = () => {
        return classNames({
            'btn': true,
            'btn-light': !this.state.willWatch,
            'btn-success': this.state.willWatch
        })
    }

    update_WillWatch = (data) => {
        if (this.state.willWatch) {
            this.props.removeMovieFrom_willWatch(data)
        }
        if (!this.state.willWatch) {
            this.props.willWatchMovie(data)
        }
        this.setState({ willWatch: !this.state.willWatch })
    }

    update_Image = (value, item) => {
        if (value !== null) {
            return `https://image.tmdb.org/t/p/w500${value}`
        }
        else {
            return `not-found.png`
        }
    }

    render() {
        let moviesDataResult = { ...this.props.moviesDataProps }
        return (
            <FadeIn className='col-sm-12 col-md-12 col-lg-6 col-xl-4' >
                <div className="card m-2 bg-light">
                    <div className="card-body">
                        <img className='card-img-top card-img' src={this.update_Image(moviesDataResult.poster_path)} rel="nofollow" alt={moviesDataResult.title} />
                        <p className="card-header text-center text-dark card-title">{moviesDataResult.title}</p>
                        <div className="col-12 text-center"><p className="text-secondary mt-2">Rate: {moviesDataResult.vote_average}</p></div>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 text-center mt-2">
                                <button className="btn btn-dark" onClick={this.props.removeMovie.bind(this, moviesDataResult)}>Delete Movie</button>
                            </div>
                            <div className="col-sm-12 col-md-6 text-center mt-2">
                                <button className={this.update_ClassName()} onClick={this.update_WillWatch.bind(this, moviesDataResult)}>{this.state.willWatch ? 'Remove Will Watch' : 'Will Watch'}</button>
                            </div>
                        </div>
                    </div >
                </div >
            </FadeIn>
        )
    }
}

export default MovieItem
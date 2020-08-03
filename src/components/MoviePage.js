import React from 'react'

class MoviePage extends React.Component {
    constructor() {
        super()

        this.state = {}
    }
    render() {
        let { page, total_pages, update_Page } = this.props
        return (
            <div className="col-12 container text-center row">
                <div className="col-4 text-center-block text-hide">Current page: {page}</div>
                <div className="col-4 row container-fluid">
                    <button className="btn btn-danger col-2 text-center" onClick={update_Page.bind(this, 'prev')}>Prev</button>
                    <div className="col-4 text-center-block ml-2 mr-2"><span className="pr-1 text-danger" style={{ fontSize: '23px' }}>{page}</span><span className="pr-1" style={{ fontSize: '17px' }}>{page + 1}</span> <span className="pr-1" style={{ fontSize: '13px' }}> {page + 2} </span> <span className="pr-1" style={{ fontSize: '7px' }}> {page + 3} </span> <span className="pr-1" style={{ fontSize: '4px' }}> {page + 4} </span></div>
                    <button className="btn btn-danger col-2 text-center" onClick={update_Page.bind(this, 'next')}>Next</button>
                </div>
                <div className="col-4 text-center-block" style={{ justifyContent: 'flex-start' }}>Total pages: <span className="text-danger pl-2"> {total_pages}</span></div>
            </div>
        )
    }
}

export default MoviePage
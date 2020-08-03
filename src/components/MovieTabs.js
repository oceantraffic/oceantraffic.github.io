import React from 'react'
import classNames from 'classnames'

class MovieTabs extends React.Component {
    constructor() {
        super()

        this.state = {}
    }

    shouldComponentUpdate(prevProps, prevState) {
        if (this.props.sort_by !== prevProps.sort_by) {
            return true
        }
        else {
            return false
        }
    }

    render() {
        let { sort_by, updateSort_By } = this.props
        const getClass = (value) => {
            return classNames({
                'btn': true,
                'btn-success': value === sort_by
            })
        }
        return (
            <div className="col-sm-12 col-md-6 row">
                <div className="col-sm-4 col-md-3"><button className={getClass('popularity.desc')} onClick={updateSort_By.bind(this, 'popularity.desc')}>Popularity Desc</button></div>
                <div className="col-sm-4 col-md-3"><button className={getClass('revenue.desc')} onClick={updateSort_By.bind(this, 'revenue.desc')}>Revenue Desc</button></div>
                <div className="col-sm-4 col-md-4"><button className={getClass('vote_avarage.desc')} onClick={updateSort_By.bind(this, 'vote_avarage.desc')}>Vote Avarage Desc</button></div>
            </div>
        )
    }
}

export default MovieTabs
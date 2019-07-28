import React from 'react'
import axios from 'axios'
import Story from './Story'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'

class Stories extends React.Component {
    constructor() {
        super()

        this.state = { data: null, filterCategory: '', checked: null }
        this.handleChange = this.handleChange.bind(this)
    }

    getData() {
        axios.get('/api/stories', {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
            .then(res => this.setState({ data: res.data }))
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getData()
    }

    handleChange(e, n) {
        const category = e.target.value
        this.setState({ filterCategory: category, checked: n })
    }

    filterStories() {
        const regexp = new RegExp(this.state.filterCategory, 'i')
        return this.state.data.filter(story => regexp.test(story.category))
    }

    render() {
        return (
            <div className="stories-index">
                <div>
                    <h1 className="text-center">Hidden Stories</h1>
                    <div className="text-center">
                        <p>Watch with glittering eyes the whole world around you.</p>
                        <cite>- Ronald Dahl</cite>
                    </div>
                </div>
                {
                    !this.state.data &&
                    <img src='https://media2.giphy.com/media/mFHVvtrf1n3qm3pdvr/giphy.gif?cid=790b76115d25fc155230413373f1d5d2&rid=giphy.gif' />
                }
                {
                    this.state.data &&
                    <div>
                        <div className="stories-nav">
                            <Link to="/stories/new" className="float-right">💎 Post a Story</Link>
                            <div className="filter">
                                <input
                                    type="radio"
                                    id="tag-0"
                                    className="filter-tag"
                                    name="category"
                                    value=""
                                    onChange={(e) => {
                                        this.handleChange(e, 0)
                                    }
                                    }
                                    hidden />
                                <input
                                    type="radio"
                                    id="tag-1"
                                    className="filter-tag"
                                    name="category"
                                    value="Markets"
                                    onChange={(e) => {
                                        this.handleChange(e, 1)
                                    }
                                    }
                                    hidden />
                                <input
                                    type="radio"
                                    id="tag-2"
                                    className="filter-tag"
                                    name="category"
                                    value="Temples"
                                    onChange={(e) => {
                                        this.handleChange(e, 2)
                                    }
                                    }
                                    hidden />
                                <input
                                    type="radio"
                                    id="tag-3"
                                    className="filter-tag"
                                    name="category"
                                    value="Beaches"
                                    onChange={(e) => {
                                        this.handleChange(e, 3)
                                    }
                                    }
                                    hidden />
                                <input
                                    type="radio"
                                    id="tag-4"
                                    className="filter-tag"
                                    name="category"
                                    value="Landscapes"
                                    onChange={(e) => {
                                        this.handleChange(e, 4)
                                    }
                                    }
                                    hidden
                                />
                                <div className="filter-nav">
                                    <label
                                        className={`chip ${this.state.checked === 0 ? 'bg-warning' : ''}`}
                                        htmlFor="tag-0">
                                        All
                  </label>
                                    <label
                                        className={`chip ${this.state.checked === 1 ? 'bg-warning' : ''}`}
                                        htmlFor="tag-1">
                                        Markets
                  </label>
                                    <label
                                        className={`chip ${this.state.checked === 2 ? 'bg-warning' : ''}`}
                                        htmlFor="tag-2">
                                        Temples
                  </label>
                                    <label
                                        className={`chip ${this.state.checked === 3 ? 'bg-warning' : ''}`}
                                        htmlFor="tag-3">
                                        Beaches
                  </label>
                                    <label
                                        className={`chip ${this.state.checked === 4 ? 'bg-warning' : ''}`}
                                        htmlFor="tag-4">
                                        Landscapes
                  </label>
                                </div>
                            </div>
                        </div>
                        <div className='columns stories-background multiline is-mobile'>
                            {
                                this.filterStories().map(story => {
                                    return <Story key={story._id} {...story} />
                                })
                            }
                        </div>
                    </div>

                }

            </div>
        )
    }
}

export default Stories

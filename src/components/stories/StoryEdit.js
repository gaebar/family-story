import React, { Fragment } from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class StoryEdit extends React.Component {
    constructor() {
        super()

        this.state = { story: {}, errors: null }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        axios.get(`/api/stories/${this.props.match.params.storyId}`, {
            headers: { 'Authorization': `${Auth.getToken()}` }
        })
            .then(res => this.setState({ story: res.data }))
            .catch(err => this.setState({ errors: err.response.data.errors }))
    }

    handleChange({ target: { name, value } }) {
        const story = { ...this.state.story, [name]: value }
        this.setState({ story })
    }

    handleSubmit(e) {
        e.preventDefault()

        axios.put(`/api/stories/${this.props.match.params.storyId}`, this.state.data, {
            headers: { 'Authorization': `${Auth.getToken()}` }
        })
            .then(() => this.props.history.push('/stories'))
            .catch(err => this.setState({ errors: err.response.data.errors }))
    }

    render() {
        if (!this.state.story) return null
        const { story } = this.state
        return (
            <section className="section">
                <div className="container story-edit">
                    <Fragment>
                        <h2 className="title">{story.name}</h2>
                        <div className="columns">
                            <div className="col-6">
                                <img src={story.image} alt={story.name} className="img-responsive" />
                            </div>
                            <div className="col-6">
                                <form onSubmit={this.handleSubmit} className="form-autocomplete">
                                    <h2 className="title text-center">Location</h2>
                                    <input
                                        className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                                        name="location"
                                        value={story.location || ''}
                                        placeholder="where is this?"
                                        onChange={this.handleChange}
                                    />
                                    {this.state.errors && <small className="help is-danger">{this.state.errors.location}</small>}

                                    <h2 className="title text-center">Caption</h2>
                                    <textarea
                                        className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                                        name="caption"
                                        value={story.caption || ''}
                                        rows="5"
                                        placeholder="caption here"
                                        onChange={this.handleChange}
                                    />
                                    {this.state.errors && <small className="help is-danger">{this.state.errors.caption}</small>}

                                    <h2 className="title text-center">Category</h2>

                                    <div className="form-group">
                                        <select
                                            className={`form-select ${this.state.errors ? 'is-error' : ''} `}
                                            name="category"
                                            value={story.category || ''}
                                            onChange={this.handleChange}
                                        >
                                            <option>Choose an option</option>
                                            <option>Markets</option>
                                            <option>Temples</option>                      <option>Beaches</option>
                                            <option>Landscapes</option>
                                            <option>Others</option>
                                        </select>
                                    </div>
                                    {this.state.errors && <small className="help is-danger">{this.state.errors.category}</small>}
                                    <br />
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary input-group-btn input-sm storyeditsubmit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Fragment>
                </div>
            </section>
        )
    }
}

export default StoryEdit

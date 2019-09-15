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
        axios.put(`/api/stories/${this.props.match.params.storyId}`, this.state.story, {
            headers: { 'Authorization': `${Auth.getToken()}` }
        }).then(() => this.props.history.push('/stories'))
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
                            <div className="column is-half">
                                <figure className="image">
                                    <img className="storyshowimage" src={story.image_url} alt={story.name} />
                                </figure>
                            </div>
                            <div className="column is-half">
                                <form onSubmit={this.handleSubmit} className="form-autocomplete">
                                    <label className="form-label" htmlFor="caption">Title</label>
                                    <input
                                        className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                                        name="title"
                                        placeholder="Title"
                                        onChange={this.handleChange}
                                        value={story.title}
                                    />
                                    {this.state.errors && <small className="help text-error">{this.state.errors.title}</small>}

                                    <label className="form-label" htmlFor="description">Description</label>
                                    <textarea
                                        className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                                        rows="3"
                                        name="description"
                                        placeholder="Description"
                                        onChange={this.handleChange}
                                        value={story.description}
                                    />
                                    {this.state.errors && <small className="help text-error">{this.state.errors.description}</small>}

                                    <label className="form-label" htmlFor="content">Content</label>
                                    <textarea
                                        className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                                        rows="5"
                                        name="content"
                                        placeholder="Content"
                                        onChange={this.handleChange}
                                        value={story.content}
                                    />
                                    {this.state.errors && <small className="help text-error">{this.state.errors.description}</small>}

                                    <label className="form-label" htmlFor="image_url">Image URL</label>
                                    <input
                                        className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                                        name="image_url"
                                        placeholder="Image URL"
                                        onChange={this.handleChange}
                                        value={story.image_url}
                                    />

                                    {this.state.errors && <small className="help text-error">{this.state.errors.image_url}</small>}

                                    <button type="submit" className="btn btn-primary input-group-btn input-sm">Submit</button>
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

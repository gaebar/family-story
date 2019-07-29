import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class StoryCreate extends React.Component {
    constructor() {
        super()

        this.state = { data: {}, errors: null }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange({ target: { name, value } }) {
        const data = { ...this.state.data, [name]: value }
        this.setState({ data })
    }

    handleSubmit(e) {
        e.preventDefault()

        axios.post('/api/stories', this.state.data, {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
            .then(() => this.props.history.push('/stories'))
            .catch(err => this.setState({ errors: err.response.data }))
    }

    render() {
        return (

            <section className="section registersection">

                <div className="columns">
                    <div className="col-4"></div>
                    <div className="col-3 registercolumn">

                        <div>

                            <div className="chatsheader text-center">
                                <h1>Post Your Story</h1>
                            </div>
                            <form onSubmit={this.handleSubmit} className="form-autocomplete">

                                <label className="form-label" htmlFor="caption">Title</label>
                                <input
                                    className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                                    name="title"
                                    placeholder="title"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors && <small className="help text-error">{this.state.errors.title}</small>}

                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea
                                    className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                                    rows="3"
                                    name="description"
                                    placeholder="Description"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors && <small className="help text-error">{this.state.errors.description}</small>}

                                <label className="form-label" htmlFor="content">Content</label>
                                <textarea
                                    className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                                    rows="5"
                                    name="content"
                                    placeholder="Content"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors && <small className="help text-error">{this.state.errors.description}</small>}

                                <label className="form-label" htmlFor="image_url">Image URL</label>
                                <input
                                    className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                                    name="image_url"
                                    placeholder="Image URL"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors && <small className="help text-error">{this.state.errors.image_url}</small>}

                                <button type="submit" className="btn btn-primary input-group-btn input-sm">Submit</button>
                            </form>
                        </div>

                    </div>
                    <div className="col-4"></div>
                </div>

            </section>

        )
    }
}

export default StoryCreate


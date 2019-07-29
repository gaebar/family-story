import React from 'react'
import axios from 'axios'

class Register extends React.Component {
    constructor() {
        super()

        this.state = {
            data: {},
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange({ target: { name, value } }) {
        const data = { ...this.state.data, [name]: value }
        const errors = { ...this.state.errors, [name]: '' }
        this.setState({ data, errors })
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post('/api/register', this.state.data)
            .then(() => {
                // debugger
                // Flash.setMessage('success', 'Registration Complete')
                this.props.history.push('/profile')
            })
            .catch(err => {
                this.setState({ errors: err.response.data })
            })
    }

    // REGISTRATION FORM
    render() {
        return (
            <section className="section registersection">
                <div className="columns">
                    <div className="col-4"></div>
                    <div className="col-3 registercolumn">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group text-center">
                                <h2 className="title">Sign Up</h2>
                                <input
                                    className={`form-input input-sm ${this.state.errors.username ? 'is-error' : ''} `}
                                    name="username"
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors && <small className="help is-danger">{this.state.errors.username}</small>}

                                <input
                                    className={`form-input input-sm ${this.state.errors.email ? 'is-error' : ''} `}
                                    name="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors && <small className="help is-danger">{this.state.errors.email}</small>}

                                <input
                                    className={`form-input input-sm ${this.state.errors.password ? 'is-error' : ''} `}
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors && <small className="help is-danger">{this.state.errors.password}</small>}

                                <input
                                    className={`form-input input-sm ${this.state.errors.passwordConfirmation ? 'is-error' : ''} `}
                                    name="password_confirmation"
                                    placeholder="Password Confirmation"
                                    type="password"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
                                <label className="form-label" htmlFor="image_url">Your Details</label>
                                <input
                                    className={`form-input input-sm ${this.state.errors.image_url ? 'is-error' : ''} `}
                                    name="image_url"
                                    placeholder="Link to profile picture"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors && <small className="help is-danger">{this.state.errors.image_url}</small>}
                                <div className="form-group">

                                    <textarea
                                        className={`form-input ${this.state.errors.bio ? 'is-error' : ''} `}
                                        placeholder="Tell Us About Yourself"
                                        rows="3"
                                        name="bio"
                                        onChange={this.handleChange}>
                                    </textarea>
                                    {this.state.errors && <small className="help is-danger">{this.state.errors.bio}</small>}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary input-group-btn input-sm submitbutton">Submit</button>
                        </form>
                    </div>
                    <div className="col-4"></div>
                </div>
            </section >
        )
    }
}

export default Register

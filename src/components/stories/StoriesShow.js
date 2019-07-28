import React, { Fragment } from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import { MdClear } from 'react-icons/md'
import { TiPencil } from 'react-icons/ti'

class StoriesShow extends React.Component {
    constructor() {
        super()

        this.state = { story: null, comment: {}, user: {} }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCommentDelete = this.handleCommentDelete.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.addLike = this.addLike.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        axios.get(`/api/stories/${this.props.match.params.storyId}`, {
            headers: { 'Authorization': `${Auth.getToken()}` }
        })
            .then(res => this.setState({ story: res.data, comment: {} }))
            .catch(err => console.log(err))
    }

    addLike() {
        axios.get(`/api/stories/${this.props.match.params.storyId}/likes`, {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
            .then(() => this.getData())
            .catch(err => console.log(err))
    }

    handleChange(e) {
        this.setState({ comment: { text: e.target.value } })
    }


    handleSubmit(e) {
        e.preventDefault()

        axios.post(`/api/stories/${this.props.match.params.storyId}/comments`, this.state.comment, {
            headers: { 'Authorization': `${Auth.getToken()}` }
        })
            .then(() => this.getData())
            .catch(err => console.log(err))
    }

    isOwnerComment(comment) {
        return Auth.getPayload().sub === comment.user._id
    }
    isOwner() {
        return Auth.getPayload().sub === this.state.story.user._id
    }

    handleCommentDelete(comment) {
        axios.delete(`/api/stories/${this.props.match.params.storyId}/comments/${comment._id}`, {
            headers: { 'Authorization': Auth.getToken() }
        })
            .then(() => this.getData())
            .catch(err => console.log(err))
    }

    handleDelete() {
        axios.delete(`/api/stories/${this.props.match.params.storyId}`, {
            headers: { 'Authorization': Auth.getToken() }
        })
            .then(() => this.props.history.push('/stories'))
            .catch(err => console.log(err))
    }

    render() {
        if (!this.state.story) return null
        const { story } = this.state
        return (
            <section className="section storieshow">
                <div className="container">
                    <Fragment>
                        <h2 className="title">{story.name}</h2>
                        <div className="columns">
                            <div className="column is-half">
                                <figure className="image">
                                    <img className="storieshowimage" src={story.image} alt={story.name} />
                                </figure>
                            </div>
                            <div className="column is-half">
                                <div className="columns">
                                    <div className="col-6">
                                        <h4>{story.location}</h4>
                                    </div>
                                    <div className="col-3">
                                        <div className="chip">{story.category}</div>
                                    </div>
                                </div>
                                <div className="columns">
                                    <p className="text-normal">Posted by <Link to={`/users/${story.user._id}`} >{story.user.username}</Link></p>
                                    {this.isOwner() && <Link
                                        className="btn btn-link btn-sm"
                                        to={`/stories/${this.props.match.params.storyId}/edit`}
                                    >
                                        <TiPencil />
                                    </Link>
                                    }
                                    {this.isOwner() &&
                                        <button onClick={this.handleDelete} className="btn btn-link btn-sm">
                                            <MdClear />
                                        </button>
                                    }
                                </div>
                                <div className='story-likes'>
                                    <button className="btn btn-link btn-lg" onClick={this.addLike} >💎</button>
                                    <p className="text-bold">{story.likes.length} likes</p>
                                </div>
                                <p>{story.caption}</p>
                                <hr />
                                {story.comments.map(comment => (
                                    <div key={comment._id} className="story-comment">
                                        <div className="text text-bold">
                                            {comment.text}
                                        </div>
                                        <div className="user-comment">
                                            <Link to={`/users/${comment.user._id}`} >{comment.user.username} </Link>
                                            {<small>{new Date(comment.createdAt).toLocaleString().slice(0, 17)}  </small>}
                                            {
                                                this.isOwnerComment(comment) &&
                                                <button className="btn btn-link btn-sm" onClick={() => this.handleCommentDelete(comment)}><MdClear /></button>

                                            }
                                        </div>
                                    </div>
                                ))}

                                {Auth.isAuthenticated() &&
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="field">
                                            <div className="control">
                                                <textarea
                                                    className="form-input"
                                                    placeholder="What do you think?"
                                                    rows="2"
                                                    onChange={this.handleChange}
                                                    value={this.state.comment.text || ''}
                                                >
                                                </textarea>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-sm" type="submit">Comment</button>
                                    </form>}

                                <Link to="/stories" className="float-right">Find More Stories</Link>
                            </div>
                        </div>
                    </Fragment>
                </div>
            </section>
        )
    }
}

export default StoriesShow

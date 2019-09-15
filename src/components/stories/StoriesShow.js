import React, { Fragment } from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import { MdClear } from 'react-icons/md'

class StoriesShow extends React.Component {
    constructor() {
        super()

        this.state = { story: null, creator: {}, user: {}, isStoryOwner: false }

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        axios.get(`/api/stories/${this.props.match.params.storyId}`, {
            headers: { 'Authorization': `${Auth.getToken()}` }
        })
            .then(res => {
                this.setState({ story: res.data })
                Auth.isAuthenticated() && this.getUserData()
                return
            })
            .catch(err => console.log(err))
    }

    getUserData() {
        axios.get('/api/profile', {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
            .then(res => {
                const creatorID = this.state.story.creator.id
                const isStoryOwner = creatorID === res.data.id

                return this.setState({ user: res.data, isStoryOwner: res.data.id === this.state.story.creator.id });
            })
            .catch(err => console.log(err))
    }

    addLike() {
        axios.get(`/api/stories/${this.props.match.params.storyId}/likes`, {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
            .then(() => this.getData())
            .catch(err => console.log(err))
    }

    handleDelete() {
        if (window.confirm("Do you really want to delete this story?")) {
            axios.delete(`/api/stories/${this.props.match.params.storyId}`, {
                headers: { 'Authorization': Auth.getToken() }
            })
                .then(() => this.props.history.push('/stories'))
                .catch(err => console.log(err))
        }
    }

    render() {
        if (!this.state.story) return null
        const { story } = this.state
        return (
            <section className="section storyshow">
                <div className="container">
                    <Fragment>
                        <h2 className="title">{story.name}</h2>
                        <div className="columns">
                            <div className="column is-half">
                                <figure className="image">
                                    <img className="storyshowimage" src={story.image_url} alt={story.name} />
                                </figure>
                            </div>
                            <div className="column is-half">
                                <div className="columns">
                                    <div className="col-6">
                                        <h4>{story.title}</h4>
                                    </div>
                                </div>

                                <div className="columns">
                                    <p className="text-normal">{story.description}</p>
                                </div>

                                {this.state.isStoryOwner &&
                                    <div>
                                        <div className="columns">
                                            <p className="text-normal"> {this.state.isStoryOwner && <Link to={`/stories/${story.id}/edit`} className="">Edit</Link>} or
                                             <Link to='#' onClick={this.handleDelete} className="">Delete</Link> this story</p>
                                        </div>
                                    </div>
                                }

                                <hr />

                                <div className="columns">
                                    <p className="text-normal">{story.content}</p>
                                </div>

                                <div className="columns">
                                    <p className="text-normal">by <Link to="#" >{story.creator.username}</Link></p>
                                </div>

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

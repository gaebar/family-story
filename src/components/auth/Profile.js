import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
    constructor() {
        super()

        this.state = { user: null, stories: [] }
    }

    getUserStories() {
        axios.get('/api/stories', {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
            .then(res => {
                const userStories = res.data.filter(story => story.user._id === this.state.user._id)
                const likedStories = res.data.filter(story => {
                    const array = story.likes.filter(like => like.user === this.state.user._id)
                    return array[0]
                })
                return this.setState({ stories: userStories, likedStories: likedStories })
            })
            .catch(err => console.log(err))
    }

    getUserData() {
        axios.get('/api/profile', {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
            .then(res => this.setState({ user: res.data }))
            .then(() => this.getUserStories())
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getUserData()
    }

    render() {
        return (
            <div>
                {
                    !this.state.user &&
                    <img src='https://media2.giphy.com/media/mFHVvtrf1n3qm3pdvr/giphy.gif?cid=790b76115d25fc155230413373f1d5d2&rid=giphy.gif' />
                }
                {
                    this.state.user &&
                    <div className='user-page'>
                        <div className="columns user-header">
                            <div className="column col-5">
                                <img src={this.state.user.image} className="profile-pic" />
                            </div>
                            <div className="column col-7">
                                <h2>{this.state.user.username} {this.state.user.userType === 'Tourist' ? <span>✈️ </span> : <span>🇻🇳 </span>}</h2>
                                <br />
                                <p>{this.state.user.text}</p>
                                <div className='user-info'>
                                    <div className="popover popover-bottom"><a className="followers-btn" href="#popovers">{this.state.user.followers.length} Followers</a>
                                        <div className="popover-container">
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="card-title h5">Followers</div>
                                                    <div className="card-subtitle text-gray">Check out who follows you </div>
                                                </div>
                                                <div className="card-body">
                                                    {
                                                        this.state.user.followers.map(follower => {
                                                            return <div key={follower.user._id} className="tile">
                                                                <Link to={`/users/${follower.user._id}`}>
                                                                    <div className="tile-icon">
                                                                        <figure className="avatar"><img src={follower.user.image} alt="Avatar" />
                                                                            <p className="tile-title text-bold">{follower.user.username}</p>
                                                                        </figure>
                                                                    </div>
                                                                    <div className="tile-content">

                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.stories.length > 0 &&
                                        <p>
                                            <span> 💎  {this.state.stories.length} </span>
                                            {
                                                this.state.stories.length > 1 ? 'Stories' : 'Story'
                                            }
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <hr className="divider" />
                            <div className="columns col-oneline profile-nav">
                                <div className="column col-5">
                                    <Link to="/stories">Hidden stories</Link>
                                </div>
                                <div className="divider text-center col-2" data-content="OR"></div>
                                <div className="column col-5">
                                    <Link to="/chats">Join a chat</Link>
                                </div>
                            </div>
                        </div>
                        <div className='user-stories'>
                            {
                                this.state.stories.length === 0 && this.state.likedStories.length === 0 &&
                                <div className="empty">
                                    <div className="empty-icon">
                                        <i className="icon icon-people"></i>
                                    </div>
                                    <p className="empty-title h5">Nothing to see here</p>
                                    <p className="empty-subtitle">Looks like you have not posted or liked a hidden story yet</p>
                                    <p className="empty-subtitle">No worries, check out other hidden stories here:</p>
                                    <div className="empty-action">
                                        <Link className="btn btn-primary" to="/stories"> 💎 </Link>
                                    </div>
                                </div>
                            }
                            {
                                this.state.stories.length > 0 &&
                                <div>
                                    <h3>Your hidden stories:</h3>
                                    <div className='stories-list'>
                                        {
                                            this.state.stories.map(story => {
                                                return <Link to={`/stories/${story._id}`} key={story._id}><img src={story.image} /></Link>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                            {
                                this.state.likedStories.length > 0 &&
                                <div>
                                    <h3>Hidden stories you liked:</h3>
                                    <div className='stories-list'>
                                        {
                                            this.state.likedStories.map(story => {
                                                return <Link to={`/stories/${story._id}`} key={story._id}><img src={story.image} /></Link>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Profile

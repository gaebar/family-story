import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
    constructor() {
        super()

        this.state = { creator: null, stories: [] }
    }

    getUserStories() {
        axios.get('/api/stories', {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
            .then(res => {
                const userStories = res.data.filter(story => story.creator.id === this.state.creator.id)
                return this.setState({ stories: userStories })
            })
            .catch(err => console.log(err))
    }

    getUserData() {
        axios.get('/api/profile', {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
            .then(res => this.setState({ creator: res.data }))
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
                    this.state.creator &&
                    <div className='user-page'>
                        <div className="columns user-header">
                            <div className="column col-5">
                                <img src={this.state.creator.image_url} className="profile-pic" />
                            </div>
                            <div className="column col-7">
                                <h2>{this.state.creator.username}</h2>
                                <br />
                                <p>{this.state.creator.bio}</p>
                            </div>
                        </div>

                    </div >
                }

                <div className='user-stories'>
                    {
                        this.state.stories.length === 0 &&
                        <div className="empty">
                            <div className="empty-icon">
                                <i className="icon icon-people"></i>
                            </div>
                            <p className="empty-title h5">No stories yet</p>
                            <p className="empty-subtitle">Looks like you have not posted any story yet</p>
                            <div className="empty-action">
                                <Link className="btn btn-primary" to="/stories"> ✏️ </Link>
                            </div>
                        </div>
                    }
                    {
                        this.state.stories.length > 0 &&
                        <div>
                            <h3>Your Stories:</h3>
                            <div className='stories-list'>
                                {
                                    this.state.stories.map(story => {
                                        return <Link to={`/stories/${story.id}`} key={story.id}>
                                            <figure>
                                                <img src={story.image_url}
                                                    alt={story.title} />
                                                <figcaption>{story.title}</figcaption>
                                            </figure>
                                        </Link>
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div >
        )
    }
}

export default Profile


{/* <div className='user-info'>
                                    <div className="popover popover-bottom"><a className="followers-btn" href="#popovers">{this.state.creator.followers.length} Followers</a>
                                        <div className="popover-container">
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="card-title h5">Followers</div>
                                                    <div className="card-subtitle text-gray">Check out who follows you </div>
                                                </div>
                                                <div className="card-body"> */}
{/* {
                                                        this.state.creator.followers.map(follower => {
                                                            return <div key={follower.creator._id} className="tile">
                                                                <Link to={`/users/${follower.creator._id}`}>
                                                                    <div className="tile-icon">
                                                                        <figure className="avatar"><img src={follower.creator.image} alt="Avatar" />
                                                                            <p className="tile-title text-bold">{follower.creator.username}</p>
                                                                        </figure>
                                                                    </div>
                                                                    <div className="tile-content">

                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        }) */}
{/* } */ }
{/* </div>
                        </div>
                    </div> */}
{/* // </div> */ }
{/* {
                                        this.state.stories.length > 0 &&
                                        <p>
                                            <span> ✏️ {this.state.stories.length} </span>
                                            {
                                                this.state.stories.length > 1 ? 'Stories' : 'Story'
                                            }
                                        </p>
                                    } */}
{/* // </div>
                            // </div > 
                        //             </div >


                        <div>
                            <hr className="divider" />
                            <div className="columns col-oneline profile-nav">
                                <div className="column col-5">
                                    <Link to="/stories">Read Family Stories</Link>
                                </div>
                                <div className="divider text-center col-2" data-content="OR"></div>
                                <div className="column col-5">
                                    <Link to="/new">Write Your Story</Link>
                                </div>
                            </div>
                        </div>


                        {/* <div className='user-stories'>
                            {
                                this.state.stories.length === 0 && this.state.likedStories.length === 0 &&
                                <div className="empty">
                                    <div className="empty-icon">
                                        <i className="icon icon-people"></i>
                                    </div>
                                    <p className="empty-title h5">Nothing to see here</p>
                                    <p className="empty-subtitle">Looks like you have not posted or liked a family story yet</p>
                                    <p className="empty-subtitle">No worries, check out other family stories here:</p>
                                    <div className="empty-action">
                                        <Link className="btn btn-primary" to="/stories"> ✏️ </Link>
                                    </div>
                                </div> */}
// }
{/* {
                                this.state.stories.length > 0 &&
                                <div>
                                    <h3>Your family stories:</h3>
                                    <div className='stories-list'>
                                        {
                                            this.state.stories.map(story => {
                                                return <Link to={`/stories/${story._id}`} key={story._id}><img src={story.image} /></Link>
                                            })
                                        }
                                    </div>
                                </div>
                            } */}
{/* {
                                this.state.likedStories.length > 0 &&
                                <div> */}
{/* <h3>Family stories you liked:</h3> */ }
{/* <div className='stories-list'> */ }
{/* {
                                            this.state.likedStories.map(story => {
                                                return <Link to={`/stories/${story._id}`} key={story._id}><img src={story.image} /></Link>
                                            })
                                        } */}
{/* </div> */ }
{/* </div> */ }
// }
{/* </div> */ }
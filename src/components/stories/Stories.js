import React from 'react'
import axios from 'axios'
import Story from './Story'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'

class Stories extends React.Component {
    constructor() {
        super()

        this.state = { stories: null }
    }

    getData() {
        axios.get('/api/stories', {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
            .then(res => this.setState({ stories: res.data }))
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div className="stories-index">
                <div>
                    <h1 className="text-center">Family Stories</h1>
                    {/* <div className="text-center">
                        <p>Watch with glittering eyes the whole world around you.</p>
                        <cite>- Ronald Dahl</cite>
                    </div> */}
                </div>
                {/* {
                    !this.state.data &&
                    <img src='https://media2.giphy.com/media/mFHVvtrf1n3qm3pdvr/giphy.gif?cid=790b76115d25fc155230413373f1d5d2&rid=giphy.gif' />
                } */}
                {
                    this.state.stories &&
                    <div>
                        <div className="stories-nav">
                            <Link to="/stories/new" className="float-right"> Write a Story</Link>
                        </div>
                        <div className='columns gems-background multiline is-mobile'>
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
        )
    }
}

export default Stories

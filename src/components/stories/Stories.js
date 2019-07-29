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
                </div>
                {
                    this.state.stories &&
                    <div>
                        <div className="stories-nav">
                            <div className="columns text-center">
                                <div className="column col-4 col-mx-auto">
                                    <div className="bg-secondary text-primary docs-block"> <Link to="/stories/new"> Write a Story</Link></div>
                                </div>
                            </div>
                        </div>
                        <div className='columns stories-background multiline is-mobile'>
                            {
                                this.state.stories.map(story => {
                                    return <Story key={story.id} {...story} />
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

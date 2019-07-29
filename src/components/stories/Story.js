import React from 'react'
import { Link } from 'react-router-dom'

const Story = ({ image_url, creator, _id }) => {
    return (
        <div className="column col-3 col-lg-6 col-sm-12 gem-card">

            <div className="card story-card">
                <Link to={`/stories/${story.id}`} key={story.id}>
                    <figure>
                        <img src={image_url}
                            alt={title} />
                        <figcaption>{title}</figcaption>
                    </figure>
                </Link>
            </div>
        </div>
    )
}

export default Story

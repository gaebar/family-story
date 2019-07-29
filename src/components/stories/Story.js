import React from 'react'
import { Link } from 'react-router-dom'

const Story = ({ image_url, title, description, creator, _id }) => {
    return (
        <div className="column col-3 col-lg-6 col-sm-12 story-card">

            <div className="card story-card">
                <Link to={`/stories/${_id}`} key={_id}>
                    <div className="card-image">
                        <img src={image_url} className="img-responsive" />
                    </div>
                    <div className="card-header">
                        <div className="card-title h5">{title}</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Story

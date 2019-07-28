import React from 'react'
import { Link } from 'react-router-dom'

const Story = ({ creator, id, image_url }) => {
    return (
        <div className="column col-3 col-lg-6 col-sm-12 story-card">

            <div className="card story-card">
                <Link to={`/stories/${id}`} >
                    <div className="card-image">
                        <img src={image_url} className="img-responsive" />
                    </div>
                    <div className="card-header">
                        <div className="card-title h5">{location}</div>
                    </div>
                </Link>
                <div className="card-body">
                    <div className="card-subtitle text-gray">
                        <div className="chip">
                            <Link to={`/users/${creator.id}`} aria-label="Close" role="button">
                                <img src={creator.image_url} className="avatar avatar-sm" />
                                {creator.username}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Story
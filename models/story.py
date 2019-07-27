from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema
# pylint: disable=W0611
from .user import User
# from .comment import Comment, CommentSchema


class Story(db.Model, BaseModel):

    __tablename__ = 'stories'

    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(120), nullable=True)
    content = db.Column(db.Text, nullable=False)
    genre = db.Column(db.String(40), nullable=True)
    finished = db.Column(db.Boolean, default=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    creator = db.relationship('User', backref='stories_written')


class StorySchema(ma.ModelSchema, BaseSchema):
    creator = fields.Nested('UserSchema', exclude=('stories_written', ))
    comments = fields.Nested('CommentSchema', many=True, exclude=(
        'story', 'user.stories_written', 'user.user_comment'))

    class Meta:
        model = Story

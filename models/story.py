from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema
# pylint: disable=W0611
from .user import User


class Story(db.Model, BaseModel):

    __tablename__ = 'stories'

    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    creator = db.relationship('User', backref='stories_written')
    image_url = db.Column(db.String(256), nullable=False)


class StorySchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = Story

    creator = fields.Nested('UserSchema', only=(
        'id', 'username'), exclude=('stories_written'))

    title = fields.String(required=True)
    description = fields.String(required=True)
    content = fields.String(required=True)
    image_url = fields.String(required=True)

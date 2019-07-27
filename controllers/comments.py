from flask import Blueprint, request, jsonify, g
from models.story import Story, StorySchema
from lib.secure_route import secure_route
from models.comment import Comment, CommentSchema
from models.user import User, UserSchema

api = Blueprint('comments', __name__)

from flask import Blueprint, jsonify, request, g
from models.story import Story, StorySchema
from models.user import UserSchema
from models.comment import CommentSchema, Comment
from lib.secure_route import secure_route
from lib.helpers import is_unique

api = Blueprint('stories', __name__)
story_schema = StorySchema()
comment_schema = CommentSchema()


# ================= *** STORY *** =================

# === INDEX ===
@api.route('/stories', methods=['GET'])
def index():
    stories = Story.query.all()
    return story_schema.jsonify(stories, many=True), 200


# === SHOW (story_id) ===
@api.route('/stories/<int:story_id>', methods=['GET'])
def show(story_id):
    story = Story.query.get(story_id)
    if not story:
        return jsonify({'message': 'not found'}), 404
    return story_schema.jsonify(story), 200


# == CREATE A NEW STORY ===
@api.route('/stories', methods=['POST'])
@secure_route
def create():
    data = request.get_json()
    story, errors = story_schema.load(data)

    if errors:
        return jsonify(errors), 422

    story.creator = g.current_user
    story.save()
    return story_schema.jsonify(story), 201


# == EDIT / UPDATE A STORY ===
@api.route('/stories/<int:story_id>', methods=['PUT'])
@secure_route
def update(story_id):
    story = Story.query.get(story_id)
    if not story:
        return jsonify({'message': 'Not Found'}), 404
    if story.creator != g.current_user:
        return jsonify({'message': 'Unauthorized'})
    data = request.get_json()
    errors = {}
    if not is_unique(model=Story, key='name', value=data.get('name')):
        errors['name'] = errors.get('name', []) + ['Story name already taken']
        return jsonify(errors), 422

    story, errors = story_schema.load(data, instance=story, partial=True)
    if errors:
        return jsonify(errors), 422
    story.save()
    return story_schema.jsonify(story), 202

# === DELETE A STORY ===
@api.route('/stories/<int:story_id>', methods=['DELETE'])
@secure_route
def delete(story_id):
    story = Story.query.get(story_id)
    if not story:
        return jsonify({'message': 'Not Found'}), 404
    if story.creator != g.current_user:
        return jsonify({'message': 'Unauthorized'})
    story.remove()
    return '', 204


@api.route('/save/<int:story_id>', methods=['POST'])
@secure_route
def save_story(story_id):
    story = Story.query.get(story_id)

    user = g.current_user
    user.read_list.append(story)

    user.save()

    return user_schema.jsonify(user), 201

# ================= *** COMMENT *** ======================


# === CREATE A COMMENT ===

@api.route('/stories/<int:story_id>/comments', methods=['POST'])
def comment_create(story_id):
    story = Story.query.get(story_id)
    if not story:
        return jsonify({'message': 'Not Found'}), 404
    data = request.get_json()
    comment, errors = comment_schema.load(data)
    if errors:
        return jsonify(errors), 422
    comment.story = story
    comment.save()
    return comment_schema.jsonify(comment), 202

# === DELETE COMMENT ===


@api.route('/stories/<int:story_id>/comments/<int:comment_id>', methods=['DELETE'])
def comment_delete(**kwargs):
    comment = Comment.query.get(kwargs['comment_id'])
    if not comment:
        return jsonify({'message': 'Not Found'}), 404
    comment.remove()
    return '', 204

# === EDIT COMMENT ===


@api.route('/stories/<int:story_id>/comments/<int:comment_id>', methods=['PUT'])
@secure_route
def update_comment(story_id, comment_id):

    comment = Comment.query.get(comment_id)
    comment, errors = comment_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422

    comment.story = Story.query.get(story_id)
    comment.user = g.current_user

    comment.save()

    return comment_schema.jsonify(comment)

from app import app
from controllers import stories, auth

app.register_blueprint(stories.api, url_prefix='/api')
app.register_blueprint(auth.api, url_prefix='/api')
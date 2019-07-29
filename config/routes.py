from app import app
from controllers import stories, auth
import os

app.register_blueprint(stories.api, url_prefix='/api')
app.register_blueprint(auth.api, url_prefix='/api')


@app.route('/', defaults={'path': ''})  # homepage
@app.route('/<path:path>')  # any other path
def catch_all(path):

    if os.path.isfile('dist/' + path):  # if path is a file, send it back
        return app.send_static_file(path)

    # otherwise send back the index.html file
    return app.send_static_file('index.html')

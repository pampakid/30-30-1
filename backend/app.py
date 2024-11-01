from flask import Flask
from flask_cors import CORS
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize CORS
    CORS(app)

    # Register blueprints 
    from routes.hello import bp as hello_bp
    app.register_blueprint(hello_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
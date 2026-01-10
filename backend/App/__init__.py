from flask import Flask
from App.config import Config
from App.extensions import db, cors, migrate
from App.controllers.user_controller import user_bp
from App.controllers.auth_controller import auth_bp
from App.controllers.location_controller import location_bp
from App.controllers.resident_controller import resident_bp
from App.controllers.type_service_controller import type_service_bp
from App.controllers.service_controller import service_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    cors.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(location_bp)
    app.register_blueprint(resident_bp)
    app.register_blueprint(type_service_bp)
    app.register_blueprint(service_bp)

    return app
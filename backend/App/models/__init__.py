from App.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
from geoalchemy2 import Geography
from geoalchemy2.shape import to_shape

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.String(14), unique=True, nullable=False)
    login = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(70), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    access_level = db.Column(db.Integer(), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "public_id": self.public_id,
            "name": self.name,
            "cpf": self.cpf,
            "login": self.login,
            "email": self.email,
        }

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True, nullable=False)
    position = db.Column(
        Geography(geometry_type='POINT', srid=4326),
        nullable=False
    )

    def to_dict(self):
        point = to_shape(self.position)
        return {
            "latitude": point.y,
            "longitude": point.x
        }
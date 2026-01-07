from App.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
import uuid

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    publicId = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.String(14), unique=True, nullable=False)
    login = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(70), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    accessLevel = db.Column(db.Integer(), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "publicId": self.publicId,
            "name": self.name,
            "cpf": self.cpf,
            "login": self.login,
            "email": self.email,
        }
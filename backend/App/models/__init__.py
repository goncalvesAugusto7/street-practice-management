from App.extensions import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    publicId = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.String(14), unique=True, nullable=False)
    login = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(70), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    accessLevel = db.Column(db.Boolean(), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "publicId": self.publicId,
            "name": self.name,
            "cpf": self.cpf,
            "login": self.login,
            "email": self.email,
            "password": self.password
        }
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
    profile_picture = db.Column(db.String, nullable=True)

    services = db.relationship("Service", back_populates="health_worker")

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
            "access_level": self.access_level,
            "profile_picture": self.profile_picture
        }

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True, nullable=False)
    position = db.Column(
        Geography(geometry_type='POINT', srid=4326),
        nullable=False
    )

    services = db.relationship("Service", back_populates="location")

    def to_dict(self):
        point = to_shape(self.position)
        return {
            "latitude": point.y,
            "longitude": point.x
        }

class Resident(db.Model):
    __tablename__ = 'residents'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    sex = db.Column(db.String(1), nullable=False)
    initial_clinical_history = db.Column(db.String(500))

    services = db.relationship("Service", back_populates="resident")

    def to_dict(self):
        return {
            "public_id": self.public_id,
            "name": self.name,
            "date_of_birth": self.date_of_birth,
            "sex": self.sex,
            "initial_clinical_history": self.initial_clinical_history
        }

class Type_Service(db.Model):
    __tablename__ = "types_service"

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=False)

    services = db.relationship("Service", back_populates="type_service")

    def to_dict(self):
        return {
            "public_id": self.public_id,
            "description": self.description
        }

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True, nullable=False)

    date = db.Column(db.DateTime, nullable=False)
    observations = db.Column(db.String(255))

    health_worker_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    resident_id = db.Column(db.Integer, db.ForeignKey('residents.id'), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=False)
    type_service_id = db.Column(db.Integer, db.ForeignKey('types_service.id'), nullable=False)

    health_worker = db.relationship("User", back_populates='services')
    resident = db.relationship("Resident", back_populates='services')
    location = db.relationship("Location", back_populates='services')
    type_service = db.relationship("Type_Service", back_populates='services')

    def to_dict(self):
        return {
            "public_id": self.public_id,
            "date": self.date.isoformat(),
            "observations": self.observations,
            "health_worker_id": self.health_worker_id,
            "resident_id": self.resident_id,
            "location_id": self.location_id,
            "type_service_id": self.type_service_id,
            "health_worker": self.health_worker.to_dict() if self.health_worker else None,
            "resident": self.resident.to_dict() if self.resident else None,
            "location": self.location.to_dict() if self.location else None,
            "type_service": self.type_service.to_dict() if self.type_service else None,
        }
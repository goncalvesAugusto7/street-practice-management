from flask import Blueprint, request, jsonify
from App.extensions import db
from App.models import Location
from geoalchemy2.elements import WKTElement
import uuid

location_bp = Blueprint('location', __name__, url_prefix='/api/locations')

@location_bp.route('/',methods=['POST'])
def create_location():
    data = request.get_json()
    location = Location(
        public_id = str(uuid.uuid4()),
        position = WKTElement(
            f"POINT({data['longitude']} {data['latitude']})",
            srid = 4326
        )
    )
    db.session.add(location)
    db.session.commit()

@location_bp.route('/',methods=['GET'])
def get_json():
    locations = Location.query.all()

    return jsonify([location.to_dict() for location in locations])
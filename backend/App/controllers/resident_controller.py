from flask import Blueprint, request, jsonify
from sqlalchemy.exc import SQLAlchemyError
from App.extensions import db
from App.models import Resident
import uuid

resident_bp = Blueprint('resident',__name__,url_prefix='/api/residents')

@resident_bp.route('/', methods=['POST'])
def create_resident():
    data = request.get_json()

    if (not data or not
            data.get('name') or not
            data.get('date_of_birth') or not
            data.get('sex')):
        return jsonify({'error': 'Dados não preenchidos corretametne'}), 400
    
    resident = Resident(
        public_id = str(uuid.uuid4()),
        name = data['name'],
        date_of_birth = data['date_of_birth'],
        sex = data['sex'],
        initial_clinical_history = data.get('initial_clinical_history') or None
    )

    db.session.add(resident)
    db.session.commit()

    return jsonify(resident.to_dict()), 201

@resident_bp.route('/', methods=['GET'])
def get_json():
    residents = Resident.query.all()

    return jsonify([resident.to_dict() for resident in residents])
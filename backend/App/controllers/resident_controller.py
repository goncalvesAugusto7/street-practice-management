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

@resident_bp.route('/<public_id>', methods=['GET'])
def get_resident(public_id):
    resident = Resident.query.filter_by(public_id=public_id).first()

    if not resident:
        return jsonify({"error": "Morador não encontrado"}), 401

    return jsonify(resident.to_dict()), 200

@resident_bp.route('/<public_id>', methods=['PATCH'])
def update_resident(public_id):
    data = request.get_json()
    resident = Resident.query.filter_by(public_id=public_id).first()

    if not resident:
        return jsonify({"error": "Morador não encontrado"}), 401

    if 'initial_clinical_history' in data:
        resident.initial_clinical_history = data['initial_clinical_history']
    
    db.session.commit()
    
    return jsonify(resident.to_dict()), 200

@resident_bp.route('/<public_id>', methods=['DELETE'])
def delete_resident(public_id):
    try:
        resident = Resident.query.filter_by(public_id=public_id).first()

        if not resident:
            return jsonify({"error": "Morador não encontrado"}), 401

        db.session.delete(resident)
        db.session.commit()

        return jsonify({"message": "Morador excluído com sucesso"}), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        print("DB ERROR: "+e)
        return jsonify({'error': 'Erro ao excluir morador'}), 500
    
    except Exception as e:
        db.session.rollback()
        print("ERROR: "+e)
        return jsonify({'error': 'Erro interno'}), 500
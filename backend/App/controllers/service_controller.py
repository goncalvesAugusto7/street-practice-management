from flask import Blueprint, request, jsonify
from sqlalchemy.exc import SQLAlchemyError
from App.extensions import db
from App.models import Service
import uuid
import datetime

service_bp = Blueprint('service', __name__, url_prefix='/api/services')

@service_bp.route('/',methods=['POST'])
def create_service():
    data = request.get_json()

    if (not data or not 
            data.get('date') or not 
            data.get('health_worker_id') or not 
            data.get('resident_id') or not 
            data.get('location_id') or not 
            data.get('type_service_id')):

        return jsonify({'error': 'Dados não preenchidos corretametne'}), 400

        try:
            serviceDate = datetime.fromisoformat(data['date'].replace('Z', '+00:00'))
        except ValueError:
            return jsonify({"error": "Formato de data inválido."}), 400

    service = Service(
        public_id=str(uuid.uuid4()),
        date=serviceDate,
        health_worker_id=data['health_worker_id'],
        resident_id=data['resident_id'],
        location_id=data['location_id'],
        type_service_id=data['type_service_id']
    )
    db.session.add(service)
    db.session.commit()

    return jsonify({service.to_dict()}), 201

@service_bp.route('/',methods=['GET'])
def get_json():
    services = Service.query.all()

    return jsonify([service.to_dict() for service in services])

@service_bp.route('/<public_id>', methods=['GET'])
def get_service(public_id):
    try:
        service = Service.query.filter_by(public_id=public_id).first()
        if not service:
            return jsonify({"error": "Serviço não encontrado"}), 404
        return jsonify(service.to_dict()), 200
    except SQLAlchemyError as e:
        return jsonify({"error": "Erro ao buscar serviço.", "details": str(e)}), 500

@service_bp.route('/<public_id>', methods=['DELETE'])
def delete_service(public_id):
    try:
        service = Service.query.filter_by(public_id=public_id).first()
        if not service:
            return jsonify({"error": "Serviço não encontrado"}), 404

        db.session.delete(service)
        db.session.commit()
        return jsonify({"message": "Serviço excluído com sucesso"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Erro ao excluir serviço.", "details": str(e)}), 500

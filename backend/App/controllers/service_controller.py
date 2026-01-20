from flask import Blueprint, request, jsonify
from sqlalchemy.exc import SQLAlchemyError
from App.extensions import db
from App.models import Service, Resident, Location, User, Type_Service
from geoalchemy2.elements import WKTElement
import uuid
from datetime import datetime
import traceback

service_bp = Blueprint('service', __name__, url_prefix='/api/services')

@service_bp.route('/',methods=['POST'])
def create_service():
    data = request.get_json()

    strData = str(data)

    try:
        if (not data or not data.get("latitude") or not data.get("longitude")):
            return jsonify({'error': 'Localização não obtida corretamente'}), 400
        
        location = Location(
            public_id = str(uuid.uuid4()),
            position = WKTElement(
                f"POINT({data['longitude']} {data['latitude']})",
                srid = 4326
            )
        )
        db.session.add(location)
        db.session.flush()

        if (not 
            data.get('date') or not 
            data.get('health_worker_id') or not 
            data.get('resident_id') or not 
            data.get('type_service_id')):
            return jsonify({'error': "Dados não recebidos corretamente"}), 400

        try:
            serviceDate = datetime.fromisoformat(data['date'].replace('Z', '+00:00'))
        except ValueError:
            return jsonify({"error": "Formato de data inválido."}), 400

        user_id         =   User.get_id_by_public_id(data["health_worker_id"])
        resident_id     =   Resident.get_id_by_public_id(data["resident_id"])
        type_service_id =   Type_Service.get_id_by_public_id(data["type_service_id"])


        service = Service(
            public_id=str(uuid.uuid4()),
            date=serviceDate,
            observations=data.get('observations') or None,
            health_worker_id=user_id,
            resident_id=resident_id,
            location_id=location.id,
            type_service_id=type_service_id
        )
        db.session.add(service)
        db.session.commit()

        return jsonify(service.to_dict()), 201

    except Exception as e:
        tb = traceback.extract_tb(e.__traceback__)
        filename, line_number, function_name, text = tb[-1]
        db.session.rollback()
        return jsonify(error=f"Falha ao salvar, erro na linha {line_number}: {e}"), 400

@service_bp.route('/',methods=['GET'])
def get_json():
    services = Service.query.all()

    return jsonify([service.to_dict() for service in services]), 200

@service_bp.route('/<user_public_id>', methods=['GET'])
def get_services_by_user(user_public_id):
    try:
        user_id = User.get_id_by_public_id(user_public_id)

        if not user_id:
            return jsonify({"error": "Usuário não encontrado"}), 401

        services = Service.query.filter_by(health_worker_id=user_id)

        if not services:
            return jsonify({"error": "Atendimento não encontrado"}), 401

        return jsonify([service.to_dict() for service in services]), 200
    
    except SQLAlchemyError as e:
        return jsonify({"error": "Erro ao buscar serviço.", "details": str(e)}), 500

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

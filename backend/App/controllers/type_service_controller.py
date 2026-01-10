from flask import Blueprint, request, jsonify, current_app, send_from_directory
from sqlalchemy.exc import SQLAlchemyError
from App.extensions import db
from App.models import Type_Service
import uuid
import os


type_service_bp = Blueprint('type_service', __name__, url_prefix='/api/types_service')

@type_service_bp.route('/',methods=['POST'])
def create_type_service():
    data = request.get_json()

    if (not data or not data.get('description')):
        return jsonify({'error': 'Dados não preenchidos corretametne'}), 400

    typeService = Type_Service(
        public_id=str(uuid.uuid4()),
        description=data['description']
    )
    try:
        db.session.add(typeService)
        db.session.commit()
        return jsonify(typeService.to_dict()), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao criar tipo de serviço'}), 500
        return jsonify(typeService.to_dict()), 201

@type_service_bp.route('/',methods=['GET'])
def get_json():
    types = Type_Service.query.all()

    return jsonify([type_service.to_dict() for type_service in types])


@type_service_bp.route("/<public_id>", methods=['DELETE'])
def delete_type_service(public_id):
    try:
        type_service = Type_Service.query.filter_by(public_id=public_id).first()

        if not type_service:
            return jsonify({'error': 'Tipo de serviço não encontrado'}), 401

        db.session.delete(type_service)
        db.session.commit()

        return jsonify({'message': 'Tipo de serviço excluído com sucesso'}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao excluir tipo de serviço'}), 500
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro interno'}), 500

from flask import Blueprint, request, jsonify, current_app, send_from_directory
from sqlalchemy.exc import SQLAlchemyError
from App.extensions import db
from App.models import User
from App.services import profileImageService
from App.services import userService
import uuid
import os


user_bp = Blueprint('user', __name__, url_prefix='/api/users')

@user_bp.route('/',methods=['POST'])
def create_user():
    data = request.get_json()
    if (not data or not 
           data.get('name') or not 
           data.get('cpf') or not
           data.get('login') or not
           data.get('email') or not
           data.get('password')):
        return jsonify({'error': 'Dados não preenchidos corretametne'}), 400

    if not userService.isValideCPF(data['cpf']): return jsonify({'error': 'CPF inválido'}), 400
    
    data["access_level"] = 0 if data["access_level"] else 1

    user = User(public_id=str(uuid.uuid4()),
                name=data['name'], 
                cpf=data['cpf'],
                login=data['login'],
                email=data['email'],
                access_level=data['access_level'])

    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    
    return jsonify(user.to_dict()), 201

@user_bp.route('/',methods=['GET'])
def get_json():
    users = User.query.all()

    return jsonify([user.to_dict() for user in users])

@user_bp.route('/<public_id>',methods=['GET'])
def get_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'Usuário não encontrado'}), 401
    
    return jsonify(user.to_dict()), 200

@user_bp.route("/<public_id>/profile-picture", methods=['POST'])
def upload_pfp(public_id):

    uploadedFilename = request.files.get("file")
    if not uploadedFilename:
        return {"error": "Arquivo ausente"}, 400

    savedFilename = profileImageService.save(
        public_id=public_id,
        file=uploadedFilename
    )

    userService.setPfp(public_id, savedFilename)

    return jsonify({'message': 'Imagem atualizada'}), 200

@user_bp.route("/<public_id>/profile-picture/", methods=['GET'])
def get_pfp(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user or not user.profile_picture:
        return jsonify({'error':'Imagem não encontrada'}),404
    
    uploadDir = current_app.config['UPLOAD_PROFILE_PICTURES']

    return send_from_directory(
        uploadDir,
        user.profile_picture
    )

@user_bp.route("/<public_id>", methods=['DELETE'])
def delete_user(public_id):
    try:
        user = User.query.filter_by(public_id=public_id).first()

        if not user:
            return jsonify({'message': 'Usuário não encontrado'}), 401

        db.session.delete(user)
        db.session.commit()

        return jsonify({'message': 'Usuário excluído com sucesso'}), 200
    
    except SQLAlchemyError as e:
        db.session.rollback()
        print("DB ERROR: "+e)
        return jsonify({'error': 'Erro ao excluir usuário'}), 500
    
    except Exception as e:
        db.session.rollback()
        print("ERROR: "+e)
        return jsonify({'error': 'Erro interno'}), 500
    

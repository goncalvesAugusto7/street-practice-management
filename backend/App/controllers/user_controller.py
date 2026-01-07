from flask import Blueprint, request, jsonify
from App.extensions import db
from App.models import User

user_bp = Blueprint('user', __name__, url_prefix='/api/users')

@user_bp.route('/',methods=['POST'])
def create_user():
    data = request.get_json()
    if (not data or not 
           data.get('name') or not 
           data.get('cpf') or not
           data.get('login') or not
           data.get('email') or not
           data.get('password') or not
           data.get('access_level')):
        return jsonify({'error': 'Dados não preenchidos corretametne'}), 400

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
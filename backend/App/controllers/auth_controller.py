from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta, timezone
import jwt
from App.models import User
from App.config import SECRET_KEY

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    login = data.get('userLogin')
    password = data.get('userPassword')

    if not login or not password:
        return jsonify({'message': ' from api: Login e senha obrigatórios'}), 400

    user = User.query.filter_by(login=login).first()

    if not user or not user.check_password(password):
        return jsonify({'message': 'Credenciais inválidas'}), 401

    payload = {
        'public_id': user.public_id,
        'exp' : datetime.now(timezone.utc) + timedelta(minutes=30)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm='HS256'
    )

    return jsonify({
        'token' : token,
        'access_level' : user.access_level
    }), 200
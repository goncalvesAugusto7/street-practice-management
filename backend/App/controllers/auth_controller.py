from flask import Blueprint, request, jsonify, make_response
from datetime import datetime, timedelta, timezone
import jwt
from App.models import User
from App.config import SECRET_KEY
from functools import wraps

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

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
        'access_level' : user.access_level,
        'exp' : datetime.now(timezone.utc) + timedelta(minutes=30)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm='HS256'
    )

    response = make_response({"message":"Login realizado"})
    response.set_cookie(
        "access_token",
        token,
        httponly=True,
        secure=True,
        samesite="Lax"
    )

    return response

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = make_response({"message": "Logout realizado"})
    response.set_cookie("access_token", "", expires=0)

    return response

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get("access_token")

        if not token:
            return jsonify({"message": "Token ausente"}), 401

        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=["HS256"]
            )
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Token inválido"}), 401
        
        return f(payload, *args, **kwargs)

    return decorated

@auth_bp.route('/me', methods=["GET"])
@token_required
def me(payload):
    return jsonify({
        "public_id": payload["public_id"],
        "access_level": payload["access_level"]
    })

def access_level_required(min_level):
    def decorator(f):
        @wraps(f)
        @token_required
        def wrapped(payload, *args, **kwargs):
            if payload.get("access_level", 0) > min_level:
                return jsonify({"mesaage": "Acesso negado"}), 403
            return f(payload, *args, **kwargs)
        return wrapped
    return decorator
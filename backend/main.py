from App import create_app
from App.extensions import db
import uuid

app = create_app()

if __name__ == '__main__':
  with app.app_context():
    db.create_all()
    from App.models import User
    if not User.query.first():
      user = User(
        public_id=str(uuid.uuid4()),
        name="Augusto Gonçalves Santos",
        cpf="039.544.613-90",
        login="admin",
        email="augusto@email.com",
        access_level=0,
        profile_picture="none"
      )
      user.set_password("123")
      db.session.add(user)
      db.session.commit()
  app.run(host='0.0.0.0', port=5000, debug=True)

'''
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

cors = CORS(app, origins='*')

db = SQLAlchemy(app)

@app.route('/')
def home():
  return 'flask'

@app.route('/api/users', methods=['GET'])
def users():
    return jsonify(
       {
        'logins': [
          { 
            'login': "admin", 
            'password': "123", 
            'accessLevel': 0 
        },
          { 
            'login': "agente", 
            'password': "123", 
            'accessLevel': 1 
        }
        ],
        'residents': [
          { 
            'id': 1,
            'name': "Peter Parker", 
            'dateOfBirth': "10-08-1962", 
            'sex': "masculino",
            'initialClinicalHistory': "paciente estava com quadros de alergia e envenenamento após picada de aranha"
        },
          { 
            'id': 2,
            'name': "Naruto Uzumaki", 
            'dateOfBirth': "21-09-1999", 
            'sex': "masculino",
            'initialClinicalHistory': "morador da aldeia da folha tem uma raposa dentro do estômago dele"
        }
        ],
        'services': [
          {

            'id': 1,
            'type': "Atendimento Clínico Geral",
            'responsibleProfessional': "Técnico em enfermagem"
          },
          {
            'id': 1,
            'type':"Primeiros Socorros",
            'responsibleProfessional': "Técnico em enfermagem"
          },
          {
            'id': 2,
            'type':"Vacinação",
            'responsibleProfessional': "Técnico em enfermagem"
          },
          {
            'id': 3,
            'type':"Teste Rápido",
            'responsibleProfessional': "Técnico em enfermagem"
          },
          {
            'id': 4,
            'type':"Acolhimento e Escuta Qualificada",
            'responsibleProfessional': "Técnico em enfermagem"
          },
          {
            'id': 5,
            'type':"Orientações Psicossociais",
            'responsibleProfessional': "Técnico em enfermagem"
          },
          {
            'id': 6,
            'type':"Encaminhamento para Tratamento",
            'responsibleProfessional': "Técnico em enfermagem"
          },

        ],
        'locations': [
          {
            'id': 1,
            'latitude': -2.554899, 
            'longitude': -44.265552
          },
          {
            'id': 2,
            'latitude': -2.559202, 
            'longitude':-44.307785
          },
          {
            'id': 3,
            'latitude': -2.527992, 
            'longitude':-44.254127
          }
        ],
        'reports': [
          {
            'residentId': 1,
            'serviceId': 2,
            'locationId': 3
          },
          {
            'residentId': 2,
            'serviceId': 4,
            'locationId': 2
          }
        ]
      }
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=8080)
    '''
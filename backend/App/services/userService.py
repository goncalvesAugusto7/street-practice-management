from App.models import User
from validate_docbr import CPF
from App.extensions import db

cpf_validator = CPF()

def setPfp(public_id, filename):
    user = User.query.filter_by(public_id=public_id).first()
    user.profile_picture = filename
    db.session.commit()

def isValideCPF(cpf: str) ->bool:
    return cpf_validator.validate(cpf)

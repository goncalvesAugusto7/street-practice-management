from App.models import User

def setPfp(public_id, filename):
    user = User.query.get(public_id)
    user.profile_picture = filename
    db.session.commit()
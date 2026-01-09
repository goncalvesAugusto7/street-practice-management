import os
import uuid
from flask import current_app
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {"png","jpg","jpeg"}

def save(public_id: str, file):
    _validate_file(file)

    uploadDir = current_app.config["UPLOAD_PROFILE_PICTURES"]
    os.makedirs(uploadDir, exist_ok=True)

    filename = secure_filename(f"user_{public_id}.png")
    uniqueName = f"{uuid.uuid4()}_{filename}"

    path = os.path.join(uploadDir, uniqueName)

    file.save(path)
    return uniqueName

def _validate_file(file):
    
    if '.' not in file.filename:
        raise ValueError("Arquivo inválido")

    ext = file.filename.rsplit(".",1)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ValueError("Formato de arquivo não permitido")
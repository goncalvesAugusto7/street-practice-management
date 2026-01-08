import os
from werkzeug.utils import secure_filename

UPLOAD_DIR = "/app/uploads/profiles"
ALLOWED_EXTENSIONS = {"png","jpg","jpeg"}

def save(public_id: str, file):
    _validate_file(file)

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    filename = secure_filename(f"user_{public_id}.png")
    path = os.path.join(UPLOAD_DIR, filename)

    file.save(path)
    return file

def _validate_file(file):
    
    if '.' not in file.filename:
        raise ValueError("Arquivo inválido")

    ext = file.filename.rsplit(".",1)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ValueError("Formato de arquivo não permitido")
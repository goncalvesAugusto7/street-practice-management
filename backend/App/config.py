import os
from dotenv import load_dotenv

load_dotenv()
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

class Config:
    SECRET_KEY=os.getenv('SECRET_KEY')
    JWT_SECRET_KEY=os.getenv('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_PROFILE_PICTURES = os.path.join(
        BASE_DIR,
        "uploads",
        "profile_pictures"
    )

    if (
        not SECRET_KEY or
        not JWT_SECRET_KEY or
        not SQLALCHEMY_DATABASE_URI
    ):
        raise RuntimeError("Verifique as variáveis de ambiente")

SECRET_KEY = Config.SECRET_KEY
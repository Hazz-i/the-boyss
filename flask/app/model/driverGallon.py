from app import db
from datetime import datetime

class DriverGallon(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    username = db.Column(db.String(64), index=True)
    phone = db.Column(db.String(120), index=True, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<DriverGallon {}>'.format(self.username)
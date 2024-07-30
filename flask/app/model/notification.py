from app import db
from datetime import datetime

class Notification(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    title = db.Column(db.String(64), index=True)
    form_user = db.Column(db.BigInteger, db.ForeignKey('user.id')) 
    message = db.Column(db.String(120), index=True)
    to_user = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Notification {}>'.format(self.username)
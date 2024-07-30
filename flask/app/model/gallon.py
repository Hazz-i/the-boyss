from app import db

class Gallon(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    current= db.Column(db.Float, default=0)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Gallon {}>'.format(self.username)
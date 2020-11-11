import random
import string
from datetime import datetime, timedelta

from db import db
from enum import Enum


class PasswordRecoveryModel(db.Model):
    __tablename__ = 'password_recovery'
    __table_args__ = (db.UniqueConstraint('key'),)

    SIZE = 32
    VALID_UNTIL = timedelta(hours=1)

    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), primary_key=True)
    key = db.Column(db.Integer(), nullable=False)
    time = db.Column(db.DateTime(), nullable=False)

    def __init__(self, user_id, key=None):
        self.user_id = user_id
        self.time = datetime.now()
        self.key = self.generate_key() if key is None else key

    def json(self):
        """
        Returns a dictionary with paris of string of name of attribute and it's value. In case of Enum it just returns
        the name of the enum object (Enum.name).
        """
        _ignore = self.user_id  # Forces execution to parse properly the class, fixing the bug of transient data
        atr = self.__dict__.copy()
        del atr["_sa_instance_state"]
        return {atr: value if not isinstance(value, Enum) else value.name for atr, value in atr.items()}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def update_from_db(self, data):
        """
        Updates through a dictionary with paris of string of name of attribute and it's value. Following same structure
        as json(). In case of wanting to modify an attribute of an enum use the string name of one of the values.

        Will raise Exception in case of invalid enum value if it isn't contained inside the possible values of the enum.
        """
        for attr, newValue in data.items():
            if newValue is not None:
                cls = getattr(self, attr)
                # Checks if value is of the attribute that's trying to be modified is an Enum
                if isinstance(cls, Enum):
                    # Checks if the enum doesn't contain the newValue
                    if newValue not in type(cls).__members__:
                        raise Exception(f"Enum {type(cls).__name__} doesn't have value: {newValue}")
                    # Gets the object of the enum with same name as newValue
                    setattr(self, attr, type(cls)[newValue])
                else:
                    setattr(self, attr, newValue)
        db.session.commit()

    @classmethod
    def find_by_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first()

    @classmethod
    def generate_key(cls):
        """
        Generates a random key avoiding duplicating keys using the most secure random generator of the OS.
        The key will be made by a combination of uppercase and lowercase letters and numbers.
        """
        new_key = ''.join(
            random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(cls.SIZE))
        while cls.query.filter_by(key=new_key).count() != 0:
            new_key = ''.join(
                random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(cls.SIZE))
        return new_key
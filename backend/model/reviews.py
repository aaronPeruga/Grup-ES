from db import db

from model.books import BooksModel
from model.users import UsersModel


class ReviewsModel(db.Model):
    __tablename__ = 'reviews'

    isbn = db.Column(db.BigInteger(), db.ForeignKey('books.isbn'), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), primary_key=True)
    score = db.Column(db.Integer(), nullable=False)
    review = db.Column(db.String())

    def __init__(self, isbn, user_id, score, review=None):
        self.isbn = isbn
        self.user_id = user_id
        self.score = score
        self.review = review

    def json(self):
        """
        Returns a dictionary with pairs of string of name of attribute and it's value.
        """
        _ignore = self.isbn  # Forces execution to parse properly the class, fixing the bug of transient data
        atr = self.__dict__.copy()
        user = UsersModel.find_by_id(self.user_id)
        atr['username'] = user.username if user.state else None
        del atr["_sa_instance_state"]
        return atr

    def save_to_db(self):
        if self.score < 1 or self.score > 5:
            raise ValueError("Invalid value for score attribute: Value must be an integer from 1 to 5, both included.")
        if ReviewsModel.find_by_isbn_user_id(self.isbn, self.user_id) is not None:
            raise Exception(f"Given user already posted a review. Did you meant to update it?")
        if UsersModel.find_by_id(self.user_id) is None:
            raise Exception("User with given id doesn't exist")
        if BooksModel.find_by_isbn(self.isbn) is None:
            raise Exception("Book with given isbn doesn't exist")
        ScoresModel.add_review(self)
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        ScoresModel.remove_review(self)
        db.session.delete(self)
        db.session.commit()

    def update_from_db(self, data: dict):
        if data.get('score', None) is not None and (data['score'] < 1 or data['score'] > 5):
            raise ValueError("Invalid value for score attribute: Value must be an integer from 1 to 5, both included.")

        # Attributes that can't be modified
        data.pop('isbn', None)
        data.pop('user_id', None)
        
        previous_score = self.score
        for attr, newValue in data.items():
            if newValue is not None:
                setattr(self, attr, newValue)
        ScoresModel.modify_review(self, previous_score)
        db.session.commit()

    @classmethod
    def find_by_isbn_user_id(cls, isbn, user_id):
        return cls.query.filter_by(isbn=isbn, user_id=user_id).first()

    @classmethod
    def find_by_isbn(cls, isbn):
        return cls.query.filter_by(isbn=isbn).all()

    @classmethod
    def find_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()


class ScoresModel(db.Model):
    __tablename__ = 'scores'

    isbn = db.Column(db.BigInteger(), db.ForeignKey('books.isbn'), primary_key=True)
    n_reviews = db.Column(db.Integer(), nullable=False)
    score = db.Column(db.Float(), nullable=False)

    def __init__(self, isbn):
        self.isbn = isbn
        self.n_reviews = 0
        self.score = 0

    def json(self):
        _ignore = self.isbn  # Forces execution to parse properly the class, fixing the bug of transient data
        atr = self.__dict__.copy()
        del atr["_sa_instance_state"]
        return atr

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_isbn(cls, isbn):
        return cls.query.filter_by(isbn=isbn).first()

    @classmethod
    def add_review(cls, review: ReviewsModel):
        score = cls.find_by_isbn(review.isbn)
        if score is None:
            score = cls(review.isbn)
        score.score = (score.n_reviews * score.score + review.score) / (score.n_reviews + 1)
        score.n_reviews += 1
        score.save_to_db()

    @classmethod
    def remove_review(cls, review: ReviewsModel):
        score = cls.find_by_isbn(review.isbn)
        if score is None:
            raise Exception("No review to remove.")
        elif score.n_reviews == 1:
            score.delete_from_db()
        else:
            score.score = (score.n_reviews * score.score - review.score) / (score.n_reviews - 1)
            score.n_reviews -= 1
            score.save_to_db()

    @classmethod
    def modify_review(cls, review: ReviewsModel, previous_score: int):
        score = cls.find_by_isbn(review.isbn)
        if score is None:
            raise Exception("No review to update.")
        else:
            score.score = (score.n_reviews * score.score + review.score - previous_score) / score.n_reviews
            db.session.commit()

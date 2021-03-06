import datetime as dt
from itertools import islice

from flask_restful import Resource, abort, inputs
from flask_restful import reqparse
from sqlalchemy import desc, asc

from db import db
from model.books import BooksModel
from model.transactions import TransactionsModel
from model.users import auth, Roles
from utils.lock import lock


def parse_book(minimal=False):
    str_variable = "" if minimal else ", cannot be left blank"
    parser = reqparse.RequestParser(bundle_errors=True)

    parser.add_argument('isbn', type=int, required=not minimal,
                        help="In this field goes the isbn of the book" + str_variable)
    parser.add_argument('stock', type=int, required=not minimal,
                        help="In this field goes the stock of the book" + str_variable)
    parser.add_argument('vendible', type=inputs.boolean, required=False,
                        help="In this field goes if the book is available" + str_variable)
    parser.add_argument('precio', type=float, required=not minimal,
                        help="In this field goes the price of the book" + str_variable)
    parser.add_argument('titulo', type=str, required=not minimal,
                        help="In this field goes the title of the book" + str_variable)
    parser.add_argument('autor', type=str, required=False,
                        help="In this field goes the author of the book")
    parser.add_argument('editorial', type=str, required=False,
                        help="In this field goes the editorial of the book")
    parser.add_argument('sinopsis', type=str, required=False,
                        help="In this field goes the sinopsis of the book")
    parser.add_argument('url_imagen', type=str, required=False,
                        help="In this field goes the url of the image associated to the book")
    parser.add_argument('fecha_de_publicacion', type=str, required=False,
                        help="In this field goes the date of the book in YYYY-MM-DD format")
    data = parser.parse_args()
    if data["fecha_de_publicacion"] is not None:
        try:
            data["fecha_de_publicacion"] = dt.datetime.strptime(data["fecha_de_publicacion"], '%Y-%m-%d')
        except ValueError:
            abort(400, message={"message": "'fecha_de_publicacion' should have the sytnax: YYYY-MM-DD"})

    return data


def parse_reviews():
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('reviews', type=inputs.boolean, required=False,
                        help="Indicates if returning the reviews of the book is needed.")
    parser.add_argument('score', type=inputs.boolean, required=False,
                        help="Indicates if returning the score of the book is needed .")
    return parser.parse_args()


def check_constraints_book(data):
    if data.get("isbn", None) is not None and len(str(data["isbn"])) != 13:
        abort(400, message={"message": "'isbn' should be made by 13 digits"})
    if data.get("stock", None) is not None and data["stock"] < 0:
        abort(400, message={"message": "'stock' can't be negative"})
    if data.get("precio", None) is not None and data["precio"] < 0:
        abort(400, message={"message": "'precio' can't be negative"})
    if data.get("titulo", None) is not None and not data["titulo"]:
        abort(400, message={"message": "'titulo' can't be empty"})
    if data.get("autor", None) is not None and not data["autor"]:
        abort(400, message={"message": "'autor' can't be empty. Use None instead"})
    if data.get("editorial", None) is not None and not data["editorial"]:
        abort(400, message={"message": "'editorial' can't be empty. Use None instead"})
    if data.get("url_imagen", None) is not None and not data["url_imagen"]:
        abort(400, message={"message": "'url_imagen' can't be empty. Use None instead"})
    if data.get("sinopsis", None) is not None and not data["sinopsis"]:
        abort(400, message={"message": "'sinopsis' can't be empty. Use None instead"})


class Books(Resource):

    def get(self, isbn):
        data = parse_reviews()
        with lock:
            book = BooksModel.find_by_isbn(isbn)
        if not book:
            return {"message": f"Book with ['isbn':{isbn}] not found"}, 404
        return {"book": book.json(**data)}, 200

    @auth.login_required(role=Roles.Admin)
    def post(self):
        data = parse_book()
        check_constraints_book(data)
        with lock:
            book = BooksModel.find_by_isbn(data["isbn"])
            if book:
                return {"message": f"A book with same isbn {data['isbn']} already exists"}, 409
            try:
                del data['vendible']  # always set to True when post
                book = BooksModel(**data)
                book.save_to_db()
            except Exception as e:
                return {"message": str(e)}, 500

        return book.json(), 201

    @auth.login_required(role=Roles.Admin)
    def put(self, isbn):
        data = parse_book(minimal=True)
        check_constraints_book(data)
        with lock:
            book = BooksModel.find_by_isbn(isbn)
            if book is None:
                return {"message": "Book with ['isbn': " + str(isbn) + "] Not Found"}, 404
            try:
                book.update_from_db(data)
            except Exception as e:
                return {"message": str(e)}, 500

            return {"book": book.json()}, 200

    @auth.login_required(role=Roles.Admin)
    def delete(self, isbn):
        with lock:
            book = BooksModel.find_by_isbn(isbn)

            if book is None:
                return {"message": f"Book with ['isbn': {isbn}] Not Found"}, 404

            if not book.vendible:
                return {"message": f"Book with ['isbn': {isbn}] was previously removed"}, 409

            try:
                book.delete_from_db()
            except Exception as e:
                return {"message": str(e)}, 500

        return {"message": f"Book with ['isbn': {isbn}] deleted"}, 200


class BooksList(Resource):
    def get(self):
        parser = reqparse.RequestParser(bundle_errors=True)

        parser.add_argument('numBooks', type=int, required=False,
                            help="In this field goes the number of the books to show")
        parser.add_argument('param', type=str, required=False,
                            help="In this field goes the param you want to order")
        parser.add_argument('order', type=str, required=False,
                            help="In this field goes the order (asc, desc) of what you would like to show")
        parser.add_argument('reviews', type=inputs.boolean, required=False,
                            help="Indicates if returning the reviews of the book is needed.")
        parser.add_argument('score', type=inputs.boolean, required=False,
                            help="Indicates if returning the score of the book is needed .")
        parser.add_argument('showOnlyVendibles', type=inputs.boolean, required=False)
        data = parser.parse_args()
        with lock:
            books = db.session.query(BooksModel)
            if data['showOnlyVendibles'] is None or data['showOnlyVendibles']:
                books = books.filter_by(vendible=True)
            if data['param'] is None:
                books = books.limit(data['numBooks']).all()
            else:
                if data['order'] == "asc":
                    books = books.order_by(asc(data['param'])).limit(data['numBooks']).all()
                else:
                    books = books.order_by(desc(data['param'])).limit(data['numBooks']).all()
        return {'books': [book.json(reviews=data['reviews'], score=data['score']) for book in books]}, 200


class SearchBooks(Resource):
    def get(self):
        parser = reqparse.RequestParser(bundle_errors=True)

        parser.add_argument('isbn', type=int, required=False,
                            help="In this field goes the isbn of the book")
        parser.add_argument('titulo', type=str, required=False,
                            help="In this field goes the tittle of the book")
        parser.add_argument('autor', type=str, required=False,
                            help="In this field goes the author of the book")
        parser.add_argument('editorial', type=str, required=False,
                            help="In this field goes the editorial of the book")
        parser.add_argument('reviews', type=inputs.boolean, required=False,
                            help="Indicates if returning the reviews of the book is needed.")
        parser.add_argument('score', type=inputs.boolean, required=False,
                            help="Indicates if returning the score of the book is needed .")
        parser.add_argument('showOnlyVendibles', type=inputs.boolean, required=False)
        data = parser.parse_args()
        check_constraints_book(data)
        if not any(v is not None for k, v in data.items() if k not in ['reviews', 'score', 'showOnlyVendibles']):
            return {"message": "Missing parameters to search by."}, 406

        with lock:
            books = db.session.query(BooksModel)
            if data['showOnlyVendibles'] is None or data['showOnlyVendibles']:
                books = books.filter_by(vendible=True)
            for k, v in data.items():
                if v is not None and k not in ['reviews', 'score', 'showOnlyVendibles']:
                    books = books.filter(getattr(BooksModel, k).like(f"%{v}%"))

        return {'books': [book.json(reviews=data['reviews'], score=data['score']) for book in books]}, 200


class BestSellers(Resource):

    def get(self):
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('numBooks', type=int, required=False,
                            help="In this field goes the number of the books to show")
        data = parser.parse_args()
        isbns = TransactionsModel.best_sellers()

        return {'books': list(islice(
            filter(lambda book: book['vendible'], map(lambda x: BooksModel.find_by_isbn(x).json(score=True), isbns)),
                              data['numBooks']))}, 200
